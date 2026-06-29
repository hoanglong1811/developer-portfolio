# Animations

The project uses Motion from `motion/react`, Tailwind transitions, one CSS keyframe, JavaScript typewriter timers, and Lenis scrolling. Motion is restrained to opacity, short translations, and state transitions.

## Timing inventory

| Animation | Duration / delay | Easing | Movement |
| --- | --- | --- | --- |
| Startup typing | 32 ms per character | timer steps | Character reveal |
| Startup output line delay | 180 ms | timer | None |
| Startup block delay | 380 ms | timer | None |
| Startup final hold | 700 ms | timer | None |
| Startup fade | 0.6 s | `easeInOut` | Opacity 1 → 0 |
| Portfolio reveal after startup | 0.5 s | `easeOut` | Opacity 0 → 1 |
| Hero typewriter | 35 ms per character | timer steps | Character reveal |
| Hero line delay | 350 ms | timer | None |
| Hero image | 0.6 s | `easeOut` | `x: 80 → 0`, opacity |
| Hero CTA | 0.35 s after 250 ms | Motion default easing | `y: 8 → 0`, opacity |
| Reveal | 0.35 s + caller delay | `easeOut` | `y: 18 → 0`, opacity |
| Skills rows | 0.45 s + `index * 0.05` | `[0.22, 1, 0.36, 1]` | `y: 18 → 0`, opacity |
| Table of contents | 0.45 s | `easeOut` | `x: -20 → 0`, opacity |
| Mobile menu | 0.2 s | `easeOut` | `y: -8 ↔ 0`, opacity |
| Back to top | 0.25 s | Motion default easing | `y: 8 ↔ 0`, opacity |
| ToC hover | 200 ms | Tailwind default | `translate-x`, marker shift |
| Reading progress | 150 ms | `ease-out` | Height update / transform hint |
| Skeleton shimmer | 1.2 s infinite | CSS default | `translateX(-100% → 100%)` |
| Lenis scroll | 1.05 s | exponential function | Scroll interpolation |

## StartupTerminal sequence

```text
type startupBlocks
  → hide cursor
  → hold 700 ms
  → set isDone
  → fade terminal for 0.6 s
  → onAnimationComplete
  → parent sets startupComplete
  → portfolio fades in for 0.5 s
```

Terminal commands and outputs are maintained in `startupBlocks` in `useStartupTerminal.js`. The startup locks body scrolling until `isDone`. `App` uses `AnimatePresence` to unmount the terminal after its fade.

Use this sequence only at application startup. It is too long and blocking for normal section transitions or repeated navigation.

## Reveal

`Reveal` is the default scroll entrance:

```jsx
<motion.div
  initial={false}
  animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : yOffset }}
  transition={{ duration: prefersReducedMotion ? 0 : 0.35, delay: visible ? delay : 0, ease: "easeOut" }}
>
  {children}
</motion.div>
```

Its observer uses `rootMargin: "-80px"`, `threshold: 0.15`, and disconnects after the first entry. Use it for section headers, content regions, and card groups. Avoid nesting it when a parent already reveals the same content.

## Hero typewriter and image

The hero begins after startup completion. It types `name`, `role`, `summary`, `email`, and `location` in sequence. When typing finishes, the image moves in from the right. When the image completes, CTAs rise 8 px into view. The table of contents mounts only after the CTA sequence completes.

```text
type profile fields
  → slide/fade image
  → fade/raise CTAs
  → mount desktop ToC
  → release scroll lock
```

Do not add parallel hero animations that break this ordering. Keep the typewriter for short profile fields; it is not appropriate for long articles or repeated card content.

## Skills rows

`SkillsSection` uses `whileInView="visible"`, `viewport={{ once: true, margin: "-70px" }}`, and a 50 ms index stagger. This is a bespoke row animation rather than `Reveal` because each capability row enters independently.

## Navigation and scroll motion

- `TableOfContents` enters from the left when mounted.
- `TocItem` moves 4 px (`translate-x-1`) and slightly scales the active item (`scale-[1.04]`).
- `MobileNav` enters and exits 8 px above its final position.
- `BackToTopButton` appears after `scrollY > innerHeight * 0.7`.
- `ReadingProgress` updates on requestAnimationFrame and smooths visual changes for 150 ms.
- Lenis uses `duration: 1.05`, smooth wheel input, and `Math.min(1, 1.001 - 2 ** (-10 * time))` easing.

## Hover animations

Cards animate color only:

```jsx
className="transition-colors hover:border-accent/70"
```

Buttons, fields, icons, brand borders, and technology badges also use `transition-colors`. Keep card motion structural and quiet; current cards do not lift, rotate, or scale.

## Skeleton and cursors

Skeletons use the custom `skeleton-shimmer` keyframe at 1.2 seconds infinite. Startup and hero cursors use Tailwind `animate-pulse`. Both are decorative and must not contain information unavailable elsewhere.

## Preferred use

- Use 0.2–0.45 seconds for menus, reveals, and state changes.
- Use 0.6 seconds only for major staged hero/startup transitions.
- Stagger peer items by 0.05–0.06 seconds.
- Animate opacity and small translations; avoid large transforms in normal content.
- Use `transition-colors` for hover/focus surface changes.

Do not animate layout dimensions, long body text, routine form entry, or every nested element. Do not introduce a new easing curve when `easeOut` or the existing skills curve meets the need.

## Reduced motion

- `App` skips mounting the startup terminal when reduced motion is active at initial render.
- `useStartupTerminal` also completes immediately.
- `useTypewriterSequence` shows all hero lines immediately.
- `Reveal` uses zero duration and initializes as entered.
- `useAsyncSectionData` skips its artificial loading delay.
- Global CSS reduces animation and transition durations to `0.01ms` and limits iteration to one.

Current limitation: `SkillsSection` does not directly consult `usePrefersReducedMotion`, and `useLenis` always initializes. The global CSS rule does not control JavaScript-driven Motion or Lenis behavior; these are consistency improvements to consider before adding more bespoke motion.

