---
name: docs-sync
description: 'Sync README, docs, and .github guidance with the implementation. Use for knowledge-base maintenance, navigation updates, and documentation drift checks.'
argument-hint: 'Scope to sync, audience, and source files to verify'
---

# Skill: Documentation Sync

Use this skill when updating repository knowledge in `README.md`, `docs/`, or `.github/`.

## Objectives

- Keep documentation anchored to the implementation and current repository workflow.
- Preserve a clear distinction between runtime behavior, contributor workflow, and collaboration assets.
- Keep entry points current so maintainers can find the right source of truth quickly.

## Procedure

1. Verify the affected behavior against `src/services/`, `__tests__/`, `package.json`, and relevant automation files.
2. Update the closest source document first, then adjust indexes such as `docs/README.md` or `.github/COLLABORATION.md` if navigation changed.
3. Reuse the repository glossary consistently for terms like fragment, encrypted fragment, CID, index JSON, mnemonic, and Kubo API.
4. Run the narrowest validation that proves the documented workflow is still correct.

## References

- [Source of Truth Checklist](./references/source-of-truth.md)