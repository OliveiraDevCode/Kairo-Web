# Kairo Web

Kairo Web is the frontend application for the Kairo ecosystem.

The project is currently under active development and will integrate with Kairo API, workspace management, and other platform services.

## Current Status

The project is in its early development phase.

The following foundations have already been implemented:

* React + TypeScript application setup
* Vite development environment
* Tauri integration
* ESLint configuration
* Unit testing infrastructure with Vitest
* Acceptance testing infrastructure with Playwright
* GitHub Actions CI pipeline
* Protected main branch workflow
* Feature-based project structure

## Technology Stack

### Frontend

* React
* TypeScript
* Vite
* React Router
* Zustand

### Desktop

* Tauri
* Rust

### Testing

* Vitest
* Testing Library
* Playwright

### Quality & Automation

* ESLint
* GitHub Actions

## Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run unit tests:

```bash
npm run test
```

Run acceptance tests:

```bash
npm run e2e
```

Run linting:

```bash
npm run lint
```

## Architecture

The codebase follows a feature-oriented structure and maintains a clear separation between application code and test suites.

```text
src/
├── app/
├── features/
├── shared/
└── lib/

tests/
├── unit/
└── acceptance/
```

## CI/CD

The repository uses GitHub Actions to enforce quality gates before changes can be merged.

Current pipeline stages:

* Quality Checks
* Security Scan
* Acceptance Tests
