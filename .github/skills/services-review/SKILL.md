---
name: services-review
description: 'Review or implement changes in src/services. Use for service ownership, API boundaries, fragment lifecycle, encryption format, or index JSON checks.'
argument-hint: 'Owning service, change scope, and compatibility concern'
---

# Skill: Services Review

Use this skill when reviewing or implementing changes in `src/services/`.

## Objectives

- Preserve single-responsibility boundaries between services.
- Check whether a change belongs in an existing service before adding a new one.
- Confirm that changes to fragment structure, encryption format, or JSON index semantics are documented.

## Checklist

1. Identify which exported service owns the behavior.
2. Confirm whether public API or constructor signatures change.
3. Update or add Jest tests under `__tests__/`.
4. Update `docs/API.md` or `docs/ARCHITECTURE.md` when behavior changes.

## Repository Facts

- `VideoFragmenter` reads files in chunks via streams.
- `FragmentEncryptor` uses AES-256-GCM and wallet-derived keys per fragment index.
- `EthereumWallet` derives keys from a mnemonic and BIP44 path.
- `IPFSUploader` uses `ipfs-http-client`.
- `IndexManager` persists fragment metadata and status.