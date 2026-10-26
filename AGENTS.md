# Agent Instructions

Read [CLAUDE.md](CLAUDE.md) for the active Astro site, source ownership and release checks.
The [financial atlas record](000-docs/089-AT-DSGN-financial-atlas.md) is the recovery entry
for the estate, published teaching diagrams and completed private presenter delivery.

## Beads tracker context

Use Beads for all durable task tracking and `bd remember` for persistent project memory.
Do not create Markdown TODO lists or ad hoc memory files.

As verified October 12, 2026, the landing-local database needs repair, tracked by
`bd_000-projects-dxtq.9`. On the owner's workstation, use the existing umbrella database:

```bash
bd -C /home/jeremy/000-projects prime
bd -C /home/jeremy/000-projects ready --json
bd -C /home/jeremy/000-projects show <id> --json
bd -C /home/jeremy/000-projects update <id> --claim --json
bd -C /home/jeremy/000-projects create "Title" --description "Context and acceptance" -t task -p 2 --json
bd -C /home/jeremy/000-projects close <id> --reason "Verified outcome" --json
bd -C /home/jeremy/000-projects dolt push
```

Do not run repository-local initialization, JSONL import or schema migration as a workaround.
On other machines, establish the maintainer-designated tracker before issue mutations.
Return to a repaired local tracker only after the repair task identifies its verified authority.
Use the installed `beads` skill for context recovery and health diagnosis.

Issues live in Dolt; `bd dolt push/pull` synchronizes issue data through `refs/dolt/data`.
Git branch pushes synchronize code separately. `.beads/issues.jsonl` is a passive export,
not the wire protocol or a substitute for the database. Link newly discovered work with
`discovered-from:<parent-id>` rather than duplicating an existing task.

## Session completion

1. Record remaining work in Beads and update completed issue states.
2. Run checks appropriate to the diff and all required release gates. Preserve unrelated work.
3. Commit only the intended files, integrate upstream changes on the working branch and push it.
4. Push Beads data from the designated tracker and verify the remote code state.
5. Follow repository branch protection, review and required-check policy for pull requests.
6. Hand off the verified result, source locations and unresolved limitations.

Work is not complete while authorized changes remain only local. Resolve ordinary push
failures and verify that the branch is up to date with its remote. Use the estate merge guard
when this repository is enrolled; do not invent enrollment or bypass a refused gate.

Do not delete branches, tags or unrelated stashes, rewrite history, force-push or bypass
protection without explicit authorization. Preserve historical research and already-delivered
private artifacts. Root documentation updates do not prove a website deployment, legal
execution, recorded video or adopted commercial model.
