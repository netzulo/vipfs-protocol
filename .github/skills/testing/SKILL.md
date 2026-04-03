---
name: testing
description: 'Use when modifying behavior that needs Jest coverage, validating CI expectations, or checking IPFS-dependent test assumptions.'
argument-hint: 'Changed behavior, expected coverage, and environment constraints'
---

# Skill: Testing Workflow

Use this skill when modifying behavior that should be covered by unit or integration tests.

## Objectives

- Follow the current Jest test style in `__tests__/`.
- Prefer focused unit tests for service logic.
- Treat live Kubo validation as separate from the default Jest suite and describe assumptions explicitly.

## Commands

```bash
yarn test
yarn lint
```

## Test Design Rules

1. Name tests with the current repository pattern, for example `[FragmentEncryptor]: should encrypt and decrypt data correctly`.
2. Cover success paths and at least one failure or edge case when behavior changes.
3. If a change depends on a running Kubo node, document the manual validation step in related docs.