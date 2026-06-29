# Code Guidelines

These conventions are extracted from the current React/Vite source. They describe established structure; they do not introduce TypeScript, a new state library, or a new styling layer.

## Component naming and files

- Component functions and `.jsx` filenames use PascalCase: `ProjectCard`, `StartupTerminal`, `HeroSection`.
- Section compositions end in `Section`.
- Content-shaped reusable components end in `Card`.
- Hooks use a `use` prefix and live in `.js` files: `useActiveSection.js`.
- Constants, services, library helpers, and utilities use `.js`.
- Stylesheets use the established `index.css` and `App.css` names.

Most component files have one default-exported public component:

```jsx
export default function GlassCard({ children, className }) {
  return <div className={cn("engineering-panel", className)}>{children}</div>;
}
```

Named exports are used when a module intentionally exposes multiple related APIs, as with `Button`/`buttonVariants`, `Badge`, `cn`, and data constants.

## Component responsibilities

Use these layers:

```text
ui          primitive styling and native-control wrapping
shared      cross-feature visual or behavioral component
cards       reusable content schema
layout      page shell and navigation structure
portfolio   complete section composition
```

Keep data out of visual components. Portfolio content lives in `src/constants/` and is mapped into components. Keep external operations out of components; `ContactForm` calls `sendContactMessage` from `src/services/`.

## Props

- Destructure props in the function signature.
- Provide defaults for optional booleans, arrays, delays, sizes, and empty class strings.
- Use `className` for caller extension and `*ClassName` for distinct internal slots.
- Pass a structured object when a card represents a content record (`project`, `certificate`, `technology`).
- Use optional rendering for absent data instead of placeholder strings.

```jsx
export default function Reveal({ children, className, delay = 0, yOffset = 18 }) {
  // ...
}
```

The codebase has no TypeScript and no PropTypes. Prop contracts currently live in signatures, data shape, and this documentation; adding automated prop/schema validation would be a separate project decision.

## Hooks

- Put reusable browser/state behavior in `src/hooks/`.
- Prefix hook names with `use` and default-export them.
- Clean up event listeners, observers, animation frames, timeouts, and external instances in effects.
- Guard browser globals when a hook may initialize outside the browser.
- Keep motion preference handling centralized through `usePrefersReducedMotion` where possible.

```js
useEffect(() => {
  window.addEventListener("scroll", requestUpdate, { passive: true });
  return () => window.removeEventListener("scroll", requestUpdate);
}, []);
```

Use `useRef` for mutable timer/cancellation state that should not render. Use requestAnimationFrame to throttle high-frequency scroll updates, as in `useScrollProgress` and `BackToTopButton`.

## Constants

- Store portfolio records in named camelCase exports: `projects`, `experiences`, `capabilityGroups`.
- Use uppercase snake case for local timing constants: `TYPE_SPEED`, `CTA_DELAY`.
- Keep display data serializable where possible.
- Use stable content keys (`title`, `href`, `name`) when mapping.

```js
export const navigationLinks = [/* ... */];
```

## Services

Services expose async named functions and own environment configuration, request construction, response checks, and operational errors.

```js
export async function sendContactMessage(payload) {
  const endpoint = import.meta.env.VITE_CONTACT_API_URL;
  if (!endpoint) throw new Error("Contact API endpoint is not configured");
  // fetch and response validation
}
```

Components own UI status and user-facing feedback; services throw errors rather than manipulating component state.

## Utilities and library helpers

`src/lib/utils.js` contains the generic `cn()` helper, combining `clsx` conditional classes with `tailwind-merge` conflict resolution.

```js
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

Use `cn()` for conditional variants or caller overrides. A static class string does not need it. `src/utils/` holds project mappings such as `IconMap`, not generic styling helpers.

## Import order

The dominant order is:

1. React and third-party packages.
2. Blank line.
3. Internal components.
4. Internal constants, hooks, services, utilities, and library helpers.
5. Stylesheet side effects last when present.

```jsx
import { useState } from "react";
import { Send } from "lucide-react";

import GlassCard from "@/components/shared/GlassCard";
import { Button } from "@/components/ui/button";
import { sendContactMessage } from "@/services/contactService";
```

Use the `@/` alias for source imports. Vite also defines `@components`, `@utils`, `@assets`, and `@styles`, but current components consistently use `@/`; preserve that convention.

## JSX conventions

- Use semantic HTML before generic containers.
- Use self-closing syntax when an element has no children.
- Use early returns for absent collections or loading-independent empty sections.
- Use `&&` for optional blocks and ternaries for mutually exclusive states.
- Put `key` on the mapped component's outer element using stable content, not an index where stable data exists.
- Hide decorative icons/glyphs with `aria-hidden="true"`.
- Give external links `target="_blank"` and `rel="noreferrer"` together.
- Use native button/link behavior rather than clickable noninteractive elements.

```jsx
{skills.length > 0 && (
  <div className="flex flex-wrap gap-2">
    {skills.map((skill) => <Badge key={skill}>{skill}</Badge>)}
  </div>
)}
```

## Styling conventions

- Use Tailwind utilities in JSX for component-specific layout.
- Use semantic theme utilities (`bg-card`, `text-accent`, `border-border`) instead of raw colors.
- Use named CSS patterns from `App.css` for recurring motifs.
- Compose conditional class names with `cn()` or CVA for real variants.
- Keep responsive classes mobile-first.
- Keep arbitrary values limited to genuine design values already present, such as tracking, asymmetric grids, and viewport calculations.

Use CVA for multi-variant primitives (`Button`, `Badge`), not for one-off section layouts.

## Folder organization for new work

| New code | Location |
| --- | --- |
| Generic styled control | `src/components/ui/` |
| Cross-section visual/behavior | `src/components/shared/` |
| Reusable content record | `src/components/cards/` |
| Page shell/navigation | `src/components/layout/` |
| Portfolio section | `src/components/portfolio/` |
| Reusable browser behavior | `src/hooks/` |
| Static portfolio content | `src/constants/` |
| External request/business boundary | `src/services/` |
| Generic helper | `src/lib/` |
| Project-specific map/transform | `src/utils/` |

## Quality checks

The configured commands are:

```sh
npm run lint
npm run build
```

There is no test script or component-preview environment in the current repository. For visual changes, manually verify responsive widths, keyboard operation, reduced motion, remote-image fallbacks, loading states, and contact feedback in addition to lint/build.

Formatting is not enforced by a checked-in formatter and spacing style is not perfectly uniform across current files. Match the surrounding file, keep ESLint clean, and avoid broad formatting rewrites in functional changes.

