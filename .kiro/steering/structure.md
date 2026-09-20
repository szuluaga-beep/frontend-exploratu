# Project Structure

## Directory Organization

```
frontend-exploratu/
├── app/                    # Next.js app directory (file-based routing)
│   ├── about/             # About page section
│   │   ├── layout.tsx      # Section layout
│   │   └── page.tsx        # Page content
│   ├── blog/              # Blog section
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── docs/              # Documentation section
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── pricing/           # Pricing section
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── layout.tsx         # Root layout (wraps all pages)
│   ├── page.tsx           # Home page (/)
│   ├── error.tsx          # Global error boundary
│   └── providers.tsx      # Client-side providers (themes, contexts)
│
├── components/            # Reusable React components
│   ├── navbar.tsx         # Navigation bar
│   ├── theme-switch.tsx   # Dark/light mode toggle
│   ├── counter.tsx        # Example component
│   ├── icons.tsx          # SVG icon components
│   ├── primitives.ts      # Styled utility components (title, subtitle)
│
├── config/               # Application configuration
│   ├── site.ts          # Site metadata, navigation, links
│   └── fonts.ts         # Font configuration
│
├── styles/              # Global styles
│   └── globals.css      # Global Tailwind directives
│
├── types/               # TypeScript type definitions
│   └── index.ts         # Shared types
│
├── public/              # Static assets
│   └── favicon.ico
│
├── .kiro/               # Kiro IDE configuration
│   └── steering/        # Steering documents for AI assistance
│
├── .vscode/             # VS Code settings
├── .next/               # Next.js build output (generated)
├── node_modules/        # Dependencies (generated)
│
└── Configuration Files:
    ├── package.json          # Dependencies and scripts
    ├── tsconfig.json         # TypeScript configuration
    ├── next.config.mjs       # Next.js configuration
    ├── eslint.config.mjs     # ESLint rules
    ├── postcss.config.mjs    # PostCSS configuration
    ├── pnpm-workspace.yaml   # pnpm workspace config
    ├── .npmrc                # npm configuration
    ├── .gitignore            # Git ignore rules
    └── README.md             # Project documentation
```

## Route Structure

Routes are defined by the directory structure in `app/`:

| Route | File | Purpose |
|-------|------|---------|
| `/` | `app/page.tsx` | Home page (hero section with CTA buttons) |
| `/docs` | `app/docs/page.tsx` | Documentation |
| `/pricing` | `app/pricing/page.tsx` | Pricing information |
| `/blog` | `app/blog/page.tsx` | Blog posts |
| `/about` | `app/about/page.tsx` | About page |

## Key Files Explained

### `app/layout.tsx`
Root layout that wraps all pages. Includes:
- Providers (theme, context)
- Global metadata
- Navbar component

### `config/site.ts`
Central configuration object containing:
- Site name and description
- Navigation items (`navItems`, `navMenuItems`)
- External links (GitHub, Twitter, Discord, etc.)

### `components/primitives.ts`
Utility functions using Tailwind Variants to create styled components:
- `title()` - Large heading styles
- `subtitle()` - Smaller text styles

### `app/providers.tsx`
Client-side provider setup:
- Next.js theme provider (dark/light mode)
- Other global contexts

## Component Hierarchy

```
layout.tsx (Root)
├── Navbar
│   ├── Logo
│   ├── Nav links (from config)
│   ├── Social icons
│   └── ThemeSwitch
├── Page Content
│   └── Varies by route
└── Footer (if present)
```

## File Naming Conventions

- **React Components**: PascalCase (e.g., `Navbar.tsx`, `ThemeSwitch.tsx`)
- **Utilities/Config**: camelCase (e.g., `primitives.ts`, `site.ts`)
- **Directories**: lowercase (e.g., `components/`, `config/`)

## Adding New Pages

1. Create a new directory in `app/` (e.g., `app/my-page/`)
2. Add `layout.tsx` (optional, inherits from root) and `page.tsx`
3. Update `config/site.ts` navigation if needed
4. Route automatically becomes `/my-page`
