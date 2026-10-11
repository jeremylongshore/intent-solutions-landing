// This is the declared Intent delivery method, not a claim that every system has
// already completed every gate. Node outputs make the method reviewable.
export const deliveryPage = {
  id: 'delivery', number: '03', title: 'From an outcome to an owned operation',
  kicker: 'THE DELIVERY SYSTEM', status: 'mixed',
  lead: 'Frame → Build → Prove → Operate is the shared method. Each handoff carries a concrete artifact, an acceptance condition, and a responsible person.',
  takeaway: 'The customer receives a working capability and the means to evolve it. A deployment is incomplete while operating ownership is unresolved.',
  diagram: {
    width: 1320, height: 760,
    description: 'Four delivery stages connect left to right. Each produces an artifact below. A failed release decision sends work back to the build; operational findings return to the scope and baseline. This is the delivery method, not a record of universal implementation.',
    regions: [{ x: 16, y: 32, w: 1288, h: 334, label: 'SHARED METHOD · APPLY TO THE ACTUAL ENGAGEMENT', color: 'slate' }, {x: 16, y: 393, w:1288,h:228,label:'HANDOFF ARTIFACTS · DEFINE OWNER AND ACCEPTANCE',color:'slate'}],
    nodes: [
      {id:'frame',x:32,y:118,w:266,h:196,eyebrow:'01 / FRAME',title:'Agree what must change',body:'Observe the workflow with the people who own it. Define the useful result, constraints, baseline, and human decisions.',color:'blue',items:[{label:'Business outcome → acceptance criteria'}]},
      {id:'build',x:362,y:118,w:266,h:196,eyebrow:'02 / BUILD',title:'Engineer the whole workflow',body:'Connect data, systems, models, and tools. Build exception paths and controls alongside the useful behavior.',color:'cyan',items:[{label:'Model choice follows the work'}]},
      {id:'prove',x:692,y:118,w:266,h:196,eyebrow:'03 / PROVE',title:'Test the claim in context',body:'Evaluate representative work and failure cases. Review the result against the agreed standard, including its limits.',color:'purple',items:[{label:'A demo is one piece of evidence'}]},
      {id:'operate',x:1022,y:118,w:266,h:196,eyebrow:'04 / OPERATE',title:'Transfer, run, and improve',body:'Establish monitoring, rollback, response, and ownership. Transfer the access and knowledge the customer needs.',color:'orange',items:[{label:'A capable customer is an outcome'}]},
      {id:'brief',x:32,y:435,w:266,h:168,eyebrow:'ARTIFACT',title:'Outcome brief',body:'Scope, baseline, success test, decision rights, data boundaries, and the intended handoff.',color:'blue',shape:'artifact'},
      {id:'candidate',x:362,y:435,w:266,h:168,eyebrow:'ARTIFACT',title:'Versioned candidate',body:'Source, configuration, integration contracts, operating assumptions, and testable behavior.',color:'cyan',shape:'artifact'},
      {id:'release',x:692,y:435,w:266,h:168,eyebrow:'DECISION GATE',title:'Evidence + release decision',body:'Results, failures, acceptance, and authorization to release. Unmet conditions return to engineering.',color:'purple',shape:'gate'},
      {id:'handoff',x:1022,y:435,w:266,h:168,eyebrow:'ARTIFACT',title:'Operating handoff',body:'Runbook, access, owner, rollback, incident path, knowledge transfer, and review cadence.',color:'orange',shape:'artifact'},
    ],
    edges: [
      {from:'frame',to:'build',path:'M298 216 H362',kind:'flow',label:'scope',labelX:330,labelY:198},
      {from:'build',to:'prove',path:'M628 216 H692',kind:'flow',label:'test',labelX:660,labelY:198},
      {from:'prove',to:'operate',path:'M958 216 H1022',kind:'flow',label:'accept',labelX:990,labelY:198},
      ...[['frame','brief',165],['build','candidate',495],['prove','release',825],['operate','handoff',1155]].map(([from,to,x])=>({from,to,path:`M${x} 314 V435`,kind:'governance',label:'produces',labelX:x+43,labelY:352})),
      {from:'release',to:'candidate',path:'M825 603 V650 H495 V603',kind:'feedback',label:'Failure → correction → rerun',labelX:660,labelY:671,color:'purple'},
      {from:'handoff',to:'brief',path:'M1155 603 V716 H165 V603',kind:'feedback',label:'Operating evidence → changed baseline, scope, or next problem',labelX:660,labelY:739,color:'orange'},
    ], notes: [],
  },
  panels: [
    {title:'Acceptance is a shared decision',body:'The customer owns the business acceptance criteria and the authority it retains. The agreed engagement identifies who may approve scope, release, and changes.',items:['The delivery lead assembles evidence and resolves failed conditions.','The operating owner accepts the runbook and failure response.','A tool-generated pass never replaces required human authorization.']},
    {title:'Independence is designed into the handoff',body:'Documentation, access, training, maintenance responsibilities, and an exit path belong in the delivery plan from the beginning.',items:['Use customer constraints to decide where systems run.','Agree support responsibilities and escalation before release.','Revisit provider and architecture choices when evidence changes.']},
  ],
  sources:[{label:'Published Intent delivery method',href:'https://intentsolutions.io/#method'},{label:'Learn: the shared operating standard',href:'https://learn.intentsolutions.io/'},{label:'Public evaluation evidence',href:'https://labs.intentsolutions.io/'},{label:'Owner-directed operating model; handoff artifacts are a method specification, not a completed-engagement claim.'}],
  mermaid:'flowchart LR\n  frame[Frame: outcome and acceptance] --> build[Build: versioned candidate]\n  build --> prove[Prove: evidence and release decision]\n  prove -->|accepted and authorized| operate[Operate: ownership and handoff]\n  prove -->|unmet condition| build\n  operate -->|operating evidence| frame\n',
};
