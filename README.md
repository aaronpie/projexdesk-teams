# BotMRR playbooks

The open-source directory of portable AI teams behind [BotMRR](https://botmrr.io).

Every team is one ordinary Markdown file. Give it to the Chief of Staff in OpenMausBot, Grok, Claude, ChatGPT, or another agent product. The Chief reads the mission, spawns or simulates the specialist roles, coordinates their playbooks, and returns the completed work.

The YAML frontmatter gives products an optional reliable import path. The Markdown body is the full, provider-neutral operating playbook. Nothing requires OpenMausBot to understand or run it.

## Available teams

| Playbook | Outcome | Bots | Markdown |
| --- | --- | ---: | --- |
| [SEO Growth Team](teams/seo-growth) | Prioritize search work most likely to grow qualified traffic | 4 | [Open](packages/seo-growth.md) |
| [Engineering Team](teams/engineering) | Take a software change from intent to a verified release | 4 | [Open](packages/engineering.md) |
| [100x Marketing Team](teams/100x-marketing) | Launch a focused campaign and make a stop-or-scale decision | 4 | [Open](packages/100x-marketing.md) |
| [Reddit Lead Miner](teams/reddit-lead-miner) | Find qualified Reddit leads with source evidence | 2 | [Open](packages/reddit-lead-miner.md) |
| [Competitor Watch](teams/competitor-watch) | Turn material competitor changes into a decision brief | 2 | [Open](packages/competitor-watch.md) |
| [Inbox Follow-up](teams/inbox-follow-up) | Recover sales conversations where your team owes the next step | 2 | [Open](packages/inbox-follow-up.md) |

## Use a playbook

1. Browse [botmrr.io](https://botmrr.io) and choose an outcome.
2. Download or copy the Markdown.
3. Give it to your product's Chief of Staff and ask it to activate the team.

OpenMausBot can also install the same Markdown directly, creating the bots, Chief of Staff, rooms, playbooks, connector intent, and paused routines. Other products can simply follow the readable activation instructions.

Suggested routines always start paused. Connections are requirements, never credentials. A playbook never contains conversations, OAuth grants, approvals, memory, provider sessions, local paths, or secrets.

## Repository structure

- [`packages/`](packages) contains the canonical one-file Markdown playbooks.
- [`FORMAT.md`](FORMAT.md) documents the small portable convention.
- [`catalog.json`](catalog.json) is the directory index.
- [`teams/`](teams) retains compatibility files for older OpenMausBot versions.

Pull requests validate every playbook, reference, compatibility manifest, and safety boundary, then build the directory.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md), copy an existing Markdown playbook, and open a pull request. This repository does not accept secrets, generated binary bundles, or executable playbook scripts.

## License

MIT
