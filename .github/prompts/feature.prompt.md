---
name: Feature Implementation
description: "Implement a feature in VIPFS Protocol while preserving the service-based design. Use for scoped enhancements to existing services or related workflows."
argument-hint: "Requested behavior, owning service, constraints, and validation plan"
agent: maintainer
---

# Prompt: Feature Implementation

Implement a feature in VIPFS Protocol while preserving the current service-based design.

## Required Inputs

- The user-facing behavior to add.
- The service or module expected to own the change.
- Any IPFS, encryption, or index JSON constraints.

## Execution Notes

1. Read the relevant service and its matching tests.
2. Keep public API changes explicit and documented.
3. Update `docs/API.md` and `docs/ARCHITECTURE.md` if the behavior changes the public workflow.
4. Run or describe the relevant validation steps.