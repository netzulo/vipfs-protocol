---
name: Bug Fix
description: "Fix a defect in VIPFS Protocol without widening scope. Use for regressions, failing tests, or incorrect service behavior."
argument-hint: "Observed behavior, expected behavior, reproduction steps, and affected service"
agent: maintainer
---

# Prompt: Bug Fix

Fix a defect in VIPFS Protocol without widening scope.

## Required Inputs

- Observed behavior.
- Expected behavior.
- Reproduction steps or affected test.

## Execution Notes

1. Identify the exact service boundary involved.
2. Add or update a regression test where practical.
3. Call out any encryption, mnemonic, IPFS, or index format risks.
4. Update documentation if the fix changes contributor expectations or public behavior.