# Security Guide

## Reporting

Report vulnerabilities privately to netzuleando@gmail.com.

Do not open a public issue for security-sensitive findings involving:

- Mnemonics or derived keys.
- Encrypted fragment format.
- Index integrity or replay issues.
- IPFS transport assumptions that expose data unexpectedly.

## Areas That Need Extra Care

### Mnemonic Handling

- Never log or commit mnemonics.
- Treat any test mnemonic as non-production only.

### Key Derivation

- Changes to the derivation path are compatibility-sensitive.
- Any key derivation change must be reviewed with migration impact in mind.

### Encrypted Payload Format

- `FragmentEncryptor` currently stores `IV + encrypted payload + auth tag`.
- Any format change can break decryption for previously stored fragments.

### IPFS and Index Integrity

- Keep CID-to-index associations trustworthy.
- Validate whether status updates or retries can mask partial upload failures.