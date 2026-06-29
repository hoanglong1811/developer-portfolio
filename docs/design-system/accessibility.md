# Accessibility

This document records current accessibility behavior and the constraints future UI must preserve. It also identifies implementation gaps rather than claiming coverage that is not present.

## Semantic HTML

Current structure uses:

- `main` for the application shell;
- `header`, `nav`, and `footer` for landmarks;
- `section` with stable IDs for portfolio regions;
- `article` for project and timeline entries;
- `h1`, `h2`, and `h3` in descending content hierarchy;
- `ul`/`li` for responsibilities, details, and navigation;
- real `button` elements for actions and real `a` elements for navigation/resources;
- `label` wrapping each input/textarea in `Field`.

Maintain one hero `h1`. Standard section headings remain `h2`; card titles remain `h3`.

## ARIA in the current UI

| Pattern | Implementation |
| --- | --- |
| Startup terminal updates | `aria-label="Startup terminal"`, `aria-live="polite"` |
| Hidden application during startup | `aria-hidden={!startupComplete}` |
| Hero typewriter updates | `aria-live="polite"` |
| Desktop navigation | `aria-label="Table of Contents"` |
| Mobile menu trigger | dynamic `aria-label`, `aria-expanded`, `aria-controls` |
| Mobile overlay | `role="dialog"`, `aria-modal="true"`, `aria-label="Navigation menu"` |
| Active navigation | `aria-current` on ToC and mobile links |
| Back to top | `aria-label="Back to hero"` |
| Form feedback | `role="status"`, `aria-live="polite"` |
| Decorative glyphs/icons | `aria-hidden="true"` |
| Skeletons/progress texture | `aria-hidden="true"` |

Do not add ARIA where native HTML already supplies the correct behavior. Use ARIA to name icon-only controls, expose state, or manage live updates.

## Keyboard navigation

Current custom controls are keyboard-operable because they use links and buttons. The mobile menu closes on Escape and returns focus to its trigger. Navigation links perform smooth anchor scrolling; active state is independently tracked by IntersectionObserver.

Custom interactive styles use this focus pattern:

```text
focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:outline-none
```

`Field` uses `focus:border-accent focus:ring-1 focus:ring-accent/50`.

Future controls must have a visible focus state at least as prominent as these patterns. Do not attach click behavior to a plain `div` or `span`.

## Focus management gaps

The current mobile dialog does not trap focus within the open menu, and click-outside closure does not explicitly restore focus. Contact-card links also rely on browser focus indication rather than the system's ring pattern. These are known gaps, not conventions to copy.

Recommended future work:

- add a focus trap or use an accessible dialog primitive for `MobileNav`;
- return focus on every close path;
- add `group-focus-visible`/ring treatment to linked contact cards;
- test tab order with the startup and hero locks active.

## Color contrast

Primary content uses light foreground on near-black background. Muted text, technology text, and orange accent are intended for dark surfaces; semantic success/error colors are limited to short feedback. No automated contrast test is currently configured.

Rules for changes:

- test text/surface pairs against WCAG AA before changing variables;
- do not use `--grid-line` or low-opacity borders as text colors;
- never rely on orange/green/red alone—pair status with text, shape, or labels;
- reserve opacity-reduced muted text for nonessential compact labels, not body copy.

## Images and icons

- Project images use `${title} screenshot` alt text.
- Certificate and education logos use issuer/school-based alt text.
- Contact and technology images have label/name alternatives.
- Lucide icons next to visible labels are hidden from assistive technology.
- Icon-only buttons have explicit labels.

If an image is purely decorative, use empty alt text; do not repeat adjacent visible text in a noisy alternative.

## Forms

`Field` binds its visible label to `id="field-${name}"`. Contact fields use native `required`, `type="email"`, and disabled state during submission. Feedback is announced politely.

When adding fields:

- provide a unique `name` because it determines the ID;
- retain a visible label; placeholder text is not a label;
- use native `type`, `required`, and `disabled` attributes first;
- associate field-specific errors with their fields if validation becomes granular.

## Reduced motion

JavaScript hooks detect `(prefers-reduced-motion: reduce)` for startup, typewriter, reveal, and artificial async loading. CSS globally reduces animation and transition duration and iteration.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

Known gaps: the skills Motion animation and Lenis hook do not directly use the reduced-motion hook, and imperative `scrollIntoView({ behavior: "smooth" })` calls do not branch on the preference. Address these before adding more JavaScript-driven motion.

## Testing checklist

- Navigate the entire page using Tab, Shift+Tab, Enter, Space, and Escape.
- Confirm every focus indicator is visible against its surface.
- Test at 200% zoom and at the 320 px minimum width.
- Enable reduced motion before initial load and while the page is open.
- Verify heading order and landmark labels with a screen reader.
- Verify live regions do not announce every animation frame excessively.
- Test remote-logo failure paths and image alternative text.

