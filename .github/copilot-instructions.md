# Copilot Instructions for VIPFS Protocol

## Repository Focus

This repository is a TypeScript library centered on five exported services:

- `VideoFragmenter`
- `FragmentEncryptor`
- `EthereumWallet`
- `IPFSUploader`
- `IndexManager`

Prefer solutions that preserve this service-oriented design instead of introducing a large orchestration layer unless the maintainer asks for it explicitly.

## Implementation Rules

- Keep public APIs small and explicit.
- Favor stream-safe and memory-conscious file handling.
- Treat wallet-derived keys, mnemonics, and encrypted buffers as sensitive data.
- Do not log secrets, derived keys, or full encrypted payloads.
- Preserve strict TypeScript compatibility.
- Keep tests close to current Jest patterns in `__tests__/`.

## Pull Request Expectations

- Document behavioral changes in `README.md` or `docs/` when the public workflow changes.
- Add or update tests for service behavior changes.
- Call out changes that affect IPFS API assumptions or mnemonic/key derivation behavior.

## Documentation Rules

- Keep foundational knowledge in `docs/`.
- Keep GitHub collaboration material in `.github/`.
- Keep `docs/README.md` as the knowledge base entry point and `.github/README.md` as the collaboration asset index.
- Reuse repository terms consistently: fragment, encrypted fragment, CID, index JSON, mnemonic, Kubo API.