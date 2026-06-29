# Layout

## Page shell

`MainLayout` establishes the dark page, fixed grid texture, sticky header, content stacking context, and back-to-top control.

```jsx
<main className="dark min-h-screen bg-background font-mono text-foreground">
  <div className="engineering-grid pointer-events-none fixed inset-0 z-0 opacity-60" />
  <Header />
  <div className="relative z-10">{children}</div>
  <BackToTopButton />
</main>
```

The texture is non-interactive and stays behind content. New full-page UI should remain inside the `relative z-10` content layer.

## Standard section

`Section` owns the normal page width, gutters, vertical spacing, scroll offset, heading divider, eyebrow, and title.

```text
Section: max-w-6xl
│
├── Reveal: section header
│   ├── Eyebrow / terminal label
│   ├── > marker
│   └── Section title
│
└── Reveal: content
    └── Engineering panel
        ├── Panel header / metadata
        └── Cards or content grid
```

```jsx
<Section id="skills" eyebrow="capability matrix" title="Engineering Expertise">
  <div className="engineering-panel overflow-hidden">...</div>
</Section>
```

Do not repeat `max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-28` in feature sections. The hero is the deliberate exception because it fills the viewport and coordinates its own intro.

## Container widths

| Width | Current use |
| --- | --- |
| `max-w-6xl` | Standard sections and hero content |
| `max-w-5xl` | About narrative line container |
| `max-w-4xl` | Experience timeline and education card |
| `max-w-3xl` | Single certificate and hero text block |
| `max-w-lg` | Startup terminal window |

All centered content uses `mx-auto`. A narrower width communicates a deliberate reading or content constraint, not a separate page grid.

## Grid rules

Start with `grid` and no column count, then add columns at the breakpoint where the content remains readable.

| Pattern | Current class | Use |
| --- | --- | --- |
| Standard cards | `grid gap-5 md:grid-cols-2 xl:grid-cols-3` | Certificates and default project groups |
| Two-column cards | `grid gap-5 md:grid-cols-2` | Two/four project arrangements |
| Hero | `lg:grid-cols-[1fr_0.78fr]` | Copy plus portrait placeholder |
| Skills row | `lg:grid-cols-[minmax(0,0.7fr)_minmax(220px,0.3fr)]` | Responsibilities plus technology badges |
| Contact | `lg:grid-cols-[380px_minmax(0,1fr)]` | Contact cards plus form |
| Education | `md:grid-cols-[220px_minmax(0,1fr)]` | School mark plus record |

Use `minmax(0, ...)` when a content column can contain long text; this prevents overflow.

## Card composition

Cards are normally full-height flex columns when placed in a grid:

```jsx
<article className="engineering-panel flex h-full flex-col overflow-hidden">
  <div className="border-b border-border p-4">...</div>
  <div className="flex flex-1 flex-col p-5 sm:p-6">...</div>
</article>
```

Actions that should align at the bottom can follow content inside the `flex-1` region. Peer cards use the same padding and heading pattern.

## Responsive breakpoints

No breakpoint overrides are declared, so Tailwind defaults apply.

| Prefix | Minimum width | Layout role |
| --- | ---: | --- |
| base | 320 px supported minimum | Single-column, 20 px section gutter |
| `min-[375px]` | 375 px | Header brand details |
| `sm` | 640 px | Larger gutters/padding, row CTAs, timeline rail |
| `md` | 768 px | Two-column cards, larger body type |
| `lg` | 1024 px | Desktop navigation, hero/skills/contact split layouts |
| `xl` | 1280 px | Three/four-column project and certificate grids |
| `2xl` | 1536 px | Header breathing room and role text sizing |

See [responsive.md](responsive.md) for section-specific behavior.

## Layering

| Layer | Current z-index |
| --- | --- |
| Engineering grid background | `z-0` |
| Main content | `z-10` |
| Table of contents | `z-40` |
| Sticky header / mobile menu / back-to-top | `z-50` |
| Startup terminal | `z-[100]` |

New overlays must account for this stack. Avoid arbitrary z-index values inside cards.

## Scroll layout

- `html` uses `scroll-padding-top: 5rem`.
- `Section` uses `scroll-mt-24` for anchored navigation.
- The sticky header varies from 56 px to 72 px by viewport.
- The hero uses `min-h-[calc(100vh-72px)]`.
- Lenis provides smooth wheel scrolling; direct navigation uses `scrollIntoView({ behavior: "smooth" })`.

## Desktop, tablet, mobile

### Mobile

One column, `px-5`, `py-16`, collapsed header brand below 375 px, and overlay navigation. Controls can stack vertically.

### Tablet

`sm` increases gutters and padding. `md` introduces safe two-column grids, but navigation remains the mobile overlay until `lg`.

### Desktop

`lg` enables the fixed table of contents and removes `MobileNav`. Complex sections split into asymmetric columns. `xl` increases card density where individual card widths remain usable.

