# Glossary

Use these repository terms consistently across code comments, docs, prompts, skills, and reviews.

## Core Terms

- `fragment`: a raw chunk emitted by `VideoFragmenter` from a source file.
- `encrypted fragment`: the persisted buffer produced by `FragmentEncryptor`, currently stored as `IV + encrypted payload + auth tag`.
- `fragment index`: the numeric position of a fragment in the original sequence. It also drives deterministic key derivation.
- `CID`: the IPFS content identifier returned by `IPFSUploader.upload()`.
- `index JSON`: the manifest produced by `IndexManager` that records fragment metadata, creation time, and video identity.
- `mnemonic`: the BIP39 phrase used by `EthereumWallet` to derive fragment keys.
- `Kubo API`: the HTTP API exposed by a Kubo-compatible IPFS node, typically addressed as `http://localhost:5001/api/v0` in local development.

## Status Terms

- `ok`: the fragment was processed or uploaded successfully.
- `retry`: the fragment needs another processing or upload attempt.
- `failed`: the fragment is currently considered unsuccessful.

## Compatibility Notes

- Changing fragment order or index assignment breaks deterministic decryption.
- Changing the encrypted fragment layout can invalidate previously stored data.
- Changing index JSON structure should be treated as a compatibility-sensitive change for integrators.