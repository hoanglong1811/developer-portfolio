# Icons

## Active icon sources

The current source uses two icon categories:

1. `lucide-react` components for interface and fallback icons.
2. Remote SVG/ICO image URLs for technology, certificate, and contact-brand logos.

Although `components.json` names Hugeicons as the shadcn registry icon library and Hugeicons packages are installed, no current component imports Hugeicons. Lucide is the implemented UI convention.

## Lucide icons

Current direct imports include:

- navigation and actions: `Menu`, `X`, `Mail`, `ArrowRight`, `Eye`, `Send`, `ExternalLink`;
- project and career: `CodeXml`, `BriefcaseBusiness`, `MapPin`;
- placeholders: `TerminalSquare`;
- mapped highlight/contact fallbacks: `Brain`, `Code2`, `Rocket`, `Globe`.

Use named imports from `lucide-react` and size icons through Tailwind.

```jsx
import { ExternalLink } from "lucide-react";

<ExternalLink className="size-4" aria-hidden="true" />
```

### Sizing

| Size | Current use |
| --- | --- |
| `size-3.5` | Compact header contact icon |
| `size-4` | Buttons, metadata, navigation, compact icon frames |
| `size-5` | Standard icon frames, contact fallbacks, placeholder icon |

Use `shrink-0` when an inline icon sits next to text that can wrap. Buttons already apply pointer-event and sizing rules to descendant SVGs.

## IconFrame

`IconFrame` standardizes decorative icon presentation:

```jsx
<span className="flex size-11 items-center justify-center border border-border bg-secondary text-accent">
  <Icon className="size-5" aria-hidden="true" />
</span>
```

The compact variant uses a `size-9` frame and `size-4` icon. Frames are square, bordered, and orange-on-secondary; they are not rounded icon bubbles.

## Technology logos

`src/constants/skills.js` builds Devicon and Simple Icons CDN URLs:

```js
const simpleIcon = (slug) => `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${slug}.svg`;
const devIcon = (slug, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-${variant}.svg`;
```

`TechLogoBadge` displays remote images at `size-5 object-contain`. If loading fails and `technology.icon` exists, it renders that component in `text-accent`.

```jsx
{ name: "React", iconUrl: devIcon("react") }
```

Always provide `name`. Use `alt` when the desired accessible alternative is not the name. Keep badges in `flex-wrap gap-2` containers.

## Contact icons

`ContactIcon` uses an 44 px (`size-11`) frame and a 20 px (`h-5 w-5` or `size-5`) image/icon. Remote images use `alt={`${label} icon`}` and fall back to a Lucide component when one is provided.

The active contact data uses Gmail ICO, Devicon LinkedIn SVG, and Simple Icons GitHub SVG URLs. Do not assume every link has a logo or fallback: current Phone data has neither and is not rendered by `ContactSection`'s explicit Email/LinkedIn/GitHub order.

## Certificate and education logos

- Certificate logos sit in a `size-16` bordered secondary frame with `p-3`.
- The education logo sits in a `size-24` container with `p-3`.
- Both use `object-contain` and descriptive alt text based on issuer/school.
- A missing certificate logo falls back to a decorative orange `>` marker.

## Color rules

- Functional/decorative Lucide icons: `text-accent` when emphasis is useful; otherwise inherit button or text color.
- Remote brand and technology logos: preserve their source color; do not apply text-color utilities as if they were SVG components.
- Icon frame: `border-border bg-secondary text-accent`.
- Hover is normally expressed through the parent border/text, not independent icon animation.

## Spacing

- Inline icon + text: `gap-2`.
- Contact icon + text block: `gap-4`.
- Icon frame + following compact card title: title uses `mt-4`.
- Keep icons `shrink-0` in wrapping metadata rows.

## Accessibility

- Decorative icons next to visible text use `aria-hidden="true"`.
- Icon-only buttons require an `aria-label`; `MobileNav` and `BackToTopButton` are the active examples.
- Meaningful standalone images need descriptive `alt` text.
- Do not use icon color alone to communicate status.
- Do not put semantics on `IconFrame`; it is a `span`, not a control.

