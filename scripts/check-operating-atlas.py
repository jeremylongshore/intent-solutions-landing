#!/usr/bin/env python3
"""Measure generated atlas HTML in Chromium; save JSON and review screenshots.

Run after the atlas build. The combined .print.html edition is excluded.
Requires Python Playwright and its Chromium browser.
No server, source mutation, or fixed node-position expectations are involved.
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path


INSPECT = r"""({tolerance, sampleStep}) => {
  const issues = [];
  const add = (code, detail, severity = 'error') => issues.push({severity, code, ...detail});
  const round = n => Math.round(n * 100) / 100;
  const rect = el => {
    const b = el.getBoundingClientRect();
    return {x:b.x, y:b.y, w:b.width, h:b.height};
  };
  const local = (b, origin) => ({x:round(b.x-origin.x), y:round(b.y-origin.y), w:round(b.w), h:round(b.h)});
  const visible = el => {
    for (let p=el; p; p=p.parentElement) {
      const s=getComputedStyle(p);
      if(s.display==='none'||s.visibility==='hidden'||Number(s.opacity)===0) return false;
    }
    return el.getClientRects().length > 0;
  };
  const outside = (a,b) => a.x < b.x-tolerance || a.y < b.y-tolerance ||
    a.x+a.w > b.x+b.w+tolerance || a.y+a.h > b.y+b.h+tolerance;

  if (!document.documentElement.lang.trim()) add('missing_document_language', {});
  if (!document.title.trim()) add('missing_document_title', {});
  const h1s=[...document.querySelectorAll('h1')].filter(visible);
  if(h1s.length!==1 || !h1s[0]?.textContent.trim()) add('page_heading', {visible_h1_count:h1s.length});
  const ids=new Map();
  for(const el of document.querySelectorAll('[id]')) {
    if(ids.has(el.id)) add('duplicate_dom_id', {id:el.id});
    ids.set(el.id,el);
  }
  for(const el of document.querySelectorAll('[aria-labelledby],[aria-describedby]')) {
    for(const attr of ['aria-labelledby','aria-describedby']) {
      if(!el.hasAttribute(attr)) continue;
      const refs=el.getAttribute(attr).trim().split(/\s+/).filter(Boolean);
      if(!refs.length) add('empty_aria_reference', {element:el.id||el.tagName, attribute:attr});
      for(const id of refs) {
        const target=ids.get(id);
        if(!target) add('broken_aria_reference', {element:el.id||el.tagName, attribute:attr, target:id});
        else if(!target.textContent.trim() && !target.getAttribute('aria-label'))
          add('empty_aria_target', {element:el.id||el.tagName, attribute:attr, target:id});
      }
    }
  }
  for(const svg of document.querySelectorAll('svg')) {
    if(svg.closest('[aria-hidden="true"]') || ['presentation','none'].includes(svg.getAttribute('role'))) continue;
    const hasName=svg.getAttribute('aria-label')?.trim() || svg.getAttribute('aria-labelledby')?.trim() ||
      [...svg.children].some(el=>el.tagName.toLowerCase()==='title' && el.textContent.trim());
    if(!hasName) add('unnamed_svg', {id:svg.id||null});
  }
  const headings=[...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(visible);
  for(let i=1;i<headings.length;i++) if(Number(headings[i].tagName[1])>Number(headings[i-1].tagName[1])+1)
    add('heading_level_skip', {heading:headings[i].textContent.trim().slice(0,100)}, 'warning');

  const docWidth=Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
  if(docWidth>innerWidth+tolerance) add('page_horizontal_overflow', {viewport:innerWidth, document_width:docWidth});
  const stages=[...document.querySelectorAll('.diagram-stage')];
  if(!stages.length) add('missing_diagram_stage', {});
  const diagrams=[];
  stages.forEach((stage,stageIndex)=>{
    const origin=rect(stage);
    const nodes=[...stage.querySelectorAll('[data-node-id]')].filter(visible).map(el=>({el,id:el.dataset.nodeId,box:rect(el)}));
    const byId=new Map();
    if(!nodes.length) add('missing_rendered_nodes', {stage:stageIndex});
    for(const node of nodes) {
      if(!node.id || byId.has(node.id)) add('duplicate_or_empty_node_id', {stage:stageIndex,node:node.id});
      byId.set(node.id,node);
      if(outside(node.box,origin)) add('node_outside_stage', {stage:stageIndex,node:node.id,box:local(node.box,origin)});
      if(node.el.scrollWidth>node.el.clientWidth+tolerance || node.el.scrollHeight>node.el.clientHeight+tolerance)
        add('node_content_overflow', {stage:stageIndex,node:node.id,client:[node.el.clientWidth,node.el.clientHeight],scroll:[node.el.scrollWidth,node.el.scrollHeight]});
      const walker=document.createTreeWalker(node.el,NodeFilter.SHOW_TEXT);
      let text;
      while((text=walker.nextNode())) {
        if(!text.textContent.trim() || !visible(text.parentElement)) continue;
        const range=document.createRange(); range.selectNodeContents(text);
        for(const b of range.getClientRects()) {
          const box={x:b.x,y:b.y,w:b.width,h:b.height};
          if(b.width && b.height && outside(box,node.box)) {
            add('node_text_outside_box', {stage:stageIndex,node:node.id,text:text.textContent.trim().slice(0,140),box:local(box,origin)});
            break;
          }
        }
      }
    }
    for(let i=0;i<nodes.length;i++) for(let j=i+1;j<nodes.length;j++) {
      const a=nodes[i],b=nodes[j];
      if(a.el.contains(b.el)||b.el.contains(a.el)) continue;
      const w=Math.min(a.box.x+a.box.w,b.box.x+b.box.w)-Math.max(a.box.x,b.box.x);
      const h=Math.min(a.box.y+a.box.h,b.box.y+b.box.h)-Math.max(a.box.y,b.box.y);
      if(w>tolerance && h>tolerance) add('node_overlap', {stage:stageIndex,nodes:[a.id,b.id],intersection:[round(w),round(h)]});
    }
    const paths=[...stage.querySelectorAll('path[data-edge-from][data-edge-to]')].filter(visible);
    if(!paths.length) add('no_tagged_edges', {stage:stageIndex}, 'warning');
    let sampleCount=0;
    for(let edgeIndex=0;edgeIndex<paths.length;edgeIndex++) {
      const path=paths[edgeIndex],from=path.dataset.edgeFrom,to=path.dataset.edgeTo;
      const edge={stage:stageIndex,edge:edgeIndex,from,to};
      if(!byId.has(from)||!byId.has(to)) {add('unknown_edge_endpoint',edge);continue;}
      const matrix=path.getScreenCTM(),length=path.getTotalLength();
      if(!matrix || !Number.isFinite(length) || length<=0) {add('invalid_edge_path',edge);continue;}
      // Sampling is in SVG units adjusted for screen scale, including transforms.
      const scale=Math.max(Math.hypot(matrix.a,matrix.b),Math.hypot(matrix.c,matrix.d));
      const samples=Math.min(20000,Math.max(1,Math.ceil(length*scale/sampleStep)));
      if(length*scale/sampleStep>20000) add('edge_sampling_capped', {...edge,length:round(length)},'warning');
      const hit=new Set();
      for(let i=0;i<=samples;i++) {
        const point=path.getPointAtLength(length*i/samples).matrixTransform(matrix);
        sampleCount++;
        for(const node of nodes) {
          if(node.id===from||node.id===to||hit.has(node.id)) continue;
          // A containing group is not an unrelated node.
          if(node.el.contains(byId.get(from).el)||node.el.contains(byId.get(to).el)) continue;
          const b=node.box;
          if(point.x>b.x+tolerance && point.x<b.x+b.w-tolerance && point.y>b.y+tolerance && point.y<b.y+b.h-tolerance) {
            hit.add(node.id);
            add('edge_crosses_node', {...edge,node:node.id,at:[round(point.x-origin.x),round(point.y-origin.y)]});
          }
        }
      }
    }
    const scroll=stage.closest('.diagram-scroll');
    let scrolling=null;
    if(!scroll) add('missing_diagram_scroll_container', {stage:stageIndex});
    else {
      const overflow=getComputedStyle(scroll).overflowX,maxScroll=scroll.scrollWidth-scroll.clientWidth;
      const previous=scroll.scrollLeft; scroll.scrollLeft=scroll.scrollWidth;
      const reached=scroll.scrollLeft; scroll.scrollLeft=previous;
      scrolling={client_width:scroll.clientWidth,content_width:scroll.scrollWidth,overflow_x:overflow,max_scroll:maxScroll,reached};
      if(maxScroll>tolerance && (!['auto','scroll'].includes(overflow)||reached<maxScroll-tolerance))
        add('diagram_not_horizontally_reachable', {stage:stageIndex,...scrolling});
      const keyboardReachable=scroll.tabIndex>=0 || scroll.querySelector('a[href],button,input,[tabindex="0"]');
      if(maxScroll>tolerance && !keyboardReachable) add('scroll_region_not_keyboard_reachable', {stage:stageIndex});
    }
    diagrams.push({stage:stageIndex,size:[round(origin.w),round(origin.h)],nodes:nodes.map(n=>({id:n.id,...local(n.box,origin)})),edge_count:paths.length,path_samples:sampleCount,scrolling});
  });
  return {title:document.title,viewport:[innerWidth,innerHeight],document_width:docWidth,diagrams,issues};
}"""


def viewport(value: str) -> dict[str, int]:
    try:
        width, height = (int(part) for part in value.lower().split("x"))
        if width < 320 or height < 320:
            raise ValueError
        return {"width": width, "height": height}
    except ValueError as exc:
        raise argparse.ArgumentTypeError("Use WIDTHxHEIGHT, both at least 320") from exc


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--public-dir", type=Path, default=root / "astro-site/public")
    parser.add_argument("--output-dir", type=Path, default=Path("/tmp/intent-operating-atlas-check"))
    parser.add_argument("--viewport", action="append", type=viewport, help="Repeat to override the three desktop sizes")
    parser.add_argument("--browser-path", type=Path, help="Use a specific Chromium executable")
    parser.add_argument("--tolerance", type=float, default=2.0, help="Allowed box rounding error in CSS pixels (default: 2)")
    parser.add_argument("--sample-step", type=float, default=2.0, help="Maximum approximate edge sample spacing in screen pixels")
    args = parser.parse_args()
    if not 0 <= args.tolerance <= 4 or not 0.25 <= args.sample_step <= 8:
        parser.error("tolerance must be 0–4; sample-step must be 0.25–8")
    files = sorted(path for path in args.public_dir.resolve().glob("estate-blueprint*.html")
                   if not path.name.endswith(".print.html"))
    if not files:
        print(json.dumps({"passed": False, "error": "No generated estate-blueprint*.html files", "public_dir": str(args.public_dir)}))
        return 2
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print(json.dumps({"passed": False, "error": "Install Python Playwright and run python -m playwright install chromium"}))
        return 2

    sizes = args.viewport or [viewport("1920x1080"), viewport("1280x900"), viewport("1024x768")]
    sizes.sort(key=lambda size: size["width"], reverse=True)
    output = args.output_dir.resolve()
    output.mkdir(parents=True, exist_ok=True)
    report = {"passed": False, "files_checked": len(files), "tolerance_css_px": args.tolerance,
              "path_sample_step_css_px": args.sample_step, "pages": [], "limitations": [
                  "Checks rendered geometry and basic labeling; it does not certify factual claims, contrast, or the complete accessibility tree.",
                  "Path sampling checks centerlines against unrelated node interiors, excluding the configured rounding tolerance.",
                  "All matching chapter files are checked; the combined print edition is excluded. Missing chapter counts are not inferred.",
              ]}
    try:
        with sync_playwright() as playwright:
            launch = {"headless": True}
            if args.browser_path:
                launch["executable_path"] = str(args.browser_path.resolve())
            browser = playwright.chromium.launch(**launch)
            try:
                for source in files:
                    for size in sizes:
                        page = browser.new_page(viewport=size, device_scale_factor=1, reduced_motion="reduce")
                        page.set_default_timeout(15000)
                        page_errors, failed_requests = [], []
                        page.on("pageerror", lambda error: page_errors.append(str(error)))
                        page.on("requestfailed", lambda request: failed_requests.append({"url": request.url, "error": request.failure}))
                        result = {"file": source.name, "viewport": [size["width"], size["height"]], "issues": []}
                        try:
                            page.goto(source.as_uri(), wait_until="networkidle", timeout=20000)
                            page.evaluate("async () => { await document.fonts.ready; await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))); }")
                            result.update(page.evaluate(INSPECT, {"tolerance": args.tolerance, "sampleStep": args.sample_step}))
                            for error in page_errors:
                                result["issues"].append({"severity": "error", "code": "browser_script_error", "message": error})
                            for failure in failed_requests:
                                result["issues"].append({"severity": "warning", "code": "failed_resource_request", **failure})
                            basename = f"{source.stem}-{size['width']}x{size['height']}"
                            screenshot = output / f"{basename}.png"
                            page.screenshot(path=str(screenshot), full_page=True, animations="disabled")
                            result["screenshot"] = str(screenshot)
                            if size == sizes[0]:
                                result["diagram_screenshots"] = []
                                for index, stage in enumerate(page.locator(".diagram-stage").all()):
                                    shot = output / f"{source.stem}-diagram-{index + 1}.png"
                                    stage.screenshot(path=str(shot), animations="disabled")
                                    result["diagram_screenshots"].append(str(shot))
                        except Exception as exc:
                            result["issues"].append({"severity": "error", "code": "browser_inspection_failed", "message": str(exc)})
                        finally:
                            page.close()
                        report["pages"].append(result)
            finally:
                browser.close()
    except Exception as exc:
        report["environment_error"] = str(exc)

    report["errors"] = sum(issue["severity"] == "error" for page in report["pages"] for issue in page["issues"])
    report["warnings"] = sum(issue["severity"] == "warning" for page in report["pages"] for issue in page["issues"])
    report["passed"] = not report["errors"] and "environment_error" not in report
    report["report_path"] = str(output / "report.json")
    encoded = json.dumps(report, indent=2)
    (output / "report.json").write_text(encoded + "\n")
    print(encoded)
    return 0 if report["passed"] else 2 if "environment_error" in report else 1


if __name__ == "__main__":
    sys.exit(main())
