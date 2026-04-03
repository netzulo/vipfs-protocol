# GitHub Collaboration Assets

This directory contains repository automation, contributor workflows, and AI collaboration assets for VIPFS Protocol.

## Start Here

- [Copilot Instructions](./copilot-instructions.md)
- [Agents](./agents/maintainer.agent.md)
- [Prompts](./prompts/docs.prompt.md)
- [Skills](./skills/services-review/SKILL.md)
- [Pull Request Template](./pull_request_template.md)

## Directory Map

- `agents/`: role-based agents for implementation and documentation work.
- `prompts/`: focused slash-command templates for common maintainer tasks.
- `skills/`: reusable workflows for service review, testing, and documentation sync.
- `ISSUE_TEMPLATE/`: bug, feature, and documentation intake templates.
- `workflows/`: CI and repository automation.

## Maintenance Rules

- Keep `.github/` aligned with the actual repository workflow described in `README.md`, `docs/`, and `package.json`.
- When adding new collaboration assets, update this index and cross-link the relevant knowledge-base entry in `docs/README.md`.
- Prefer operational guidance over generic prose.