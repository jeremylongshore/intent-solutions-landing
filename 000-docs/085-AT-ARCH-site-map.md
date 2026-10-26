# Individual site map and visitor journeys

Date: 2026-09-12. Owner requested a page-by-page breakdown before release. Tracking: bd_000-projects-dxtq.17.

## Logical hierarchy

Home answers what Intent Solutions does for the visitor. Projects is evidence discovery, not a checkout catalog. About establishes accountability. Contact is the primary request. Support serves existing users with agreement-specific boundaries. Field notes provide depth. Policies and the human site map are footer utilities.

Primary customer journey: Home -> inspect in-page evidence or Projects -> About if needed -> Contact -> inline success or recoverable error. Practitioner journey: Home secondary link or network Learn -> external Learn access requirements. Existing user: footer Support -> agreed support contact or the relevant repository. A newsletter is not presented until delivery and consent are verified.

## Every route template

| URL | Audience | Purpose | Next action | XML sitemap |
|---|---|---|---|---|
| / | Prospective customers | Understand the outcome, method, and evidence. | /contact/?door=outcome | true |
| /projects/ | Customers and builders | Inspect public work and choose an example to explore. | https://demos.intentsolutions.io/ | true |
| /about/ | People evaluating the company | Understand the team and its responsibilities. | /contact/?door=outcome | true |
| /contact/ | Prospective customers | Describe the work and request a fit review. | Form confirmation on this page | true |
| /support/ | Existing customers and tool users | Find the correct support channel without assuming service entitlements. | /contact/ | true |
| /field-notes/ | Technical evaluators and readers | Read the development record and lessons from the work. | /field-notes/[...slug]/ | true |
| /field-notes/[...slug]/ | Readers | Understand one piece of work with its source attribution. | /field-notes/ | self-canonical only |
| /field-notes/rss.xml | Feed subscribers | Follow published notes in a feed reader. | /field-notes/ | false |
| /terms/ | Visitors and customers | Read the published terms. | /contact/ | true |
| /privacy/ | Visitors and customers | Read data handling information. | /contact/ | true |
| /acceptable-use/ | Visitors and customers | Read usage boundaries. | /contact/ | true |
| /site-map/ | All visitors | Choose a page or related property by its job. | / | true |
| /404/ | Visitors with an invalid URL | Recover to an existing page. | /site-map/ | false |
| /thank-you/ | Visitors following an old survey link | Explain that this URL does not confirm a new submission. | /contact/ | false |
| /a2a/ | Visitors following an old link | Retired offer or superseded learning page. Explain the change and provide an explicit handoff. | /projects/ | false |
| /agents/ | Visitors following an old link | Retired offer or superseded learning page. Explain the change and provide an explicit handoff. | /projects/ | false |
| /ai-agents/ | Visitors following an old link | Retired offer or superseded learning page. Explain the change and provide an explicit handoff. | /projects/ | false |
| /ai-models/ | Visitors following an old link | Retired offer or superseded learning page. Explain the change and provide an explicit handoff. | /#method | false |
| /applications/ | Visitors following an old link | Retired offer or superseded learning page. Explain the change and provide an explicit handoff. | /projects/ | false |
| /automation/ | Visitors following an old link | Retired offer or superseded learning page. Explain the change and provide an explicit handoff. | /contact/?door=outcome | false |
| /cloud/ | Visitors following an old link | Retired offer or superseded learning page. Explain the change and provide an explicit handoff. | /contact/?door=outcome | false |
| /colab/ | Visitors following an old link | Retired offer or superseded learning page. Explain the change and provide an explicit handoff. | /contact/?door=partner | false |
| /infrastructure/ | Visitors following an old link | Retired offer or superseded learning page. Explain the change and provide an explicit handoff. | /#method | false |
| /intel-engine/ | Visitors following an old link | Retired offer or superseded learning page. Explain the change and provide an explicit handoff. | /projects/ | false |
| /private-ai/ | Visitors following an old link | Retired offer or superseded learning page. Explain the change and provide an explicit handoff. | /contact/?door=outcome | false |
| /resellers/ | Visitors following an old link | Retired offer or superseded learning page. Explain the change and provide an explicit handoff. | /contact/?door=partner | false |
| /security-compliance/ | Visitors following an old link | Retired offer or superseded learning page. Explain the change and provide an explicit handoff. | /#method | false |
| /learn/ | Visitors following an old link | Retired offer or superseded learning page. Explain the change and provide an explicit handoff. | https://learn.intentsolutions.io/ | false |
| /learn/models/ | Visitors following an old link | Retired offer or superseded learning page. Explain the change and provide an explicit handoff. | https://learn.intentsolutions.io/ | false |
| /learn/security/ | Visitors following an old link | Retired offer or superseded learning page. Explain the change and provide an explicit handoff. | https://learn.intentsolutions.io/ | false |

## Standalone public pages

Generated HTML in `astro-site/public/` is served as-is, outside Astro routing. The
`staticPages` export in `site-map.mjs` classifies every file (amended 2026-10-24,
tracker `bd_000-projects-dxtq.22.2`).

| URL | Audience | Purpose | Next action | XML sitemap |
|---|---|---|---|---|
| /estate-blueprint.html and the seven `/estate-blueprint-<chapter>.html` pages | Customers and practitioners | Read one connected view of how the company practice, evidence, people and network fit together. | /estate/ | true (self-canonical; listed through `customPages`) |
| /estate-blueprint.print.html | Readers printing the atlas | Print every atlas chapter; the chapters are the indexed pages. | /estate-blueprint.html | false (noindex) |
| /financial-diagrams/*.html | Readers of a financial atlas chapter | Open one figure at full size; the chapter is the indexed page. | /estate/economics/ | false (noindex) |

The chapter list comes from `src/data/operating-atlas.mjs`, the same source the
atlas generator uses, so a new chapter enters the contract and the sitemap without
a hand-maintained list.

## Related properties

| Property | Destination | Visitor purpose |
|---|---|---|
| Demos | https://demos.intentsolutions.io/ | Explore systems and experiments. A listing is not a purchase or a production-readiness guarantee. |
| Intent Labs | https://labs.intentsolutions.io/ | Inspect published evaluations, including failed results. |
| Evals | https://evals.intentsolutions.io/ | Read the definitions behind evaluation results. |
| Learn | https://learn.intentsolutions.io/ | Explore the practitioner method and the access requirements. |
| Tons of Skills | https://tonsofskills.com/ | Discover public plugins and agent skills. |
| Omarchy | https://oma.intentsolutions.io/ | Explore Omarchy plugins and their repositories. |
| Start AI Tools | https://startaitools.com/ | Read the original articles and development field notes. |
| Jeremy Longshore | https://jeremylongshore.com/ | Explore the founder’s personal work and writing. |

## Legacy handling

Sixteen old service/learning URLs remain available as explicit, non-indexable handoffs. No forced redirect or removal of old URLs is required. Old sales copy remains recoverable in Git history. Do not index these as active offers. Support was rewritten because the prior copy implied included service levels; thank-you no longer asserts receipt or promises an email from a static URL. Projects no longer publishes unverified counts, retired infrastructure, or client claims. Existing About team changes were preserved.

## Individual article inventory

Article instances inherit the field-note route's reader purpose and return to the Field notes index. Their canonical attribution controls indexing. Source content is preserved, not rewritten as marketing. This inventory records the current local sources; newly synchronized notes inherit the same contract.

| Local article | Canonical source |
|---|---|
| /field-notes/a-dead-socket-is-not-a-dead-host/ | https://startaitools.com/posts/a-dead-socket-is-not-a-dead-host/ |
| /field-notes/a-duplicate-is-a-relation-not-a-property/ | https://startaitools.com/posts/a-duplicate-is-a-relation-not-a-property/ |
| /field-notes/a-green-result-only-covers-what-it-ran/ | https://startaitools.com/posts/a-green-result-only-covers-what-it-ran/ |
| /field-notes/adversarial-review-before-team-rollout/ | https://startaitools.com/posts/adversarial-review-before-team-rollout/ |
| /field-notes/architecting-production-multi-agent-ai-platform-technical-leadership/ | https://startaitools.com/posts/architecting-production-multi-agent-ai-platform-technical-leadership/ |
| /field-notes/audit-harness-v010-enforcement-travels-with-code/ | https://startaitools.com/posts/audit-harness-v010-enforcement-travels-with-code/ |
| /field-notes/barcode-first-vision-model-second/ | https://startaitools.com/posts/barcode-first-vision-model-second/ |
| /field-notes/braves-booth-dashboard-ui-refactor-ai-pitcher-narrative/ | https://startaitools.com/posts/braves-booth-dashboard-ui-refactor-ai-pitcher-narrative/ |
| /field-notes/braves-booth-v1-release-player-drilldown/ | https://startaitools.com/posts/braves-booth-v1-release-player-drilldown/ |
| /field-notes/braves-postgame-expansion-and-two-ai-lessons/ | https://startaitools.com/posts/braves-postgame-expansion-and-two-ai-lessons/ |
| /field-notes/broadcast-day-llm-fallback-jchads-challenge/ | https://startaitools.com/posts/broadcast-day-llm-fallback-jchads-challenge/ |
| /field-notes/building-254-table-bigquery-schema-72-hours/ | https://startaitools.com/posts/building-254-table-bigquery-schema-72-hours/ |
| /field-notes/building-idempotent-stripe-billing-enforcement-firestore/ | https://startaitools.com/posts/building-idempotent-stripe-billing-enforcement-firestore/ |
| /field-notes/building-multi-platform-developer-tools/ | https://startaitools.com/posts/building-multi-platform-developer-tools/ |
| /field-notes/building-production-ci-cd-documentation-to-deployment/ | https://startaitools.com/posts/building-production-ci-cd-documentation-to-deployment/ |
| /field-notes/building-production-grade-testing-infrastructure-playwright-case-study/ | https://startaitools.com/posts/building-production-grade-testing-infrastructure-playwright-case-study/ |
| /field-notes/building-production-multi-agent-ai-brightstream-vertex-ai/ | https://startaitools.com/posts/building-production-multi-agent-ai-brightstream-vertex-ai/ |
| /field-notes/cap-drop-all-broke-the-gate-socket/ | https://startaitools.com/posts/cap-drop-all-broke-the-gate-socket/ |
| /field-notes/ccsc-five-releases-one-day-security-sprint/ | https://startaitools.com/posts/ccsc-five-releases-one-day-security-sprint/ |
| /field-notes/coasean-singularity-ai-agents-market-transformation/ | https://startaitools.com/posts/coasean-singularity-ai-agents-market-transformation/ |
| /field-notes/coppa-compliance-youth-sports-app-real-implementation-process/ | https://startaitools.com/posts/coppa-compliance-youth-sports-app-real-implementation-process/ |
| /field-notes/cut-what-wasnt-earned/ | https://startaitools.com/posts/cut-what-wasnt-earned/ |
| /field-notes/deploying-nextjs-15-google-cloud-run-custom-domain-ssl/ | https://startaitools.com/posts/deploying-nextjs-15-google-cloud-run-custom-domain-ssl/ |
| /field-notes/designing-local-first-resume-parser-architecture-edge-ai/ | https://startaitools.com/posts/designing-local-first-resume-parser-architecture-edge-ai/ |
| /field-notes/diagnosticpro-case-study/ | https://startaitools.com/posts/diagnosticpro-case-study/ |
| /field-notes/do-not-blindly-restart/ | https://startaitools.com/posts/do-not-blindly-restart/ |
| /field-notes/empty-is-not-clean/ | https://startaitools.com/posts/empty-is-not-clean/ |
| /field-notes/engine-to-product-three-interfaces-one-codebase/ | https://startaitools.com/posts/engine-to-product-three-interfaces-one-codebase/ |
| /field-notes/enterprise-documentation-transformation-git-native-taskwarrior-workflows/ | https://startaitools.com/posts/enterprise-documentation-transformation-git-native-taskwarrior-workflows/ |
| /field-notes/enterprise-software-transformation-waygate-mcp-case-study/ | https://startaitools.com/posts/enterprise-software-transformation-waygate-mcp-case-study/ |
| /field-notes/enterprise-workflow-transformation-n8n-tech-intelligence-platform/ | https://startaitools.com/posts/enterprise-workflow-transformation-n8n-tech-intelligence-platform/ |
| /field-notes/every-fix-failed-in-the-shape-of-the-bug/ | https://startaitools.com/posts/every-fix-failed-in-the-shape-of-the-bug/ |
| /field-notes/exit-0-is-not-success/ | https://startaitools.com/posts/exit-0-is-not-success/ |
| /field-notes/february-2026-state-of-affairs-255-commits-12-projects/ | https://startaitools.com/posts/february-2026-state-of-affairs-255-commits-12-projects/ |
| /field-notes/fine-tuning-iam1-hierarchical-multi-agent-vertex-ai/ | https://startaitools.com/posts/fine-tuning-iam1-hierarchical-multi-agent-vertex-ai/ |
| /field-notes/flops-correction-unchecked-derivation-peer-review/ | https://startaitools.com/posts/flops-correction-unchecked-derivation-peer-review/ |
| /field-notes/four-slices-one-shape/ | https://startaitools.com/posts/four-slices-one-shape/ |
| /field-notes/gate-the-statement-not-the-tool-name/ | https://startaitools.com/posts/gate-the-statement-not-the-tool-name/ |
| /field-notes/gemini-pr-review-silent-fail-cross-repo-triangulation/ | https://startaitools.com/posts/gemini-pr-review-silent-fail-cross-repo-triangulation/ |
| /field-notes/honest-perf-benchmarks-paid-api-compiler/ | https://startaitools.com/posts/honest-perf-benchmarks-paid-api-compiler/ |
| /field-notes/how-to-get-adk-agent-into-google-community-showcase/ | https://startaitools.com/posts/how-to-get-adk-agent-into-google-community-showcase/ |
| /field-notes/hybrid-ai-stack-reduce-costs-60-80-percent-intelligent-routing/ | https://startaitools.com/posts/hybrid-ai-stack-reduce-costs-60-80-percent-intelligent-routing/ |
| /field-notes/intent-solutions-october-2025-state-of-affairs/ | https://startaitools.com/posts/intent-solutions-october-2025-state-of-affairs/ |
| /field-notes/intent-solutions-portfolio-2025-production-deployment-velocity/ | https://startaitools.com/posts/intent-solutions-portfolio-2025-production-deployment-velocity/ |
| /field-notes/intentcad-viewer-dwg-fastview-parity/ | https://startaitools.com/posts/intentcad-viewer-dwg-fastview-parity/ |
| /field-notes/irsb-monorepo-v1-extracting-shared-packages/ | https://startaitools.com/posts/irsb-monorepo-v1-extracting-shared-packages/ |
| /field-notes/knowledge-base-zero-to-api-lifecycle-state-machine/ | https://startaitools.com/posts/knowledge-base-zero-to-api-lifecycle-state-machine/ |
| /field-notes/knowledge-os-bootstrap-seven-epics-marketplace-security/ | https://startaitools.com/posts/knowledge-os-bootstrap-seven-epics-marketplace-security/ |
| /field-notes/knowledge-os-render-promote-research-command/ | https://startaitools.com/posts/knowledge-os-render-promote-research-command/ |
| /field-notes/leading-complex-system-onboarding-documentation-to-infrastructure-access/ | https://startaitools.com/posts/leading-complex-system-onboarding-documentation-to-infrastructure-access/ |
| /field-notes/legal-toolkit-epic-planning-canary-ci-three-projects/ | https://startaitools.com/posts/legal-toolkit-epic-planning-canary-ci-three-projects/ |
| /field-notes/let-the-model-judge-make-the-code-decide/ | https://startaitools.com/posts/let-the-model-judge-make-the-code-decide/ |
| /field-notes/live-data-backbone-cache-circuits-sse/ | https://startaitools.com/posts/live-data-backbone-cache-circuits-sse/ |
| /field-notes/llm-legible-deterministic-architecture/ | https://startaitools.com/posts/llm-legible-deterministic-architecture/ |
| /field-notes/making-fire-and-forget-capture-safe-under-failure/ | https://startaitools.com/posts/making-fire-and-forget-capture-safe-under-failure/ |
| /field-notes/manifest-system-mutation-testing-pyramid/ | https://startaitools.com/posts/manifest-system-mutation-testing-pyramid/ |
| /field-notes/noise-robust-signed-llm-judge-evals/ | https://startaitools.com/posts/noise-robust-signed-llm-judge-evals/ |
| /field-notes/nothing-read-it-so-nothing-failed/ | https://startaitools.com/posts/nothing-read-it-so-nothing-failed/ |
| /field-notes/onboarding-one-person-audited-the-whole-estate/ | https://startaitools.com/posts/onboarding-one-person-audited-the-whole-estate/ |
| /field-notes/passing-is-not-validating/ | https://startaitools.com/posts/passing-is-not-validating/ |
| /field-notes/project-subagents-load-at-session-start/ | https://startaitools.com/posts/project-subagents-load-at-session-start/ |
| /field-notes/repo-resolver-integration-typed-errors-monorepo-detection/ | https://startaitools.com/posts/repo-resolver-integration-typed-errors-monorepo-detection/ |
| /field-notes/resizable-columns-wcag-contrast-braves-dashboard/ | https://startaitools.com/posts/resizable-columns-wcag-contrast-braves-dashboard/ |
| /field-notes/scaling-ai-batch-processing-enhancing-235-plugins-with-vertex-ai-gemini-on-the-free-tier/ | https://startaitools.com/posts/scaling-ai-batch-processing-enhancing-235-plugins-with-vertex-ai-gemini-on-the-free-tier/ |
| /field-notes/scaling-ai-systems-disaster-recovery-production-batch-processing/ | https://startaitools.com/posts/scaling-ai-systems-disaster-recovery-production-batch-processing/ |
| /field-notes/schema-debacle-rubric-on-spec-postmortem/ | https://startaitools.com/posts/schema-debacle-rubric-on-spec-postmortem/ |
| /field-notes/self-hosting-n8n-enterprise-automation-zero-monthly-cost/ | https://startaitools.com/posts/self-hosting-n8n-enterprise-automation-zero-monthly-cost/ |
| /field-notes/server-ops-mcp-safety-before-tools/ | https://startaitools.com/posts/server-ops-mcp-safety-before-tools/ |
| /field-notes/seventeen-spellings-of-the-same-number/ | https://startaitools.com/posts/seventeen-spellings-of-the-same-number/ |
| /field-notes/stop-trusting-the-stored-claim/ | https://startaitools.com/posts/stop-trusting-the-stored-claim/ |
| /field-notes/temporary-is-not-a-plan/ | https://startaitools.com/posts/temporary-is-not-a-plan/ |
| /field-notes/terraform-complete-learning-guide-infrastructure-as-code/ | https://startaitools.com/posts/terraform-complete-learning-guide-infrastructure-as-code/ |
| /field-notes/the-agents-mistakes-were-the-fast-ones/ | https://startaitools.com/posts/the-agents-mistakes-were-the-fast-ones/ |
| /field-notes/the-api-is-the-real-boundary/ | https://startaitools.com/posts/the-api-is-the-real-boundary/ |
| /field-notes/the-commit-the-test-actually-installed/ | https://startaitools.com/posts/the-commit-the-test-actually-installed/ |
| /field-notes/the-corrected-record-was-still-wrong/ | https://startaitools.com/posts/the-corrected-record-was-still-wrong/ |
| /field-notes/the-filesystem-was-the-only-thing-they-shared/ | https://startaitools.com/posts/the-filesystem-was-the-only-thing-they-shared/ |
| /field-notes/the-gate-that-could-not-fail/ | https://startaitools.com/posts/the-gate-that-could-not-fail/ |
| /field-notes/the-green-badge-came-back-through-a-hyphen/ | https://startaitools.com/posts/the-green-badge-came-back-through-a-hyphen/ |
| /field-notes/the-kernel-must-not-import-its-agents/ | https://startaitools.com/posts/the-kernel-must-not-import-its-agents/ |
| /field-notes/the-second-review-that-audits-the-claims/ | https://startaitools.com/posts/the-second-review-that-audits-the-claims/ |
| /field-notes/the-status-nothing-could-write-to/ | https://startaitools.com/posts/the-status-nothing-could-write-to/ |
| /field-notes/the-wrong-product-built-perfectly/ | https://startaitools.com/posts/the-wrong-product-built-perfectly/ |
| /field-notes/three-copies-of-the-key-none-of-the-passphrase/ | https://startaitools.com/posts/three-copies-of-the-key-none-of-the-passphrase/ |
| /field-notes/usable-not-just-functional-four-repos-40-commits/ | https://startaitools.com/posts/usable-not-just-functional-four-repos-40-commits/ |
| /field-notes/we-told-the-auditors-to-refute-us/ | https://startaitools.com/posts/we-told-the-auditors-to-refute-us/ |
| /field-notes/when-green-ci-proves-nothing/ | https://startaitools.com/posts/when-green-ci-proves-nothing/ |
| /field-notes/when-llm-output-lies-instead-of-crashing/ | https://startaitools.com/posts/when-llm-output-lies-instead-of-crashing/ |
| /field-notes/write-once-publish-everywhere-content-distribution-infra/ | https://startaitools.com/posts/write-once-publish-everywhere-content-distribution-infra/ |
| /field-notes/wrong-mode-green-is-not-a-gate/ | https://startaitools.com/posts/wrong-mode-green-is-not-a-gate/ |
| /field-notes/zero-to-ci-full-stack-dashboard-one-session/ | https://startaitools.com/posts/zero-to-ci-full-stack-dashboard-one-session/ |

The upstream content rebase also preserved `/field-notes/the-cost-of-one-feature-in-a-sealed-repo/`, canonical to https://startaitools.com/posts/the-cost-of-one-feature-in-a-sealed-repo/ and excluded from this site's XML sitemap.

## Regression gates

The route contract lives in astro-site/src/data/site-map.mjs. audit-site-map.mjs checks complete source coverage, unique mappings, one H1, intended indexing, and every local link/anchor on static route pages. It also requires every `public/**/*.html` file to match exactly one standalone entry, with indexable entries self-canonical and in the XML sitemap and the rest noindex and absent. audit-indexability.mjs separately checks emitted XML URLs, canonical agreement, unique titles, and utility artifacts. Public /site-map/ exposes current company and related-property destinations, not obsolete offers. API endpoints and healthz are infrastructure, not marketing pages.
