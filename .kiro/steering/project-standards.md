# Exploratu Frontend Project Standards

## Project Overview

This is a modern Next.js 16 + HeroUI v3 template with Tailwind CSS, TypeScript, and pnpm workspace support. The project is a marketing/documentation site with multiple sections (home, docs, pricing, blog, about).

## Technology Stack

- **Framework**: Next.js 16 (app directory)
- **UI Library**: HeroUI v3 (React components with Tailwind CSS)
- **Styling**: Tailwind CSS v4 + Tailwind Variants
- **Language**: TypeScript 5.6+
- **Package Manager**: pnpm
- **Theme**: next-themes (dark/light mode support)
- **Linting**: ESLint 9 + Prettier

## Code Organization

```
├── app/                 # Next.js app directory (routes)
│   ├── [route]/        # Route-specific layouts and pages
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   ├── error.tsx       # Error boundary
│   └── providers.tsx   # Client-side providers
├── components/          # Reusable React components
├── config/             # Application configuration
├── styles/             # Global styles
├── types/              # TypeScript type definitions
└── public/             # Static assets
```

## Development Workflow

### Build & Run Commands

```bash
# Development
pnpm start:dev       # Run dev server on localhost:3000

# Production
pnpm build           # Build for production
pnpm start:prod      # Start production server

# Code Quality
pnpm lint            # Run ESLint with --fix
```

### Import Paths

Use the `@/*` alias (configured in tsconfig.json) for all imports:
- ✅ `import { siteConfig } from "@/config/site"`
- ❌ `import { siteConfig } from "../../../config/site"`

## Code Style & Standards

### TypeScript

- **Strict mode**: Enabled - all TypeScript strict rules are enforced
- **JSX**: React 19 JSX transform (no `import React` needed)
- **File extensions**: 
  - `.ts` for utilities and configuration
  - `.tsx` for React components

### Component Development

**Naming conventions:**
- Component files: PascalCase (e.g., `Navbar.tsx`, `ThemeSwitch.tsx`)
- Utility files: camelCase (e.g., `primitives.ts`, `site.ts`)
- Folder names: lowercase (e.g., `components/`, `config/`)

**HeroUI Components:**
- Use HeroUI v3 components from `@heroui/react` for consistent UI
- HeroUI v3 uses compound component patterns: `<Card><Card.Header></Card.Header></Card>`
- Apply Tailwind CSS classes for additional styling
- Always use semantic HTML attributes for accessibility

**Props Organization:**
- ESLint enforces specific prop ordering:
  - Reserved props first (`key`, `ref`)
  - Shorthand props first
  - Event callbacks last
  - Alphabetically sorted in between

**Styling:**
- Use Tailwind CSS utility classes as primary styling method
- Use `tailwind-variants` for component-level style composition
- BEM-like class naming when needed: `.button--primary`, `.button--md`
- CSS modules for component-scoped styles (optional)

### Formatting & Linting

**ESLint Rules:**
- `no-console`: warn (console logs should be removed in production code)
- `react/prop-types`: off (TypeScript handles prop validation)
- `react-hooks/exhaustive-deps`: off (intentional relaxation)
- `jsx-a11y/click-events-have-key-events`: warn (accessibility)
- `import/order`: Enforce specific import grouping:
  1. Type imports
  2. Builtins
  3. Object imports
  4. External packages
  5. Internal imports
  6. Parent imports
  7. Sibling imports
  8. Index imports
- `unused-imports/no-unused-imports`: warn (remove unused imports)
- `@typescript-eslint/no-unused-vars`: warn (with exceptions for `_` prefix)

**Prettier:**
- All formatting via Prettier integration with ESLint
- Run `pnpm lint` to auto-fix formatting and linting issues

### Accessibility (a11y)

HeroUI v3 components are built with accessibility in mind:
- All interactive elements must be keyboard accessible
- Use semantic HTML (`<button>`, `<nav>`, `<section>`, etc.)
- Include `alt` text for images
- ARIA labels/descriptions for complex interactions
- Test with screen readers when implementing custom UI

### Import Order Example

```typescript
import type { SiteConfig } from "@/config/site";

import { siteConfig } from "@/config/site";

import clsx from "clsx";

import { Button } from "@heroui/react";

import { Counter } from "@/components/counter";

import { title } from "@/components/primitives";

import { theme } from "./utils";

import styles from "./component.module.css";
```

## File Structure Guidelines

**Configuration Files:**
- `config/site.ts` - Central site configuration (navigation, links, etc.)
- `config/fonts.ts` - Font configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.mjs` - ESLint configuration
- `postcss.config.mjs` - PostCSS configuration

**Global Styles:**
- `styles/globals.css` - Global Tailwind directives and utilities
- Component-level styles in component files or `.module.css`

**Type Definitions:**
- `types/index.ts` - Shared type definitions

## Theme & Dark Mode

- Configured via `next-themes` package
- Supports light/dark mode switching
- HeroUI v3 handles theme application via CSS custom properties
- CSS variables use oklch() color format for better color manipulation

## Environment Setup

### Required Node Version
- Node.js 18+ recommended (Next.js 16 requirement)

### Install Dependencies
```bash
pnpm install
```

### Dev Server
```bash
pnpm start:dev
# Server runs at http://localhost:3000
```

## Common Tasks

### Add a New Page
1. Create route folder in `app/` (e.g., `app/my-page/`)
2. Add `layout.tsx` and `page.tsx`
3. Update `config/site.ts` navigation if needed

### Add a New Component
1. Create component file in `components/` (PascalCase)
2. Import HeroUI components as needed
3. Use TypeScript for prop types
4. Export as named export

### Style a Component
1. Use Tailwind CSS classes
2. For complex styling, use `tailwind-variants`
3. Run `pnpm lint` to ensure formatting

### Update ESLint Rules
- Modify `eslint.config.mjs`
- Rules are grouped by concern
- Test changes with `pnpm lint`

## Performance Considerations

- Next.js 16 optimizes images and fonts automatically
- Use dynamic imports for large components: `import dynamic from "next/dynamic"`
- Keep component bundle size small
- Leverage Next.js code splitting

## Security

- Use environment variables for sensitive data (`.env.local`)
- Never commit secrets to version control
- Validate user input before processing
- Use Next.js built-in security headers

## Testing & Quality

- Currently no test framework configured
- Add Jest + React Testing Library if needed
- Run `pnpm lint` before committing

## Git & Version Control

- Use meaningful commit messages
- Branch naming: `feature/name`, `bugfix/name`, `docs/name`
- Create pull requests for code review
- Keep commits atomic and focused

## Documentation

- README.md - Project overview and setup
- Inline code comments for complex logic
- JSDoc comments for exported functions/components
- Update this steering file for new standards

## Common Patterns

### Using HeroUI Components
```typescript
import { Button, Card } from "@heroui/react";

export function MyComponent() {
  return (
    <Card>
      <Card.Header>Title</Card.Header>
      <Card.Content>Content</Card.Content>
      <Card.Footer>
        <Button color="primary">Action</Button>
      </Card.Footer>
    </Card>
  );
}
```

### Tailwind Variants Usage
```typescript
import { tv } from "tailwind-variants";

const button = tv({
  base: "font-semibold border rounded-full transition-colors",
  variants: {
    color: {
      primary: "bg-blue-500 text-white hover:bg-blue-600",
      secondary: "bg-gray-200 text-black hover:bg-gray-300",
    },
    size: {
      sm: "px-3 py-1 text-sm",
      md: "px-4 py-2",
      lg: "px-6 py-3 text-lg",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});
```

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [HeroUI v3 Documentation](https://heroui.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [ESLint Documentation](https://eslint.org/docs)
