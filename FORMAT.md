# BotMRR Markdown v1

The format is intentionally one normal Markdown file.

```md
---
botmrr: 1
id: example-team
release: 1.0.0
name: Example Team
tagline: The outcome in one sentence.
# listing, roles, rooms, playbooks, connections, and paused routines
---

# Example Team

> Give this file to your Chief of Staff.

## Activation
...

## Team
...
```

The frontmatter is required for a playbook published on BotMRR because it powers the listing and optional one-click imports. General-purpose agent products can ignore it completely. The Markdown body is authoritative for people and Chief-of-Staff agents, and must stand on its own when pasted into an agent conversation.

Required body sections are `Activation`, `Mission`, `Outcomes`, `Connections`, `Team`, `Chief of Staff`, and `Completion rule`. Add shared rooms, routines, playbooks, and examples only when the team needs them.

Products that cannot create sub-agents should perform each role sequentially and keep the work clearly separated. Products must never treat a connector name as authorization, and routines must stay paused until the user explicitly enables them.
