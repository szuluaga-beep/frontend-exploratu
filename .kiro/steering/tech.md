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
| @t3-oss/env-nextjs | 0.13.11 | Type-safe environment variable validation |
| Zod | 4.6.5 | Schema validation library |
| Better Auth | latest | Authentication and authorization framework |

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

# Better Auth
pnpm dlx auth@latest migrate    # Run database migrations for Better Auth
pnpm dlx auth@latest generate   # Generate Better Auth type definitions
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

## Environment Variables

Environment variables are validated using **@t3-oss/env-nextjs** and **Zod** at build time. This ensures:
- Type-safe environment variable access
- Compile-time validation
- Separation of server and client variables
- Prevention of accidental client exposure of server secrets

Configuration is in `app/env.ts`. Define your schema there and import the `env` object throughout the app.

Example:
```typescript
// app/env.ts
import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});

// Usage in any file (server or client)
import { env } from "@/app/env";
const apiUrl = env.NEXT_PUBLIC_API_URL;
```

## Import Path Alias

The `@/*` alias is configured to resolve to the root directory, enabling clean imports:
```typescript
import { siteConfig } from "@/config/site";
import { Button } from "@heroui/react";
import { env } from "@/app/env";
```
