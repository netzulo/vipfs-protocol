# Testing Strategy

## Test Framework

The repository uses Jest with Babel transforms for TypeScript test execution.

## Current Coverage Areas

- `VideoFragmenter` instantiation, chunk counting, buffer shape, and reassembly size.
- `FragmentEncryptor` encryption/decryption round-trip and index-specific output differences.
- `IPFSUploader` upload/download behavior through a mocked `ipfs-http-client` transport in Jest.
- `IndexManager` manifest creation, status updates, and file persistence.
- `EthereumWallet` construction and unique key derivation.

## Commands

```bash
yarn test
yarn lint
```

## Environment Notes

- The default Jest suite does not require a local Kubo node.
- Runtime behavior still targets a Kubo HTTP API such as `http://localhost:5001/api/v0`, so manual validation against a real endpoint remains recommended for release-sensitive changes.

## When Adding Tests

1. Match the current naming style in `__tests__/services.test.ts`.
2. Prefer service-level tests that validate observable behavior.
3. Add regression coverage for bug fixes whenever practical.
4. If a change depends on Kubo-specific behavior, document the manual validation step separately from the default Jest suite.