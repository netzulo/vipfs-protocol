# Architecture

VIPFS Protocol is organized as a set of focused services instead of a large all-in-one manager.

## Core Flow

1. `VideoFragmenter` reads a source file and emits fixed-size `Buffer` chunks.
2. `FragmentEncryptor` encrypts each chunk with AES-256-GCM.
3. `EthereumWallet` derives a deterministic key for each fragment index.
4. `IPFSUploader` sends encrypted chunks to a Kubo-compatible IPFS API and returns CIDs.
5. `IndexManager` builds and persists an `IndexJson` manifest describing the upload.

## Service Responsibilities

### VideoFragmenter

- Uses `createReadStream` to avoid loading the full file into memory.
- Emits one `Buffer` per chunk through an async generator.
- Owns chunk-size behavior.

### FragmentEncryptor

- Uses AES-256-GCM with a per-fragment IV.
- Concatenates IV, encrypted payload, and auth tag into the persisted buffer.
- Delegates key derivation to `EthereumWallet`.

### EthereumWallet

- Builds an HD wallet from a mnemonic.
- Derives keys using the path `m/44'/60'/0'/0/{index}`.
- Returns 32-byte keys suitable for AES-256-GCM.

### IPFSUploader

- Wraps `ipfs-http-client`.
- Uploads encrypted buffers and returns string CIDs.
- Reassembles downloaded chunks from the async iterator returned by `cat`.

### IndexManager

- Creates `IndexJson` records.
- Updates fragment status values.
- Persists and restores the manifest to and from disk.

## Data Contracts

### FragmentMeta

- `index`: fragment ordinal.
- `cid`: IPFS content identifier.
- `timestamp`: upload timestamp in milliseconds.
- `status`: one of `ok`, `retry`, or `failed`.

### IndexJson

- `videoId`: logical identifier for the asset.
- `createdAt`: manifest creation timestamp.
- `fragments`: ordered list of fragment metadata.

## Design Constraints

- The codebase currently exposes low-level services rather than a workflow orchestrator.
- IPFS integration is transport-oriented and assumes a reachable Kubo HTTP API.
- Encryption format compatibility matters because stored fragments must remain decryptable.