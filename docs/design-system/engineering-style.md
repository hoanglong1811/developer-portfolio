# Engineering Visual Language

The portfolio's visual language combines terminal syntax, schematic grids, HUD-like status framing, and dense technical metadata. It should feel engineered and legible, not decorative or science-fiction themed.

## Engineering panel

The central surface primitive is defined in `App.css`:

```css
.engineering-panel {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--card);
}
```

`--radius` is `0.375rem`. Use the class for major bounded content and add layout/padding at the call site.

```jsx
<div className="engineering-panel overflow-hidden">...</div>
```

Nested areas normally use `bg-secondary` and a `border-b border-border` divider.

## Engineering grid

```css
.engineering-grid {
  background-image:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: 32px 32px;
  background-position: top left;
}
```

The grid appears as:

- a fixed page backdrop at `opacity-60`;
- header texture at `opacity-35`;
- startup texture at `opacity-40`;
- mobile navigation texture at `opacity-30`;
- panel/header texture in Skills and image placeholders.

Use it on broad, quiet surfaces. Do not place it behind dense body copy at full opacity.

## Terminal label

`terminal-label` is a small, semibold, uppercase, muted label with `0.25em` tracking. It names a field or block:

```jsx
<p className="terminal-label mb-2">duration</p>
```

Keep labels concise: `company`, `position`, `skills`, `academic record`. Do not turn paragraphs into terminal labels.

## Terminal marker

`terminal-marker` sets text to the accent color. The standard marker is a decorative `>` before a title:

```jsx
<span className="terminal-marker" aria-hidden="true">&gt;</span>
```

Lists also use `>` or a small orange square as a bullet. Markers are structural accents and are hidden from assistive technology when they add no meaning.

## Uppercase and tracking

The interface uses uppercase for:

- hero and section headings;
- card headings;
- labels and metadata;
- navigation, buttons, and badges.

Body descriptions and responsibilities remain sentence case. Tracking scales from `0.04em` for large headings to `0.25em`–`0.3em` for tiny labels. This contrast is a core part of the technical hierarchy.

## Borders and rails

One-pixel lines create hierarchy:

- outer panel: `border border-border`;
- header/detail division: `border-b border-border`;
- nested metadata: `border-l border-border pl-4`;
- timeline rail: a vertical `w-px bg-border` line;
- active/accent line: `bg-accent` or `border-accent`.

Avoid shadows as the primary separation mechanism. Current cards have no box shadow.

## Glass surfaces

`GlassCard` is a historical name; it currently applies only `engineering-panel`. Actual translucency/backdrop blur is reserved for the sticky header (`bg-background/95 backdrop-blur`) and mobile navigation (`bg-background/98 backdrop-blur-sm`).

Do not add blur to every card. The established panel language is opaque, dark, and border-led.

## HUD-inspired UI

HUD cues are functional:

- the fixed desktop contents rail shows location and reading progress;
- orange keys identify values such as role and duration;
- badges present stack/status data;
- window chrome frames the startup terminal;
- grid lines and thin rules align content.

Avoid ornamental gauges, random coordinates, fake status lights, or unreadable microcopy. A HUD element must improve orientation or scanning.

## Building a new section

Follow this composition:

```text
Section
│
├── eyebrow: short system-style descriptor
├── title: user-facing section name
└── content
    └── engineering-panel or peer cards
        ├── optional engineering-grid header
        ├── terminal-label metadata
        ├── foreground title
        ├── muted technical copy
        └── accent markers / actions
```

Example based on Skills:

```jsx
<Section id="skills" eyebrow="capability matrix" title="Engineering Expertise">
  <div className="engineering-panel overflow-hidden">
    <div className="engineering-grid border-b border-border bg-secondary px-5 py-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
      engineering capability matrix
    </div>
    <div className="divide-y divide-border">...</div>
  </div>
</Section>
```

New sections should reuse the existing orange, border, radius, type, spacing, and reveal rules. A new visual primitive belongs in `App.css` only when it recurs; one-off layout stays in Tailwind classes at the component.

