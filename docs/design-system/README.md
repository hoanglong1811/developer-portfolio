# Portfolio Design System

This directory documents the visual and implementation rules currently present in the portfolio. It is descriptive, not aspirational: examples come from `src/`, and a pattern is only considered part of the system when it exists in the current implementation.

## Source of truth

The system is implemented in four layers:

1. `src/styles/index.css` defines the dark theme, Tailwind v4 theme bridge, font stack, and global element defaults.
2. `src/styles/App.css` defines named visual patterns such as `engineering-panel`, `engineering-grid`, `terminal-label`, `section-title`, `tech-badge`, and `technical-copy`.
3. `src/components/ui/` and `src/components/shared/` provide primitives and reusable visual components.
4. `src/components/cards/`, `src/components/layout/`, and `src/components/portfolio/` compose those primitives into portfolio sections.

There is no JavaScript `tailwind.config.*` file. Tailwind CSS v4 is configured through `@tailwindcss/vite` and the `@theme inline` block in `src/styles/index.css`.

## Philosophy

The interface presents a software engineer's portfolio as a calm technical workspace. The visual vocabulary comes from terminals, engineering diagrams, status displays, and compact data panels rather than glossy marketing UI.

The implementation consistently favors:

- one dark theme;
- IBM Plex Mono across headings, body copy, controls, and code-like labels;
- square or lightly rounded, one-pixel bordered surfaces;
- orange as the single interaction and emphasis color;
- uppercase labels with deliberate letter spacing;
- responsive grids that collapse to one column before content becomes cramped;
- restrained entrance and hover motion with a reduced-motion path.

## Design principles

### 1. Structure before decoration

Use borders, spacing, alignment, and hierarchy to organize content. The grid texture and orange markers reinforce structure; they do not replace it.

### 2. Reuse named primitives

Use `Section`, `GlassCard`, `Button`, `Badge`, `Reveal`, `IconFrame`, and `TechLogoBadge` before recreating their class lists. Use `cn()` when variants or caller classes must be merged.

### 3. Keep emphasis scarce

`text-accent`, `border-accent`, and `bg-accent` identify markers, active states, primary actions, or critical metadata. Ordinary content remains `text-foreground` or `text-muted-foreground`.

### 4. Make dense information scan well

Use short uppercase labels, border-separated metadata, wrapping badges, and responsive grids. Long descriptive copy uses `technical-copy` rather than label styling.

### 5. Preserve behavior without motion

Animation must never be required to reveal or operate content. The startup, hero, scroll reveals, and asynchronous skeleton delay all provide reduced-motion behavior.

## Component architecture

```text
App
├── StartupTerminal
└── MainLayout
    ├── Header
    │   └── MobileNav (< lg)
    ├── HeroSection
    │   └── TableOfContents (lg+; after hero intro)
    ├── portfolio sections
    │   ├── Section
    │   ├── Reveal
    │   └── cards / shared primitives
    ├── Footer
    └── BackToTopButton
```

The normal section composition is:

```text
Section
├── Reveal: eyebrow + section title
└── Reveal: content
    └── Engineering panel / grid / cards
```

`Section` owns width, horizontal gutters, vertical rhythm, the terminal marker, and the section heading. Feature sections own only their internal layout.

## Folder structure

| Path | Responsibility |
| --- | --- |
| `src/components/ui/` | Low-level `Button`, `Badge`, and `Field` primitives |
| `src/components/shared/` | Cross-feature visuals and behaviors such as `GlassCard`, `Reveal`, and `TechLogoBadge` |
| `src/components/cards/` | Content-shaped reusable cards |
| `src/components/layout/` | Page shell, navigation, section frame, and table of contents |
| `src/components/portfolio/` | Section-level compositions |
| `src/constants/` | Profile and portfolio content data |
| `src/hooks/` | Scroll, motion preference, startup, reveal, and typewriter behavior |
| `src/services/` | External operations such as contact submission |
| `src/lib/` | Generic library helpers (`cn`) |
| `src/utils/` | Project mappings such as `IconMap` |
| `src/styles/` | Theme variables and named visual patterns |

## Naming conventions

- Components and component files use PascalCase: `ProjectCard.jsx`, `TableOfContents.jsx`.
- Hooks use camelCase with a `use` prefix: `useScrollProgress.js`.
- Constants, services, utilities, and style files use lower camelCase or the established stylesheet names.
- Section components end in `Section`; content cards end in `Card`.
- Props use descriptive camelCase names such as `eyebrowClassName`, `shouldStartAnimation`, and `credentialUrl`.
- Constants use camelCase for exported data and uppercase snake case for local timing constants.
- Import application modules through `@/`; relative imports are currently limited to `main.jsx` importing `./App.jsx`.

See [code-guidelines.md](code-guidelines.md) for the complete implementation conventions.

## Responsive strategy

The CSS is mobile-first. Base classes target 320–639 px, then the implementation uses Tailwind's default breakpoints: `sm` 640 px, `md` 768 px, `lg` 1024 px, `xl` 1280 px, and `2xl` 1536 px. The header additionally uses `min-[375px]` for narrow-phone brand details.

- Content starts in one column.
- Two-column content generally begins at `md`.
- Complex hero, skills, contact, and desktop navigation layouts begin at `lg`.
- Three- or four-column card grids are reserved for `xl`.
- Section gutters progress from `px-5` to `sm:px-8`.
- The global content width is `max-w-6xl`.

See [responsive.md](responsive.md) and [layout.md](layout.md).

## Accessibility principles

- Start with semantic elements: `main`, `header`, `nav`, `section`, `article`, `footer`, lists, labels, buttons, and links.
- Keep visible focus with `focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:outline-none` on custom interactive controls.
- Give icon-only controls an accessible name and hide decorative icons with `aria-hidden="true"`.
- Announce changing terminal, hero, form, and status content with `aria-live` where implemented.
- Use `aria-current` for active navigation state.
- Preserve keyboard escape and focus return in mobile navigation.
- Respect `prefers-reduced-motion` in both JavaScript and CSS.

See [accessibility.md](accessibility.md).

## Documentation map

- [colors.md](colors.md)
- [typography.md](typography.md)
- [spacing.md](spacing.md)
- [layout.md](layout.md)
- [components.md](components.md)
- [animations.md](animations.md)
- [icons.md](icons.md)
- [engineering-style.md](engineering-style.md)
- [engineering-grid.md](engineering-grid.md)
- [accessibility.md](accessibility.md)
- [responsive.md](responsive.md)
- [code-guidelines.md](code-guidelines.md)

