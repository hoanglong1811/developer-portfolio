# Components

This catalog covers the requested reusable components and the active primitives they depend on. Props are inferred from current function signatures and use sites; the project does not use TypeScript or runtime prop validation.

## Section

**Purpose:** Standard semantic section frame with width, spacing, anchor offset, eyebrow, title, divider, and two reveal wrappers.

**Props:** `id`, `eyebrow` (string or node), `title`, `children`, `className`, `eyebrowClassName`, `headerClassName`.

**Usage:** Use for every normal portfolio section. Pass a short lowercase terminal-style eyebrow and a concise title.

```jsx
<Section id="about" eyebrow="profile readme" title="About">
  <GlassCard className="p-5 sm:p-7">...</GlassCard>
</Section>
```

**Do:** Let it own page gutters and vertical rhythm. Use an eyebrow node only when the string treatment is insufficient.

**Don't:** Nest `Section` components or duplicate its `max-w-6xl` spacing inside children.

## GlassCard

**Purpose:** Minimal wrapper for the `engineering-panel` surface.

**Props:** `children`, `className`.

**Usage:** Add context-specific padding and layout through `className`.

```jsx
<GlassCard className="p-5 sm:p-7">...</GlassCard>
```

**Do:** Use it when content needs the standard border, radius, and card background.

**Don't:** Assume it adds blur or transparency. Despite its name, it currently renders only `engineering-panel`.

## HighlightCard

**Purpose:** Compact summary card used for About highlights.

**Props:** `title`, `description`, `icon` (an icon component or a key in `IconMap`).

**Usage:** Feed it content from `aboutHighlights`.

```jsx
<HighlightCard title={item.title} description={item.description} icon={item.icon} />
```

**Do:** Keep the title short and provide an icon that exists in `IconMap` when passing a string.

**Don't:** Use it for long metadata sets or actionable content; it has no action slot.

## ProjectCard

**Purpose:** Displays project media, status, metadata, description, optional detail lists, stack, and links.

**Props:** `project`, `featured = false`. `project` currently supports `title`, `description`, `image`, `role`, `category`, `status`, `duration`, `features`, `problemsSolved`, `metrics`, `achievements`, `stack`, `githubUrl`, and `liveUrl`.

**Usage:** Set `featured` only where the layout gives the card enough width. It increases preview height and exposes features/problems solved.

```jsx
<ProjectCard project={project} featured={index === 0} />
```

**Do:** Supply a meaningful `title` and `description`; omit optional arrays rather than filling them with placeholders.

**Don't:** Put arbitrary JSX into the data object or render all cards as featured in a dense grid.

## CertificateCard

**Purpose:** Displays certificate issuer, logo/fallback, category, issue date, skills, and credential link.

**Props:** `certificate` with `title`, `issuer`, `issued`, `logo`, `skills`, `credentialUrl`, and `category`.

**Usage:** Render within the certificate layouts; it fills available height.

```jsx
<CertificateCard certificate={certificate} />
```

**Do:** Provide logo alt context through a valid `issuer`; use an empty `skills` array when none exist.

**Don't:** Render an empty credential action. The component omits it when `credentialUrl` is absent.

## TechLogoBadge

**Purpose:** Technology name plus remote logo or component fallback in the dedicated technology palette.

**Props:** `technology`, `className`. `technology` accepts `name`, `icon`, `iconUrl`, and optional `alt`.

**Usage:** Use within wrapping flex containers.

```jsx
<div className="flex min-w-0 flex-wrap gap-2">
  {group.technologies.map((technology) => (
    <TechLogoBadge key={technology.name} technology={technology} />
  ))}
</div>
```

**Do:** Always provide `name`; provide `alt` when the logo meaning differs from the technology name.

**Don't:** Hard-code a broken image state. The component already falls back to `icon` when `iconUrl` fails.

## IconFrame

**Purpose:** Standard bordered square for decorative Lucide-style icons.

**Props:** `icon`, `compact = false`.

**Usage:** Pass the component, not an element instance.

```jsx
<IconFrame icon={IconComponent} compact />
```

**Do:** Use `compact` for small cards (`size-9` / icon `size-4`); use the default for `size-11` / icon `size-5`.

**Don't:** Use it as a button without adding actual button semantics and focus behavior.

## CopyButton audit status

**Purpose:** None in the current system. `src/components/shared/CopyButton.jsx` and its `useCopyClipboard` hook are deleted in the current working tree, and no active source imports `CopyButton`.

**Props:** None in the current implementation.

**Usage:** There is no valid current usage example; presenting one would document a nonexistent component.

**Do:** Use an ordinary `Button` for a future copy action, then add clipboard behavior as a new reviewed component if needed.

**Don't:** import `CopyButton` or document its previous API as current behavior.

## BackToTopButton

**Purpose:** Fixed control that appears after scrolling beyond 70% of one viewport and scrolls to `#home`.

**Props:** None.

**Usage:** Render once in `MainLayout`.

```jsx
<BackToTopButton />
```

**Do:** Keep `aria-label="Back to hero"` and the focus ring if changing the glyph.

**Don't:** Place a second instance in individual sections.

## TableOfContents

**Purpose:** Fixed desktop section navigation with active-section state and reading progress.

**Props:** None. It reads `navigationLinks` and `useActiveSection` internally.

**Usage:** The hero mounts it only after the intro is complete.

```jsx
{isHeroIntroComplete && <TableOfContents />}
```

**Do:** Keep navigation links synchronized with section IDs in `src/constants/navigation.js`.

**Don't:** show it below `lg`; `MobileNav` owns navigation there.

## Header

**Purpose:** Sticky brand bar with desktop contact action and mobile/tablet menu trigger.

**Props:** None. It reads `profile` and renders `MobileNav`.

**Usage:** Render once near the top of `MainLayout`.

```jsx
<Header />
```

**Do:** Preserve the mobile-first truncation and the split at `lg`.

**Don't:** add a second desktop section-navigation row; the fixed table of contents is the desktop section navigator.

## StartupTerminal

**Purpose:** Full-screen, one-shot terminal intro. It locks scrolling, renders the typed blocks, fades out, then informs `App` when the fade has completed.

**Props:** `onComplete` callback.

**Usage:** Mount under `AnimatePresence`; the parent owns completion state and unmounting.

```jsx
<AnimatePresence>
  {!startupComplete && (
    <StartupTerminal onComplete={() => setStartupComplete(true)} />
  )}
</AnimatePresence>
```

**Do:** call portfolio reveal only after `onComplete`; keep terminal content in `startupBlocks`.

**Don't:** use it as a reusable inline terminal or make core content depend on the animation completing for reduced-motion users.

## Active supporting primitives

### Reveal

Props: `children`, `className`, `delay = 0`, `yOffset = 18`. It reveals once using intersection state and becomes immediate under reduced motion.

```jsx
<Reveal delay={index * 0.05}><CertificateCard certificate={certificate} /></Reveal>
```

Use small delays for peer items. Do not wrap the same content in redundant nested `Reveal` components; note that `Section` already wraps its header and content.

### Button and `buttonVariants`

Variants: `default`, `outline`, `secondary`, `ghost`, `destructive`, `link`. Sizes: `default`, `xs`, `sm`, `lg`, `icon`, `icon-xs`, `icon-sm`, `icon-lg`.

Use `Button` for behavior and `buttonVariants()` to style actual links as buttons.

```jsx
<a href={profile.cvHref} className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
  See my resume
</a>
```

### Badge

Variants: `default`, `success`. It uses the `tech-badge` base style.

```jsx
<Badge>{category}</Badge>
```

### Field

Props: `label`, `textarea = false`, plus native input/textarea props. The `name` generates `id="field-${name}"`.

```jsx
<Field label="Email" name="email" type="email" required disabled={isSending} />
```

Always provide a unique `name` and visible `label`.

### Other active reusable components

- `TimelineItem`: experience article with company, location, position, duration, and responsibilities.
- `ContactIcon`: remote contact icon with a component fallback.
- `ImagePlaceholder`: engineering-grid placeholder used when project or hero media is absent.
- `ReadingProgress`: decorative vertical document progress indicator.
- `SkeletonCard`: `aria-hidden` loading placeholder for delayed section data.

