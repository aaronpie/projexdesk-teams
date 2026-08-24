# Contributing a BotMRR playbook

Thanks for sharing a useful AI team with every agent community—not just OpenMausBot users.

## Before opening a pull request

1. Copy an existing file under `packages/` and keep it as ordinary `.md`.
2. Focus the playbook on one measurable outcome with distinct, practical specialist roles.
3. Make the Markdown body complete enough that a Chief of Staff in any agent product can activate and run the team.
4. Keep the YAML frontmatter aligned with the readable body so products that support direct import can create the same structure.
5. Explain each connected app in plain language and mark optional connections explicitly.
6. Keep every suggested routine paused until the user reviews and enables it.
7. Add the playbook to `catalog.json`, retain a legacy folder under `teams/`, and run `npm test` and `npm run build`.

## Safety rules

Submissions must not include:

- API keys, tokens, cookies, personal data, or example secrets
- executable files or encoded payloads
- instructions to bypass approvals or conceal actions
- destructive actions without explicit user confirmation
- trademark impersonation or unsupported claims of official affiliation

The activation section must say what requires human approval. Playbooks should distinguish evidence from inference and state their expected inputs, process, output, and guardrails.

## Playbook boundaries

One Markdown may describe listing metadata, specialist roles, a Chief of Staff, shared rooms, process playbooks, connector requirements, examples, and suggested routines. It must not contain runtime state such as credentials, OAuth grants, prior conversations, memory, approval history, provider sessions, exact private model ids, or local paths.

## Review expectations

Maintainers may edit titles, descriptions, formatting, or guardrails for clarity. Inclusion in the directory is curated and does not imply endorsement of every recommendation produced by a team.
