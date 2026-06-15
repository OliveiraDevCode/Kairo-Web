# Kairo-Web

AI-assisted learning desktop application — frontend.

Built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Tauri** for cross-platform desktop distribution.

## Stack

- React 18 + TypeScript
- Vite 6 (bundler / dev server)
- Tailwind CSS 4 (utility-first styling)
- React Router 7 (client-side routing)
- Zustand 5 (state management)
- Tauri 2 (desktop wrapper)

## Prerequisites

- Node.js 18+
- Rust toolchain (only for Tauri desktop builds)

## Setup

```bash
npm ci
```

## Development

```bash
npm run dev
```

Starts the Vite dev server at `http://localhost:1420`.

### Tauri desktop development

```bash
npm run tauri:dev
```

Launches a native window with hot-reload.

## Build

```bash
npm run build
```

Produces an optimized build in `dist/`.

### Tauri desktop build

```bash
npm run tauri:build
```

Generates platform-specific distributables in `src-tauri/target/release/`.

## Preview

```bash
npm run preview
```

## Environment

| Variable | Default | Description |
|---|---|---|
| `TAURI_DEV_HOST` | — | Set to enable network-exposed HMR |
| `VITE_API_URL` | `http://localhost:8000` | Backend API base URL |

## Related

- [Kairo-API](https://github.com/OliveiraDevCode/Kairo-API) — Python FastAPI backend
