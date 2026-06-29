# Spacing

The project uses Tailwind's default spacing scale plus a small number of arbitrary layout values. Spacing is mobile-first and usually grows at `sm` or `md`.

## Frequently used scale

| Utility | Size | Current role |
| --- | --- | --- |
| `gap-1` | 0.25rem | Tight navigation rows |
| `gap-2` | 0.5rem | Icon/text pairs and badges |
| `gap-3` | 0.75rem | CTA stacks, list rows, title marker |
| `gap-4` | 1rem | Standard form fields, compact grids, card header groups |
| `gap-5` | 1.25rem | Card grids and stacked contact cards |
| `gap-6` | 1.5rem | Capability rows and primary section sub-layouts |
| `gap-7` | 1.75rem | Education's two-part card |
| `gap-8` | 2rem | Certificate groups and medium contact layout |
| `gap-10` | 2.5rem | Hero and desktop contact columns |
| `gap-12` | 3rem | Hero columns at `sm` |
| `p-4` | 1rem | Compact cards and preview frames |
| `p-5` | 1.25rem | Default cards and section panels on mobile |
| `p-6` | 1.5rem | Project/certificate cards at `sm` |
| `p-7` | 1.75rem | Spacious cards at `sm` |
| `px-5` | 1.25rem | Base section and hero horizontal gutter |
| `sm:px-8` | 2rem | Section and hero gutter from 640 px |
| `py-16` | 4rem | Base section and hero vertical padding |
| `sm:py-20` | 5rem | Section and hero padding from 640 px |
| `lg:py-28` | 7rem | Standard sections from 1024 px |

## Standard section rhythm

`Section` is the authority for page-level spacing:

```jsx
<section className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20 lg:py-28">
  <Reveal className="mb-8 border-b border-border pb-5 sm:mb-10 sm:pb-6">
    ...
  </Reveal>
  <Reveal>{children}</Reveal>
</section>
```

This creates:

- 64 px top/bottom on mobile;
- 80 px at `sm`;
- 112 px at `lg`;
- 20 px horizontal gutters on mobile and 32 px from `sm`.

`py-24` is not used by the current implementation. Do not treat it as a system default; use the `Section` progression above.

## Card padding

Use `p-5 sm:p-6` for standard content cards such as `CertificateCard`. Use `p-5 sm:p-7` when the content needs more reading space, as in `TimelineItem`, `AboutSection`, `EducationSection`, and `ContactForm`. Use `p-4` for compact subordinate cards or framed media.

```jsx
<GlassCard className="flex h-full flex-col p-5 sm:p-6">...</GlassCard>
```

Keep nested panel padding smaller than its parent. `ProjectCard`, for example, uses `p-4` around the preview and `p-5 sm:p-6` around its content.

## Grid gaps

### Use `gap-4`

Use for tightly related controls or compact content:

- contact form rows;
- highlight-card grid;
- contact icon/value alignment;
- timeline metadata grid.

### Use `gap-5`

Use as the default distance between peer cards. Projects and certificate cards use `gap-5`; experience entries use `space-y-5`.

### Use `gap-6`

Use between substantial regions inside the same panel or section. Capability rows and the mobile contact section use it.

### Use `gap-8` to `gap-12`

Reserve these for section-level group or column separation, not content inside small cards.

## Internal vertical rhythm

Common progressions in current cards:

- label to value: `mb-2` or `mb-3`;
- title to paragraph: `mt-3` or `mt-4`;
- new metadata block: `mt-5` or `mt-6`;
- section header to content: `mb-8 sm:mb-10`;
- border-separated header padding: `pb-4`, `pb-5`, or `pb-6`.

```jsx
<h3 className="mt-5 ...">{title}</h3>
<p className="technical-copy mt-4">{description}</p>
<div className="mt-5 flex flex-wrap gap-2">...</div>
<div className="mt-6 grid gap-3 sm:grid-cols-2">...</div>
```

## Indentation and rails

Use `border-l border-border pl-4` for detail lists and nested metadata. The experience timeline adds `sm:pl-12` to clear its icon rail. This is a structural motif; do not add arbitrary left borders to ordinary paragraphs.

## Fixed control spacing

- Back to top: `bottom-5 right-5`, `size-10`.
- Header actions: `gap-3` with responsive horizontal padding from `px-3` through `2xl:px-16`.
- Icons in buttons and inline metadata: `gap-2`.

