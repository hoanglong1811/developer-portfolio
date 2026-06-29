# Engineering Grid

This is the implementation-level reference for the current `engineering-grid` pattern. Broader visual-language rules live in [engineering-style.md](engineering-style.md).

## Implementation

The pattern is defined in `src/styles/App.css`:

```css
.engineering-grid {
  background-image:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: 32px 32px;
  background-position: top left;
}
```

Its only color token is defined in `src/styles/index.css`:

```css
--grid-line: rgba(255, 255, 255, 0.035);
```

The two gradients draw one-pixel horizontal and vertical lines. CSS repeats the 32 px tile from the top-left origin. The grid is static and uses no image, SVG, canvas, JavaScript, or animation.

## Current uses

| Component | Classes | Role |
| --- | --- | --- |
| `MainLayout` | `engineering-grid pointer-events-none fixed inset-0 z-0 opacity-60` | Page-wide ambient texture |
| `Header` | `engineering-grid absolute inset-0 opacity-35` | Texture behind sticky header content |
| `StartupTerminal` | `engineering-grid absolute inset-0 opacity-40` | Full-screen startup backdrop |
| `MobileNav` | `engineering-grid absolute inset-0 opacity-30` | Overlay-menu texture |
| `SkillsSection` | `engineering-grid border-b border-border bg-secondary ...` | Capability-matrix header |
| `ImagePlaceholder` | `engineering-panel engineering-grid ... bg-secondary` | Framed missing-media surface |

There are no density variants, alternate grid sizes, breakpoint-specific grid values, or named grid opacity tokens in the current project.

## Layering

```text
MainLayout
├── fixed grid: z-0, pointer-events-none
├── Header: z-50
└── content: relative z-10
```

Standalone grid overlays in `Header`, `StartupTerminal`, and `MobileNav` are marked `aria-hidden="true"`. The global page grid has no semantic content and is non-interactive.

For `ImagePlaceholder`, the grid is on the outer engineering panel. A semi-opaque `bg-background/70` inner frame protects label readability.

## Usage

Use the existing class on a broad technical surface:

```jsx
<div className="engineering-grid absolute inset-0 opacity-35" aria-hidden="true" />
```

For a full-screen layer, prevent pointer interception:

```jsx
<div className="engineering-grid pointer-events-none fixed inset-0 z-0 opacity-60" />
```

## Do

- Keep the grid subordinate to type, controls, and panel borders.
- Use the opacity already established for the matching context.
- Mark standalone decorative overlays `aria-hidden="true"`.
- Use `pointer-events-none` when a full-size grid layer could intercept interaction.
- Place readable content on a solid or semi-opaque surface when needed.

## Don't

- Do not animate `background-position` or grid opacity.
- Do not invent smaller/larger density variants without first adding real tokens and implementation.
- Do not use the grid as a replacement for layout spacing or dividers.
- Do not place it in compact controls or behind dense body copy at high opacity.
- Do not add extra gradient layers unless a recurring implemented pattern requires them.

## Responsive behavior

The grid remains 32 px at every viewport. Context opacity also remains constant across breakpoints. Responsive components change layout around it; the texture itself does not change.

## Accessibility and performance

The grid is decorative and communicates no required state. It is static, low contrast, and rendered with two native CSS gradients. The fixed page layer can still contribute to paint cost, so new large blurred or animated layers should not be stacked with it.
