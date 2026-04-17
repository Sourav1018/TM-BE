# Module Architecture

Each module should follow this structure:

- `*.routes.ts`: HTTP route declarations only.
- `*.controller.ts`: Request/response mapping and validation orchestration.
- `*.service.ts`: Business logic.
- `*.repository.ts`: Database access layer (add when implementing Prisma queries).
- `index.ts`: Public export surface for module registration.

This keeps domain boundaries clear so a module can later be moved into its own microservice with minimal refactor.
