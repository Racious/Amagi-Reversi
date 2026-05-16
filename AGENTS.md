# AGENTS.md

## Project Overview

This project is a Reversi / Othello game built with:

- Tauri 2
- Vue 3
- TypeScript
- Pinia
- Vite
- Vitest

The game should work as an offline local game for desktop and mobile-friendly layouts.

## Development Rules

- Keep core game logic inside `src/domain/`.
- Do not put Reversi rule logic directly inside Vue components.
- Vue components should only handle rendering and user interactions.
- Use Pinia for game state coordination.
- Use TypeScript strict typing.
- Avoid `any`.
- Add Vitest unit tests for core game rules.
- Do not use external APIs.
- Do not add online multiplayer in MVP.
- Do not add account login, cloud sync, ads, or payment features.
- Prioritize rule correctness before UI polish.

## Current Development Scope

For the first implementation, only complete Phase 1 to Phase 3:

1. Initialize project structure.
2. Implement Reversi domain logic.
3. Add Vitest unit tests.
4. Build a basic board UI.
5. Support local human-vs-human play.

Do not implement SQLite, complex AI, online features, mobile native packaging, or advanced animations yet.

## Required Output After Implementation

After completing the task, summarize:

- Files added
- Files modified
- Main logic implemented
- How to run the project
- How to run tests
- Known limitations