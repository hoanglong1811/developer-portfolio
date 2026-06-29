# Responsive Behavior

The portfolio is mobile-first, supports a 320 px minimum viewport, and uses Tailwind's default breakpoints because no custom breakpoint configuration exists.

## Breakpoints

| Prefix | Minimum width | System behavior |
| --- | ---: | --- |
| base | 320 px | One column, compact header, mobile controls |
| `min-[375px]` | 375 px | Header name and expanded brand spacing |
| `sm` | 640 px | 32 px page gutters, roomier panels, horizontal CTAs, timeline rail |
| `md` | 768 px | Two-column card grids and 16 px body copy |
| `lg` | 1024 px | Desktop ToC, no hamburger, split hero/skills/contact layouts |
| `xl` | 1280 px | Three- and four-column dense card grids |
| `2xl` | 1536 px | Wider header gutters and larger role caption |

Do not choose a breakpoint based only on device labels. Use the existing transition where the content pattern changes.

## Global gutters and vertical rhythm

Standard sections use:

```text
base: px-5 py-16
sm:   px-8 py-20
lg:         py-28
```

The hero matches `px-5 py-16 sm:px-8 sm:py-20` but omits `lg:py-28` because it vertically centers inside the viewport.

## Header

| Viewport | Behavior |
| --- | --- |
| `< 375 px` | Initials and hamburger; name block hidden |
| `375–639 px` | Initials and name; role hidden |
| `sm–md` | Initials, name, role, hamburger |
| `lg+` | Brand plus contact action; `MobileNav` hidden |

Header height progresses through approximately 56 px base, 60 px at 375 px, 64 px at `md`, 68 px at `lg`, and 72 px at `xl`. Horizontal padding progresses from `px-3` to `2xl:px-16`.

The name and role use truncation and `whitespace-nowrap`; preserve `min-w-0` when changing brand layout.

## Table of contents and mobile navigation

`TableOfContents` uses `hidden lg:block`, fixed at the left center (`left-4`, `xl:left-8`). It is mounted only after the hero intro finishes.

`MobileNav` uses `lg:hidden` and opens a full-width overlay below the header. The overlay navigation uses `px-4 py-5 sm:px-6`. There is no tablet-specific third navigation mode: tablet remains on the hamburger pattern.

## Hero

```jsx
<div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-6xl items-center gap-10 px-5 py-16 sm:gap-12 sm:px-8 sm:py-20 lg:grid-cols-[1fr_0.78fr]">
```

- Base through `md`: text then image in one column.
- `lg+`: asymmetric text/image columns.
- Title: `text-4xl`, `sm:text-5xl`, `xl:text-6xl`.
- Role: `text-base`, `sm:text-lg`, `lg:text-xl`.
- CTAs stack at base and switch to `sm:flex-row`.
- Hero placeholder is at least 320 px high, then 420 px at `sm`.
- Email uses `break-all` to prevent narrow-screen overflow.

## Cards

General card behavior:

- one column by default;
- `md:grid-cols-2` for two peer cards;
- `xl:grid-cols-3` only when card data can remain readable;
- `p-5` at base, commonly `sm:p-6` or `sm:p-7`;
- badges use `flex-wrap gap-2` rather than horizontal scrolling.

Card headings increase from `text-lg` to `md:text-xl`; body/list copy increases from `text-sm` to `md:text-base`.

## Projects

`ProjectsSection` adapts the grid to item count:

| Count | Layout |
| ---: | --- |
| 1 | One featured card |
| 2 | Two columns at `md` |
| 3 | One featured card, then two columns at `md` |
| 4 | Two columns at `md` |
| 5 | One featured card, then two columns at `md` and four at `xl` |
| 6+ | Two featured cards, then remaining cards at `md:2` / `xl:3` |

Featured cards show taller previews and additional detail lists. Keep the item-count branching in `renderProjectsLayout`; do not force all project counts through a generic three-column grid.

## Skills

Each capability row is one column until `lg`, then becomes:

```text
minmax(0, 0.7fr) | minmax(220px, 0.3fr)
responsibilities | wrapping technology badges
```

At `lg`, badges align right and receive `pt-8`. Before `lg`, they remain directly below the responsibilities. Row padding grows from `px-5 py-6` to `sm:px-7 sm:py-7`.

## Contact

The contact section uses one column through `md`. Gaps grow from `gap-6` to `md:gap-8`. At `lg`, it becomes `380px minmax(0,1fr)` with `gap-10`.

The three contact cards stack with `gap-5` below `lg`. On desktop, the first and third align to the top/bottom and the middle card is absolutely centered within the left column. The form's name/email fields switch to `sm:grid-cols-2`.

## About

Highlight cards are one column at base, two at `sm`, and three at `lg`:

```text
grid gap-4 sm:grid-cols-2 lg:grid-cols-3
```

## Experience

The timeline rail and icon nodes are hidden at base. At `sm`, the rail appears and items use `sm:pl-12`; metadata becomes two columns. This prevents the decorative rail from consuming narrow-screen space.

## Education

The card remains one column until `md`, then uses a 220 px logo column plus flexible content. The card itself is capped at `max-w-4xl`.

## Certificates

A single certificate stays at `max-w-3xl`. Multiple certificates use one column, `md:grid-cols-2`, then `xl:grid-cols-3` with `gap-5`.

## Responsive rules for new UI

- Keep the base layout complete and usable without breakpoint classes.
- Increase density only when content width supports it.
- Use the established `sm` gutter and padding increases.
- Put complex asymmetric splits at `lg`, not `md`.
- Use `min-w-0`, wrapping, `break-words`, or `break-all` where user/content data can overflow.
- Avoid horizontal scrolling for normal cards, labels, or actions.
- Test at 320, 375, 640, 768, 1024, 1280, and 1536 px.

