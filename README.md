# VIPFS Protocol

![GitHub stars](https://img.shields.io/github/stars/netzulo/vipfs-protocol.svg?style=social&label=Star)
[![npm](https://img.shields.io/npm/v/vipfs-protocol.svg)](https://www.npmjs.com/package/vipfs-protocol)
![GitHub issues](https://img.shields.io/github/issues/netzulo/vipfs-protocol.svg)
![License](https://img.shields.io/github/license/netzulo/vipfs-protocol)

VIPFS Protocol is a TypeScript library for splitting large video files into fragments, encrypting each fragment with Ethereum-derived keys, uploading encrypted fragments to IPFS, and persisting the resulting metadata as a JSON index.

It is designed for workflows where large media assets need deterministic encryption, content-addressed storage, and a portable manifest that can be used later to recover fragment order and status.

## What It Does

- Splits a source video into fixed-size fragments without loading the whole file into memory.
- Derives per-fragment encryption keys from an Ethereum mnemonic.
- Encrypts each fragment independently with AES-256-GCM.
- Uploads encrypted fragments to a Kubo-compatible IPFS HTTP API.
- Persists an index JSON manifest with CIDs, timestamps, and fragment status values.

## Features

- Fragment large files with stream-based reads.
- Encrypt each fragment independently with AES-256-GCM.
- Derive deterministic encryption keys from an Ethereum mnemonic.
- Upload and retrieve encrypted fragments through the Kubo HTTP API.
- Persist fragment metadata and upload status through a portable JSON index.

## Installation

```bash
npm install vipfs-protocol
```

or

```bash
yarn add vipfs-protocol
```

## Usage

```ts
import {
  EthereumWallet,
  FragmentEncryptor,
  IndexManager,
  IPFSUploader,
  VideoFragmenter,
} from 'vipfs-protocol'

const wallet = new EthereumWallet(process.env.VIPFS_MNEMONIC as string)
const fragmenter = new VideoFragmenter(5 * 1024 * 1024)
const encryptor = new FragmentEncryptor(wallet)
const uploader = new IPFSUploader('http://localhost:5001/api/v0')
const indexManager = new IndexManager()

const fragments = []
let index = 0

for await (const chunk of fragmenter.fragment('./public/sample_1280x720.mp4')) {
  const encryptedChunk = await encryptor.encrypt(chunk, index)
  const cid = await uploader.upload(encryptedChunk)

  fragments.push({
    index,
    cid,
    timestamp: Date.now(),
    status: 'ok',
  })

  index += 1
}

const manifest = indexManager.createIndex('sample-video', fragments)
indexManager.saveToFile('./sample-video.index.json', manifest)
```

## Package Surface

The current public API exports five services:

- `VideoFragmenter`
- `FragmentEncryptor`
- `EthereumWallet`
- `IPFSUploader`
- `IndexManager`

## Core Services

- `VideoFragmenter`: reads a local file as stream-safe chunks.
- `FragmentEncryptor`: encrypts and decrypts each fragment buffer.
- `EthereumWallet`: derives deterministic 32-byte keys from a mnemonic.
- `IPFSUploader`: uploads encrypted fragments and downloads them by CID.
- `IndexManager`: creates, updates, saves, and loads the index JSON manifest.

These services are exposed as composable primitives rather than a single orchestration manager.

## Development

Recommended runtime: Node.js 22.
Recommended package manager: Yarn 1.22.22.

Setup:

```bash
yarn
```

Watch TypeScript builds:

```bash
yarn dev
```

Run the project quality pipeline:

```bash
yarn ci:local
```

## Scripts

| Script | Description |
| --- | --- |
| `build` | Compile the library with TypeScript. |
| `dev` | Run TypeScript in watch mode. |
| `test` | Run Jest with coverage and JUnit output. |
| `lint` | Run ESLint against `src/` and `__tests__/`. |
| `lint:fix` | Apply ESLint fixes. |
| `format` | Format `src/` and `__tests__/` with Prettier. |
| `clean` | Remove build, coverage, lockfile, and dependency artifacts. |
| `ci:local` | Execute the local all-in-one quality pipeline: clean, install, lint, format, test, build, and pack. |

## Documentation

- [Knowledge Base](./docs/README.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [API Map](./docs/API.md)
- [Repository Map](./docs/REPOSITORY_MAP.md)
- [Glossary](./docs/GLOSSARY.md)
- [Development Workflow](./docs/DEVELOPMENT.md)
- [Testing Strategy](./docs/TESTING.md)
- [Operations Runbook](./docs/OPERATIONS.md)
- [Contribution Guide](./docs/CONTRIBUTING.md)

## Contributing

Read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request. The repository also includes GitHub issue templates, a pull request template, and Copilot collaboration guidance under `.github/`.

## Security

Read [SECURITY.md](./SECURITY.md) for responsible disclosure guidance.

## License

[MIT](./LICENSE)

---

## 📬 Contact Us

For questions, feedback, or business inquiries:

**✉️ Email**: [netzuleando@gmail.com](mailto:netzuleando@gmail.com)  
**🌐 Website**: [Github](https://github.com/netzulo/vipfs-protocol)

---

## 👨‍💻 Authors

Made with ❤️ by the [@Netzulo](https://github.com/netzulo)
