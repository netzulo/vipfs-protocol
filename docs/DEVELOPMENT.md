# Development Workflow

## Local Setup

Install dependencies:

```bash
yarn
```

Run TypeScript in watch mode:

```bash
yarn dev
```

Compile the package:

```bash
yarn build
```

## Quality Checks

Run linting:

```bash
yarn lint
```

Run tests:

```bash
yarn test
```

Run the full CI-equivalent workflow:

```bash
yarn ci
```

## Project Layout

- `src/services/`: core runtime services.
- `__tests__/`: Jest coverage for exported service behavior.
- `public/`: repository assets used by tests and examples.
- `.github/`: repository automation, templates, and AI collaboration assets.
- `docs/`: knowledge base.

## Working Agreements

- Keep changes scoped to a clear service boundary.
- Prefer updating an existing service over adding a new abstraction prematurely.
- Add or update documentation when contributor workflows or public behavior change.
- Keep generated artifacts out of commits unless explicitly required.