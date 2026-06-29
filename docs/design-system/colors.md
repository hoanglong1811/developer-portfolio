# Colors

The project has one dark theme. Values are declared in `:root` in `src/styles/index.css`, then exposed to Tailwind through `@theme inline`. Use semantic utilities instead of raw hex values in JSX.

## Active palette

| Role | Tailwind utility examples | CSS variable | Value | Current use |
| --- | --- | --- | --- | --- |
| Page background | `bg-background` | `--background` | `#0b0b0b` | Body, main shell, hero previews, terminal |
| Primary surface | `bg-card` | `--card` | `#151515` | `engineering-panel`, secondary button surface |
| Secondary surface | `bg-secondary` | `--secondary` | `#111111` | Nested panels, controls, icon frames, hover rows |
| Primary text | `text-foreground` | `--foreground` | `#eaeaea` | Headings, labels, interactive text |
| Muted text | `text-muted-foreground` | `--muted-foreground` | `#8b8b8b` | Body copy, metadata, captions, commands |
| Accent | `text-accent`, `bg-accent`, `border-accent` | `--accent` | `#ff5a1f` | Terminal markers, active state, primary actions |
| Accent hover | `bg-accent-hover`, `border-accent-hover` | `--accent-hover` | `#ff6d3a` | Primary button and brand-border hover |
| Default border | `border-border`, `bg-border` | `--border` | `#232323` | Panel outlines, dividers, progress track |
| Muted border | `border-border-muted` | `--border-muted` → `--tech-border` | `#2b2b2b` | Dashed image-placeholder interior |
| Focus ring | `ring-ring` | `--ring` | `#ff5a1f` | Keyboard focus |
| Technology surface | `bg-tech-bg` | `--tech-bg` | `#121212` | Technology badges |
| Technology border | `border-tech-border` | `--tech-border` | `#2b2b2b` | Technology badges |
| Technology text | `text-tech-text` | `--tech-text` | `#bebebe` | Technology badges |
| Error/destructive | `text-destructive`, `border-destructive` | `--destructive` | `#ef4444` | Contact error and destructive button variant |
| Success text | `text-success-text` | `--success-text` | `#9ee7b6` | Contact success and success badge text |
| Success surface | `bg-success-bg` | `--success-bg` | `#101a13` | Success badge |
| Success border | `border-success-border` | `--success-border` | `#1f3d2a` | Success badge |

The startup terminal also uses Tailwind palette utilities `bg-red-500/70`, `bg-yellow-400/70`, and `bg-green-500/70` only for the three decorative window controls. They are not general semantic status tokens.

## Background and surfaces

Use `bg-background` for the page, terminal body, and areas that should visually recede. Use `bg-card` through `engineering-panel` for the main bounded surface. Use `bg-secondary` for a nested layer, control, icon frame, panel header, or row hover.

```jsx
<main className="dark min-h-screen bg-background font-mono text-foreground">
  <div className="engineering-panel overflow-hidden">
    <div className="border-b border-border bg-secondary px-5 py-4">...</div>
  </div>
</main>
```

Do not stack multiple undifferentiated `bg-card` panels. Nested content should normally step down to `bg-secondary` or back to `bg-background`.

## Text hierarchy

- `text-foreground`: headings, important values, labels, and interactive copy.
- `text-muted-foreground`: body copy, captions, supporting metadata, and inactive navigation.
- `text-accent`: markers, roles, active navigation, icons, and small metadata keys.
- `text-tech-text`: technology badge labels only.
- `text-destructive` / `text-success-text`: form or status feedback only.

```jsx
<p className="terminal-label mb-2">position</p>
<p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
  {position}
</p>
```

## Borders

`border-border` is the default one-pixel structural line. Use it for panel boundaries, dividers, form fields, and icon frames. Interactive cards may move to `hover:border-accent/70`; the lower opacity prevents hover borders from competing with primary actions.

```jsx
<article className="engineering-panel transition-colors hover:border-accent/70">
  ...
</article>
```

Use `border-tech-border` only for technology badges and `border-success-border` only for success states.

## Accent rules

Orange is the only general emphasis color. Use it for:

- the `>` terminal marker;
- primary buttons;
- active or hovered navigation;
- meaningful icons;
- a narrow rule or progress indicator;
- short metadata values.

Do not use large orange surfaces except primary controls. Do not set long body paragraphs in orange.

## Transparency

The implementation uses opacity to preserve the background context:

| Utility | Use |
| --- | --- |
| `bg-background/95` | Sticky header |
| `bg-background/98` | Mobile navigation overlay |
| `bg-background/90` | Startup terminal body |
| `bg-background/70` | Image placeholder interior |
| `border-accent/70` | Hovered cards and contact icons |
| `ring-ring/70` | Focus-visible ring |
| `text-muted-foreground/60` | Startup window title |

## Non-utility visual colors

These variables are consumed by CSS patterns rather than normal JSX utilities:

| Variable | Value | Use |
| --- | --- | --- |
| `--selection-bg` | `rgba(255, 90, 31, 0.28)` | Text selection |
| `--grid-line` | `rgba(255, 255, 255, 0.035)` | Engineering grid |

The skeleton shimmer uses `rgba(255, 90, 31, 0.12)` directly in `App.css`; it is part of that effect, not a reusable color token.

