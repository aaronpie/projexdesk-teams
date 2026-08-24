# Contributing a BotMRR package

Thanks for sharing a team with the OpenMausBot community.

## Before opening a pull request

1. Copy an existing `.mauspack.json` file under `packages/` and give it a lowercase kebab-case id.
2. Keep the package focused on one measurable outcome and use distinct, practical bot roles.
3. Make every bot description and embedded playbook usable as an instruction, not marketing copy.
4. Declare connected apps with a plain-language reason and mark optional connections explicitly.
5. Keep every suggested routine disabled after install so the user reviews it before activation.
6. Add a legacy compatibility folder under `teams/`, add the package to `catalog.json`, and run `npm test` and `npm run build`.
7. Import the package into OpenMausBot and confirm the bots, Chief of Staff, rooms, playbooks, connections, and paused routines are accurate.

## Safety rules

Submissions must not include:

- API keys, tokens, cookies, personal data, or example secrets
- executable files or encoded payloads
- instructions to bypass approvals or conceal actions
- destructive actions without an explicit user confirmation step
- trademark impersonation or claims of official affiliation

Playbooks should state their expected inputs, process, output, and guardrails. If a package benefits from a connected app, declare it as a requirement; never embed credentials.

## Package boundaries

One package may contain listing metadata, bots, a Chief of Staff reference, shared rooms, playbooks, connector requirements, examples, and suggested routines. It must not contain runtime state such as credentials, OAuth grants, prior conversations, memory, approval history, provider sessions, exact private model ids, or local paths.

## Review expectations

Maintainers may edit titles, descriptions, or guardrails for clarity. Inclusion in the catalog is curated and does not imply endorsement of every recommendation produced by a team.
