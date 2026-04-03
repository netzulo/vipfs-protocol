# Repository Map

This document summarizes where core code, tests, automation, and knowledge live in VIPFS Protocol.

## Top-Level Layout

- `src/services/`: exported runtime services and their implementation.
- `src/interfaces/`: shared TypeScript contracts used by the library.
- `src/helpers/`, `src/hooks/`, `src/stores/`: supporting modules for the current package surface.
- `__tests__/`: Jest coverage for service behavior and related modules.
- `public/`: repository assets used by tests and examples.
- `docs/`: knowledge base for architecture, API, operations, and contributor workflow.
- `.github/`: collaboration assets, issue templates, prompts, skills, agents, and CI workflows.

## Ownership Rules

- Service behavior belongs in the matching file under `src/services/`.
- Public API changes must be reflected in `src/services/index.ts`, `docs/API.md`, and, when relevant, `README.md`.
- Test expectations live close to current Jest patterns in `__tests__/`.
- Contributor workflow and repository automation guidance belong in `docs/` and `.github/`.

## Validation Entry Points

- `yarn lint`: code style and static validation.
- `yarn test`: Jest coverage.
- `yarn build`: TypeScript compilation.
- `yarn ci:local`: clean install plus lint, format, test, build, and pack for local validation.

## When to Update Which Document

- Update `docs/ARCHITECTURE.md` when service boundaries or data flow change.
- Update `docs/API.md` when constructor signatures, methods, or exposed behavior change.
- Update `docs/DEVELOPMENT.md` or `docs/TESTING.md` when validation workflow changes.
- Update `docs/OPERATIONS.md` when IPFS, Docker, or environment assumptions change.
- Update `.github/COLLABORATION.md` when collaboration assets or slash-command workflows change.