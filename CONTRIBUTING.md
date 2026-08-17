# Contributing a team

Thanks for sharing a team with the OpenMausBot community.

## Before opening a pull request

1. Copy an existing folder under `teams/` and give it a lowercase kebab-case slug.
2. Keep the team focused on one outcome and use distinct, practical roles.
3. Make every member description usable as an agent instruction, not marketing copy.
4. Add only Markdown skills under the team's own `skills/` directory.
5. Add the team to `catalog.json` and run `npm test`.
6. Import the manifest into OpenMausBot and confirm the preview is accurate.

## Safety rules

Submissions must not include:

- API keys, tokens, cookies, personal data, or example secrets
- executable files or encoded payloads
- instructions to bypass approvals or conceal actions
- destructive actions without an explicit user confirmation step
- trademark impersonation or claims of official affiliation

Skills should state their expected inputs, process, output, and guardrails. If a team benefits from a connected app, declare it as a requirement; never embed credentials.

## Review expectations

Maintainers may edit titles, descriptions, or guardrails for clarity. Inclusion in the catalog is curated and does not imply endorsement of every recommendation produced by a team.
