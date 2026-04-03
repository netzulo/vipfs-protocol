---
name: Knowledge Base Audit
description: "Audit README, docs, and .github guidance for drift against src/services, __tests__, package.json, and CI scripts. Use for repository knowledge-base reviews."
argument-hint: "Describe the scope to audit and any suspected documentation drift"
agent: docs-curator
---

# Prompt: Knowledge Base Audit

Audit the requested documentation scope in VIPFS Protocol.

## Required Inputs

- The files or directories to audit.
- Any suspected mismatch or stale workflow.
- The audience affected by the drift.

## Execution Notes

1. Compare docs against `src/services/`, `__tests__/`, `package.json`, and `.github/workflows/` when relevant.
2. Prefer correcting the nearest source document before adding new prose elsewhere.
3. Report any unresolved mismatch that cannot be validated locally.