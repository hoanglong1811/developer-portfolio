# Typography

## Font family

The active font stack is:

```css
"IBM Plex Mono", "JetBrains Mono", "Fira Code", monospace
```

`IBM Plex Mono` weights 400, 500, 600, and 700 are imported in `src/styles/index.css`. Tailwind's `font-sans`, `font-heading`, and `font-mono` all resolve to the same stack. `MainLayout` applies `font-mono`, so components inherit it unless they repeat the class for clarity.

## Hierarchy

| Role | Current classes | Weight | Tracking | Line height | Usage |
| --- | --- | --- | --- | --- | --- |
| Hero title | `text-4xl sm:text-5xl xl:text-6xl font-semibold uppercase leading-tight tracking-[0.04em] text-foreground` | 600 | `0.04em` | `leading-tight` | Profile name only |
| Section title | `section-title text-3xl md:text-4xl lg:text-5xl` | 600 from CSS | `0.04em` | `1.1` | Every standard section `h2` |
| Eyebrow / terminal label | `terminal-label` | 600 | `0.25em` | `1.5` | Section eyebrow, field-like metadata headings |
| Terminal window label | `text-[10px] tracking-widest text-muted-foreground/60 uppercase` | inherited 400 | `tracking-widest` | normal | Startup window title |
| Card title | `text-lg md:text-xl font-semibold uppercase leading-snug tracking-[0.08em] text-foreground` | 600 | `0.08em` | `leading-snug` | Project, certificate, timeline, education |
| Compact card title | `text-sm md:text-base font-semibold uppercase leading-5 tracking-[0.14em]` | 600 | `0.14em` | 1.25rem | Highlight cards |
| Body / technical copy | `technical-copy` | 400 | normal | `1.8`; `1.9` at `md` | Descriptions and narrative copy |
| Body list | `text-sm md:text-base leading-7 text-muted-foreground` | 400 | normal | 1.75rem | Responsibilities and detail lists |
| Accent metadata | `text-sm md:text-base font-semibold uppercase leading-6 tracking-[0.12em] text-accent` | 600 | `0.12em` | 1.5rem | Role, issuer, location-like values |
| Caption | `text-xs uppercase leading-5 tracking-[0.14em] text-muted-foreground` | varies | `0.14em` | 1.25rem | Project metadata and footer-like detail |
| Form label | `text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] text-foreground` | 600 | `0.14em` | normal | `Field` labels |
| Badge label | `tech-badge` | 500 | `0.08em` | `1` | Status, stack, category badges |

## Named type patterns

### `terminal-label`

Defined in `App.css`:

```css
.terminal-label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  line-height: 1.5;
  text-transform: uppercase;
  color: var(--muted-foreground);
}
```

At `sm`, its font size becomes `0.875rem`. Use it for short categorical labels, never sentences.

```jsx
<p className="terminal-label mb-3">About Me</p>
```

### `section-title`

This pattern supplies flex alignment, `gap-3`, uppercase styling, weight, tracking, line height, and foreground color. `Section` adds the responsive size classes.

```jsx
<h2 className="section-title text-3xl md:text-4xl lg:text-5xl">
  <span className="terminal-marker" aria-hidden="true">&gt;</span>
  {title}
</h2>
```

### `technical-copy`

Use this for paragraphs that need comfortable reading rhythm while retaining the technical monospace voice.

```css
.technical-copy {
  color: var(--muted-foreground);
  font-size: 0.875rem;
  line-height: 1.8;
}
```

At `md`, it becomes `1rem` with `1.9` line height.

## Case and tracking

Uppercase is appropriate for headings, labels, navigation, badges, button text, and compact metadata. Body descriptions and list items remain sentence case. Tracking increases as text becomes smaller and more label-like:

- `0.04em`: large titles;
- `0.08em`: card titles;
- `0.12em`–`0.14em`: controls and metadata;
- `0.25em`–`0.3em`: eyebrows and tiny navigation captions.

Do not apply `tracking-[0.25em]` to body text or long titles; the current system reserves it for short labels.

## Usage example

```jsx
<p className="terminal-label mb-2">company</p>
<h3 className="text-lg font-semibold uppercase leading-snug tracking-[0.08em] text-foreground md:text-xl">
  {company}
</h3>
<p className="technical-copy mt-4">{description}</p>
```

