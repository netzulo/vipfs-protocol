# Contribution Workflow

## Before You Start

1. Read [README.md](../README.md) and the relevant file in this knowledge base.
2. Open an issue for bug reports, features, or documentation gaps when the work is not trivial.
3. Identify the owning service before changing code.

## Pull Request Standard

Every pull request should:

- Explain the behavior change.
- Describe validation commands and results.
- Note any impact on IPFS, encryption, mnemonic handling, or index JSON format.
- Include documentation updates when contributor or integrator behavior changes.

## Code Expectations

- Keep service boundaries explicit.
- Preserve TypeScript strictness and current code style.
- Avoid introducing secret logging or insecure key handling.

## Validation Baseline

```bash
yarn lint
yarn test
```

Run `yarn ci:local` when making broader changes to repository automation or release-facing behavior.