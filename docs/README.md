# VIPFS Protocol Knowledge Base

This directory is the repository knowledge base for maintainers, contributors, and integrators.

## Start Here

- [Architecture](./ARCHITECTURE.md)
- [API Map](./API.md)
- [Repository Map](./REPOSITORY_MAP.md)
- [Glossary](./GLOSSARY.md)
- [Development Workflow](./DEVELOPMENT.md)
- [Testing Strategy](./TESTING.md)
- [Operations Runbook](./OPERATIONS.md)
- [Contribution Workflow](./CONTRIBUTING.md)
- [Security Guide](./SECURITY.md)

## Scope

The knowledge base documents the current state of the repository:

- Service boundaries and responsibilities.
- Public API and expected data flow.
- Repository structure and ownership boundaries.
- Shared vocabulary for compatibility-sensitive terms.
- Local development and CI workflows.
- Test expectations and environment assumptions.
- Operational guidance for Kubo/IPFS integration.

## Source of Truth

When documentation and implementation disagree, treat the code in `src/services/` and the tests in `__tests__/` as the source of truth, then update these docs.

## Maintenance Workflow

1. Confirm the behavior in `src/services/`, `__tests__/`, and `package.json`.
2. Update the nearest document that owns the topic.
3. Refresh cross-links here when a new durable knowledge document is added.
4. Keep `.github/COLLABORATION.md` in sync when collaboration assets change.