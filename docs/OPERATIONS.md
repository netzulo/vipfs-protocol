# Operations Runbook

## Local IPFS Setup

The repository includes Docker Compose files intended to support local IPFS-oriented development.

Relevant files:

- `docker-compose.dev.yml`
- `docker-compose.ipfs.yml`
- `Dockerfile`

## Kubo Endpoint Assumption

Current code and tests use a Kubo HTTP API endpoint such as:

```text
http://localhost:5001/api/v0
```

Ensure the endpoint is reachable before running tests that exercise `IPFSUploader`.

## Automated Tests Versus Runtime

- The default Jest suite uses a mocked `ipfs-http-client` transport for `IPFSUploader` coverage.
- Real Kubo validation is still relevant for release-sensitive changes, integration checks, or environment troubleshooting.

## Operational Risks

- Losing the mnemonic means losing the ability to derive the same fragment keys.
- Changing fragment order or index values breaks deterministic decryption.
- Changing the encrypted payload format can invalidate previously stored fragments.

## Recommended Operator Checks

1. Confirm the Kubo API endpoint is healthy.
2. Confirm the mnemonic source is correct and handled securely.
3. Confirm index JSON files are stored alongside enough metadata to map them to the original asset.