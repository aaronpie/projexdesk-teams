# BotMRR packages

The open-source package registry behind [BotMRR](https://botmrr.io) and [OpenMausBot](https://github.com/milind-soni/OpenMausBot).

Each `.mauspack.json` is one readable, portable file containing the listing, bots, Chief of Staff, shared rooms, playbooks, connector requirements, examples, and suggested routines for one outcome. It never contains conversations, credentials, approval grants, provider sessions, memory, or private computer paths.

## Available teams

| Package | Outcome | Bots | Install file |
| --- | --- | ---: | --- |
| [SEO Growth Team](teams/seo-growth) | Prioritize search work most likely to grow qualified traffic | 4 | [Package](packages/seo-growth.mauspack.json) |
| [Engineering Team](teams/engineering) | Take a software change from intent to a verified release | 4 | [Package](packages/engineering.mauspack.json) |
| [100x Marketing Team](teams/100x-marketing) | Launch a focused campaign and make a stop-or-scale decision | 4 | [Package](packages/100x-marketing.mauspack.json) |
| [Reddit Lead Miner](teams/reddit-lead-miner) | Find qualified Reddit leads with source evidence | 2 | [Package](packages/reddit-lead-miner.mauspack.json) |
| [Competitor Watch](teams/competitor-watch) | Turn material competitor changes into a decision brief | 2 | [Package](packages/competitor-watch.mauspack.json) |
| [Inbox Follow-up](teams/inbox-follow-up) | Recover sales conversations where your team owes the next step | 2 | [Package](packages/inbox-follow-up.mauspack.json) |

## Install a package

Browse [botmrr.io](https://botmrr.io), choose an outcome, and click **Add to OpenMausBot**. You can also download the package JSON and import it manually.

Suggested routines always install paused. Connected apps are reviewed and authorized inside OpenMausBot after import.

## How this repository works

- [`catalog.json`](catalog.json) is the machine-readable index the app can load.
- [`packages/`](packages) contains the canonical one-file packages used by BotMRR and current OpenMausBot versions.
- [`schema/package.schema.json`](schema/package.schema.json) documents the complete portable format.
- [`teams/`](teams) contains legacy manifests and plain Markdown views for older app versions and human review.
- Pull requests validate every package, cross-reference, compatibility manifest, and referenced file, then build the directory.

## Contributing

Community packages are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md), copy one of the existing package files, and open a pull request.

Playbooks are instructions that can influence a bot's behavior. Read them before installing a package. This repository does not accept secrets, generated bundles, or executable playbook scripts.

## License

MIT
