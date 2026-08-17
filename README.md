# OpenMausBot Teams

Community-maintained team templates for [OpenMausBot](https://github.com/milind-soni/OpenMausBot).

Each team is a small, readable package of bot roles and optional Markdown skill playbooks. Team files never contain conversations, credentials, permissions, provider sessions, or computer access.

## Available teams

| Team | What it is for | Members | Download |
| --- | --- | ---: | --- |
| [SEO Growth Team](teams/seo-growth) | Search strategy, keyword research, technical SEO, and content briefs | 4 | [Team file](teams/seo-growth/team.mausteam.json) |
| [Engineering Team](teams/engineering) | Planning, implementation, review, testing, and releases | 4 | [Team file](teams/engineering/team.mausteam.json) |
| [100x Marketing Team](teams/100x-marketing) | Positioning, campaigns, distribution, and growth experiments | 4 | [Team file](teams/100x-marketing/team.mausteam.json) |

## Install a team

1. Open a team folder above and download its `team.mausteam.json` file.
2. In OpenMausBot, click the **+** button and choose **Import Team**.
3. Review the members, then import it.

The JSON manifests use OpenMausBot's current `openmaus.team` version 1 format, so their bot roles can be imported today. The adjacent `skills/` folders are deliberately plain Markdown and ready for the upcoming in-app Team Library. Compatible app versions can preview and install them; older versions safely ignore them.

## How this repository works

- [`catalog.json`](catalog.json) is the machine-readable index the app can load.
- Every team lives in its own folder with a manifest, README, and reviewable skills.
- [`schema/team.schema.json`](schema/team.schema.json) documents the portable team format.
- Pull requests run a dependency-free validator that checks manifests and referenced files.

## Contributing

Community teams are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md), copy one of the existing team folders, and open a pull request.

Skills are instructions that can influence an agent's behavior. Read them before installing a team. This repository does not accept secrets, binaries, generated bundles, or executable skill scripts.

## License

MIT
