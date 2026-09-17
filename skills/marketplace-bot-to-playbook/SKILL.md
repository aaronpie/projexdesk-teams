---
name: marketplace-bot-to-playbook
description: Turn a public bot marketplace or share link into an independent, safety-reviewed ProjexDesk playbook (BotMRR Markdown v1) for the projexdesk-teams template marketplace. Use when given a marketplace bot URL and asked to translate, port, adapt, or publish it as a ProjexDesk team template or skill playbook.
license: MIT
---

# Marketplace Bot → ProjexDesk Playbook

Turn a public bot listing from another agent product (a marketplace page or public share link) into a **ProjexDesk playbook**. The output is one BotMRR Markdown v1 file in `packages/<id>.md` of the `projexdesk-teams` repository.

The output is an **independent reconstruction inspired by** the public listing. It is not a copy of the creator's configuration.

## When to use

- "Translate this marketplace bot into a ProjexDesk template: <url>"
- "Make a playbook from this bot link"
- "Adapt <url> for construction management and add it to our template marketplace"

## Inputs

| Input | Required | Notes |
|---|---|---|
| `url` | yes | Public marketplace page or share link (https only) |
| `mode` | no | `reconstruct` (default) or `faithful-port` (only with the creator's written permission; see Step 2) |
| `shape` | no | `single-bot` or `team`. Infer from the listing if not given. |
| `adapt` | no | e.g. `construction-management`. Adds the CM role, approval, and vocabulary layer (Step 5). |
| `id` | no | Package slug. Default: a descriptive, neutral slug (Step 6). |

If `url` is missing or not https, stop and ask for it.

## Hard rules

1. **Read only the public page.** Never click "Import", "Add", or "Install". Never sign in, and never add the bot to any account. Adding a third-party bot usually accepts terms that forbid re-sharing its configuration.
2. **No verbatim copying** of the creator's description, prompts, skill bodies, or routine text in `reconstruct` mode. Write every role, playbook, and routine in your own words, from the observable *job* and *boundaries*.
3. **Credit, don't impersonate.** Name the creator and link the source in `## Origin`. Don't use another product's trademark in `id`, `name`, or `tagline`, and don't imply endorsement or affiliation.
4. **Carry no runtime state:** no credentials, tokens, OAuth grants, cookies, memory, conversation content, account IDs, private or internal URLs, local paths, IP/Tailscale addresses, or exact model IDs.
5. **No executable payloads:** no scripts, encoded blobs, or binaries. Skills are Markdown instructions only.
6. **Approval boundaries are mandatory.** Every agent description must say what it never does without explicit human approval.
7. **Routines ship paused** (`enabledAfterInstall: false`) and are described as "paused — the user must enable it."
8. **Never commit, push, or open a PR** without the user's explicit approval.

## Procedure

### Step 1: Fetch and extract (public page only)
Fetch the URL with a read-only web fetch. Record:
- Listing title, creator name/handle, URL, and date retrieved
- One-paragraph statement of the bot's **job**
- **Anti-jobs:** things it explicitly does not do
- Voice/tone traits
- Named skills, playbooks, and slash commands (names and purpose only)
- Routines (name, cadence, purpose)
- Connectors/apps it needs
- First-run/setup steps
- Platform-specific tools it relies on (e.g. an internal "create agent" or "update state" tool, secret-request flows, network tunnels)

If the page shows too little to reconstruct the job, stop and tell the user what is missing. Don't invent capabilities.

### Step 2: Rights check
- Default to `reconstruct`.
- Use `faithful-port` only if the user confirms the creator's written permission. Record where it was granted (link or note) in `## Origin`. Even then, strip everything listed in Hard Rule 4.
- If the listing says its content is confidential or not for redistribution, stop and report.

### Step 3: Map platform concepts to ProjexDesk

| Source concept | ProjexDesk equivalent |
|---|---|
| Bot identity (name, title, description) | `agents[]` entry: `key`, `name`, `title`, `description` (≤ 4,000 chars), `appearance.color` |
| Long persona / standing rules | `agents[].soul` (≤ 24 KB), only if the description can't hold it |
| "Create agent" tool / bot that builds bots | Instruction to create bots through ProjexDesk's normal bot-creation flow, with user confirmation before each bot is created |
| Named skills / slash commands | `playbooks[]` (inline instructions + triggers). Use embedded `skills.entries` (SKILL.md, max 20) only when the procedure is long and reusable. Each embedded skill must be referenced by an agent. |
| Scheduled routine | `routines[]` with `schedule.type: daily` (HH:MM + weekdays) or `once`, `runOn: maus`, `durationMinutes`, `enabledAfterInstall: false` |
| Event/webhook routine | Describe in the body under `## Suggested routines` as a manual setup step (the package schema has no webhook trigger). Never include a webhook URL or key. |
| Connected apps / plugins | `requirements.apps[]` with `slug`, `label`, plain-language `reason`, `optional` |
| Secret-request flow | "Use ProjexDesk App Settings / the normal connection flow. Never paste secrets in chat." |
| Multi-bot group chat | `rooms[]` with `members`, `bulletin`, `defaultResponder` |
| Orchestrator / chief bot | `chiefOfStaff: <key>`. For a single-bot package, that bot is its own Chief of Staff. |
| Memory / learned preferences | Not transferred. Add a first-run interview step instead. |
| Model choice, cloud VM, tunnels, local hosting | Drop. Mention in the review notes as "not carried over." |

### Step 4: Safety review
For every field you will write, check:
- [ ] No secrets, personal data, internal URLs, local paths, or account IDs
- [ ] No instructions to bypass approvals, hide actions, or act silently on external systems
- [ ] Destructive or outbound actions (send, post, pay, delete, merge, deploy, accept, sign) require explicit approval
- [ ] Evidence is kept separate from inference; no invented metrics or results
- [ ] No claims of official affiliation
- [ ] Money claims appear only in an optional `proof` block, with a working public source and the creator's exact figure

### Step 5: Optional construction-management adaptation (`adapt: construction-management`)
- Reframe roles for Field Engineers, Resident Engineers, Project Managers, Division Directors, or admin staff.
- Add CM approval boundaries: never approve/reject submittals, issue RFI responses of record, accept quantities or pay estimates, issue notices, commit cost/schedule/scope, sign or stamp, or send to owners, contractors, designers, or agencies without explicit human approval.
- Use CM vocabulary (RFIs, submittals, change orders, daily reports, pay estimates, contract documents).
- Put `construction-management` in `tags`, and use an appropriate `category` (e.g. `Construction`).

### Step 6: Write the package
Target path: `packages/<id>.md`. The `id` must equal the filename stem and match `^[a-z0-9][a-z0-9-]*$`. Use a neutral, outcome-based slug (e.g. `bot-design-desk`, `cm-bot-architect`). If the repo owner prefers a creator-based convention, follow the existing files in `packages/`.

**Frontmatter** (YAML, `botmrr: 1`). Required: `id`, `release` (semver, start `1.0.0`), `name` (≤ 100), `tagline` (≤ 160), `summary` (≤ 2,000), `category`, `author` (`name: BotMRR`, `url: https://botmrr.io` unless told otherwise), `license: MIT`, `tags`, `outcomes` (1–12, each ≤ 240), `setupMinutes` (1–240), `requirements` (`apps`, `capabilities`, `platforms`), `agents`, `chiefOfStaff`. Optional: `rooms`, `routines`, `playbooks`, `skills`, `examples`, `proof`.

**Body sections** (in this order; the first five and the last two are required by the validator):
1. `# <name>`, then the tagline, then the "Give this file to your Chief of Staff" callout
2. `## Activation`: Chief of Staff instructions, no pasted secrets, approval rule, "All routines start paused."
3. `## Mission`
4. `## Outcomes`
5. `## Connections`
6. `## Team`: one `### Name — Title` per agent, with role key, playbooks, and description
7. `## Chief of Staff`
8. `## Shared rooms` (if any)
9. `## Suggested routines` (if any, including manual webhook setups)
10. `## Playbooks` (if any)
11. `## Example job` (optional)
12. `## Origin`: creator, source link, date retrieved, mode (`reconstruct` / `faithful-port` + permission reference), and one sentence stating that this is an independent reconstruction, not the creator's configuration, and that outcomes are unverified
13. `## Completion rule`

The body must stand on its own when pasted into any agent product, and it must agree with the frontmatter.

### Step 7: Validate
From the repo root:
```
npm test
```
Fix every error. If the validator can't run, check manually against Step 6 and say so.
If a ProjexDesk checkout is available, also confirm the file imports through ProjexDesk's package parser (`parseBotPackage` in `server/bot-package.ts`). Its limits are the source of truth: agent keys are unique, playbook and skill references resolve, room members exist, routines are disabled after install, and embedded skill frontmatter matches its entry.

### Step 8: Report for human review
Return:
1. File path and validation result
2. **Carried over:** jobs, anti-jobs, playbooks, routines
3. **Changed:** platform mappings, CM adaptation
4. **Dropped:** platform-only tools, memory, model settings, tunnels, anything unsafe
5. **Inferred:** anything not stated on the page
6. **Rights status:** mode and permission reference
7. Proposed catalog/site changes (if any)
8. A request for approval before commit/PR

## Failure handling

| Situation | Action |
|---|---|
| Page requires sign-in or blocks fetching | Stop. Ask the user to paste the public description text. Never sign in. |
| Listing is mostly platform tooling with no transferable job | Report that it is not portable, and suggest a playbook built from the underlying idea instead |
| Validator fails on repo-wide issues unrelated to the new file | Report them separately; don't "fix" unrelated files without approval |
| Creator asks for removal | Remove the package and its site references in a PR for approval |
