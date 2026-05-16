# Amagi Reversi

A local Reversi / Othello game built with Tauri 2, Vue 3, TypeScript, Pinia, Vite, and Vitest.

This project focuses on rule correctness first: core Reversi behavior lives in the domain layer, while Vue components handle rendering and user interaction.

## Features

- Standard 8x8 Reversi board
- Legal move detection
- Piece flipping in all valid directions
- Turn switching and pass handling
- Winner calculation
- Move history and undo
- Local human-vs-human play
- Optional human-vs-AI mode with difficulty selection
- Valid move hints
- Local game persistence
- Responsive layout for desktop and mobile-friendly screens
- Vitest coverage for core domain rules, serialization, and AI helpers

## Tech Stack

- Tauri 2
- Vue 3
- TypeScript
- Pinia
- Vue Router
- Vite
- Vitest
- Tailwind CSS

## Project Structure

```text
src/
  app/                 Vue app shell and router
  components/
    board/             Board cells and pieces
    game/              Game controls, status, mode selector, result dialog
    layout/            App layout components
  domain/              Reversi rules, types, constants, serializers, AI helpers
    __tests__/         Vitest unit tests for core logic
  pages/               Page-level Vue views
  services/            Local storage and statistics services
  stores/              Pinia stores
  styles/              Global styles

src-tauri/             Tauri desktop application shell
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the web development server:

```bash
npm run dev
```

Run the Tauri desktop app in development mode:

```bash
npm run tauri:dev
```

Build the web app:

```bash
npm run build
```

Build the Tauri desktop app:

```bash
npm run tauri:build
```

## Testing

Run tests in watch mode:

```bash
npm test
```

Run tests once:

```bash
npm run test:run
```

Run TypeScript checks:

```bash
npm run type-check
```

## Main Logic

The core game rules are implemented under `src/domain/`:

- `reversi.rules.ts` creates the initial board, validates moves, flips pieces, counts pieces, checks game-over conditions, and calculates the winner.
- `reversi.types.ts` defines board, player, move, game state, and mode types.
- `reversi.serializer.ts` serializes and deserializes boards for move history and persistence.
- `reversi.ai.ts` contains local AI move selection helpers.
- `reversi.evaluator.ts` contains board evaluation logic used by AI decisions.

Pinia coordinates application state in `src/stores/gameStore.ts`. Vue components consume the store and domain APIs without embedding Reversi rule logic directly in the UI.

## Current Scope

The project currently supports local play and a basic board UI. It does not include account login, online multiplayer, cloud sync, ads, payments, or external API integrations.

## Known Limitations

- The AI is local and intentionally lightweight.
- Native mobile packaging is not treated as complete MVP functionality yet.
- Some UI copy may still need localization cleanup before release.
- There is no online multiplayer or persistent database backend.

