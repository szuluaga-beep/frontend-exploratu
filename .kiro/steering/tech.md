# Technology Stack & Build System

## Core Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.2.6 | React framework with app directory routing |
| React | 19.2.6 | UI library |
| TypeScript | 5.6.3 | Type-safe JavaScript |
| HeroUI | 3.2.5 | Pre-built React components |
| Tailwind CSS | 4.1.11 | Utility-first CSS framework |
| Tailwind Variants | 3.3.0 | Component style composition |
| next-themes | 0.4.6 | Dark/light mode management |

## Build System

- **Package Manager**: pnpm (workspace support)
- **Module Type**: ES modules (`"type": "module"` in package.json)
- **TypeScript Target**: ES5 with strict mode enabled
- **JSX Transform**: React 19 (automatic, no import needed)

## Common Commands

```bash
# Development
pnpm start:dev       # Run dev server on localhost:3000

# Production
pnpm build           # Build for production
pnpm start:prod      # Start production server

# Code Quality
pnpm lint            # Run ESLint with --fix (applies Prettier formatting)
```

## Development Tools

| Tool | Version | Purpose |
|------|---------|---------|
| ESLint | 9.25.1 | JavaScript/TypeScript linting |
| Prettier | 3.5.3 | Code formatting |
| @TypeScript-ESLint | 8.34.1 | TypeScript linting support |

## Key Configuration Files

- `next.config.mjs` - Next.js configuration
- `tsconfig.json` - TypeScript compiler options with strict mode
- `eslint.config.mjs` - ESLint rules and plugins
- `postcss.config.mjs` - PostCSS configuration for Tailwind

## Project Requirements

- Node.js 18+ (Next.js 16 requirement)
- pnpm for dependency management
- Modern browser support (ES5 target with dynamic features)

## Import Path Alias

The `@/*` alias is configured to resolve to the root directory, enabling clean imports:
```typescript
import { siteConfig } from "@/config/site";
import { Button } from "@heroui/react";
```
