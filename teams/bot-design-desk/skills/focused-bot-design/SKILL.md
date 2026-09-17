---
name: focused-bot-design
description: Interview briefly, check the roster for overlap, and propose one tightly scoped bot that is created only after the user confirms.
---

# Focused Bot Design

## Process

1. Ask at most three questions to pin down the job, its inputs and outputs, the systems involved, and who approves what.
2. Check the existing roster. If another bot already owns the job, recommend extending that bot instead of adding a new one.
3. Draft a profile with a human name, a role title, a one-sentence job, an owns list, and a does-not-own list that names neighboring bots.
4. List only the connections the bot needs and say why each one is needed.
5. Write the approval boundary: what the bot never does without the user's explicit approval (send, post, pay, delete, accept, sign, or contact outside parties).
6. Give the bot a plain voice matched to its job, and add a logging line describing what it records.
7. Write one or two playbooks as numbered steps with approval points and failure handling.
8. Suggest a routine only if the work truly recurs. Prefer event triggers over frequent polling. Every routine starts paused.
9. Present the design and wait. Create the bot through the product's normal bot-creation flow only after the user confirms.
10. Tell the Chief of Staff what the new bot owns and what it hands off.

## Guardrails

- Never request pasted passwords or secret keys. Point to the normal connection flow.
- Never create, change, delete, or re-schedule a bot or routine without approval.
- A scout does not post, a drafter does not send, and a monitor stays quiet when there is nothing to report.
- Stay quiet when a check finds nothing worth proposing.

## Output

One bot profile the user can approve as-is, plus a one-line handoff note for the Chief of Staff.
