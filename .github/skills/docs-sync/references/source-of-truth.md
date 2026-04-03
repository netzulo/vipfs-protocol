# Source of Truth Checklist

Use this checklist before changing repository knowledge.

## Runtime Behavior

- `src/services/`: exported service contracts and implementation details.
- `src/services/index.ts`: public export surface.
- `__tests__/services.test.ts`: expected observable behavior.

## Workflow and Automation

- `package.json`: supported scripts and CI-equivalent commands.
- `.github/workflows/`: repository automation and status gates.
- `docker-compose.dev.yml` and `docker-compose.ipfs.yml`: local IPFS assumptions.

## Knowledge Entry Points

- `README.md`: external overview and quick-start.
- `docs/README.md`: knowledge-base index.
- `.github/COLLABORATION.md`: collaboration asset index.