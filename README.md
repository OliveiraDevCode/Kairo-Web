# Kairo-Web

AI-powered desktop application built with React, TypeScript, Vite and Tauri.

## Tech Stack

- React 18
- TypeScript
- Vite 6
- Tailwind CSS 4
- React Router 7
- Zustand 5
- Tauri 2

## Prerequisites

- Node.js 18+
- Rust toolchain (required for Tauri desktop builds)

## Setup

```bash
npm ci
```

## Development

```bash
npm run dev
```

Starts the Vite dev server at `http://localhost:1420`.

### Desktop development

```bash
npm run tauri:dev
```

## Build

```bash
npm run build
```

Produces an optimized build in `dist/`.

### Desktop build

```bash
npm run tauri:build
```

## Project Structure

```
src/
├── core/           # Hooks, layouts, providers, routing
├── features/       # Feature modules (chat, workspaces)
│   ├── chat/
│   └── workspaces/
└── lib/            # Shared components, constants, utilities
src-tauri/          # Tauri desktop wrapper (Rust)
```

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `TAURI_DEV_HOST` | — | Enables network-exposed HMR |
| `VITE_API_URL` | `http://localhost:8000` | Backend API base URL |

## Related

- [Kairo-API](https://github.com/OliveiraDevCode/Kairo-API) — Backend API and AI services
