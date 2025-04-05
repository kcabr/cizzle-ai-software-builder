# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands
- `npm run dev` - Start development server
- `npm run build` - Build the project (TypeScript + Vite)
- `npm run lint` - Run ESLint on all files
- `npm run preview` - Preview the production build

## Code Style Guidelines
- **Imports**: Group imports by external libraries, then internal modules
- **Types**: Use TypeScript interfaces/types; strict mode enabled
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Component Structure**: React functional components with hooks
- **State Management**: Redux with Redux Toolkit; use slice pattern
- **Error Handling**: Use try/catch with toast notifications
- **Comments**: JSDoc style comments for components and important functions
- **Formatting**: Follow ESLint rules; 2-space indentation
- **File Organization**: Components in src/components/, with common/ for shared UI
- **React Hooks**: Follow rules-of-hooks; avoid dependencies array mistakes