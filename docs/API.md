# API Map

This document summarizes the exported services and their current contract.

## Exports

The package exports the following names from `src/services/index.ts`:

- `VideoFragmenter`
- `FragmentEncryptor`
- `IPFSUploader`
- `IndexManager`
- `EthereumWallet`

## VideoFragmenter

Constructor:

```ts
new VideoFragmenter(chunkSize?: number)
```

Methods:

```ts
fragment(filePath: string): AsyncGenerator<Buffer>
```

Behavior:

- Defaults to 5 MiB chunks.
- Reads file segments from disk using streams.

## FragmentEncryptor

Constructor:

```ts
new FragmentEncryptor(wallet: EthereumWallet)
```

Methods:

```ts
encrypt(chunk: Buffer, index: number): Promise<Buffer>
decrypt(encryptedData: Buffer, index: number): Promise<Buffer>
```

Behavior:

- Uses AES-256-GCM.
- Prepends the IV and appends the auth tag to the encrypted payload.

## EthereumWallet

Constructor:

```ts
new EthereumWallet(mnemonic: string)
```

Methods:

```ts
deriveKey(index: number): Buffer
static generateMnemonic(): string
```

Behavior:

- Uses `ethers` mnemonic support and HD wallet derivation.
- Returns a 32-byte key for each fragment index.

## IPFSUploader

Constructor:

```ts
new IPFSUploader(apiUrl: string)
```

Methods:

```ts
upload(chunk: Buffer): Promise<string>
download(cid: string): Promise<Buffer>
```

Behavior:

- `apiUrl` should point to a Kubo RPC endpoint such as `http://localhost:5001/api/v0`.
- `upload` returns a CID string.
- `download` reads chunk data through the IPFS async iterator and concatenates it into a `Buffer`.

## IndexManager

Methods:

```ts
createIndex(videoId: string, fragments: FragmentMeta[]): IndexJson
updateFragmentStatus(indexJson: IndexJson, fragmentIndex: number, status: 'ok' | 'retry' | 'failed'): IndexJson
saveToFile(path: string, indexJson: IndexJson): void
loadFromFile(path: string): IndexJson
```

Behavior:

- Creates and mutates metadata manifests for uploaded fragments.
- Writes JSON with two-space indentation.

## Stability Notes

- The library currently exposes primitives rather than a complete upload/download manager.
- Any change to encrypted payload layout, derivation path, or `IndexJson` structure should be treated as a compatibility-sensitive change.