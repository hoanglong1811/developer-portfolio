# Engineering Portfolio

> A reusable, engineering-inspired portfolio template built with React, Vite, Tailwind CSS v4, and Motion.

Engineering Portfolio is a dark, terminal-influenced personal site for developers who want a structured way to present their profile, skills, experience, projects, education, certificates, and contact details. The implementation is component-driven, responsive from 320 px upward, deploys the static frontend through GitHub Pages, and connects the contact form to an external Cloudflare Worker/Resend email API.

## Live Demo

The repository is configured for the following custom domain:

**https://hlongdev.com**

## Preview

Screenshots are not currently included in the repository.

| View    | Preview                                                  |
| ------- | -------------------------------------------------------- |
| Desktop | Add a desktop screenshot after customizing the template. |
| Mobile  | Add a mobile screenshot after customizing the template.  |

## Features

- Full-screen startup terminal with typed commands and a staged portfolio reveal.
- Hero typewriter sequence for profile, role, summary, email, and location.
- Dark engineering interface with grid textures, terminal markers, bordered panels, and HUD-style metadata.
- Responsive header with a mobile/tablet dialog menu and desktop contact action.
- Desktop table of contents with active-section tracking and reading progress.
- Scroll-triggered section and capability-row animations.
- Reduced-motion handling for startup, typewriter, reveal, and loading behavior.
- Responsive project showcase with featured-card layouts based on project count.
- Experience timeline, skills matrix, education record, and grouped certificate cards.
- Contact form with loading, success, and error states.
- External contact API boundary designed for Cloudflare Workers and Resend.
- Configurable resume download action.
- Semantic sections, labeled controls, keyboard focus styles, and ARIA state for navigation and live feedback.
- GitHub Pages deployment workflow and custom-domain support.
- Maintained, code-derived [design system documentation](docs/design-system/README.md).

> [!NOTE]
> The hero and projects intentionally render engineering-style placeholders when image values are empty. The current `profile.cvHref` also expects a resume file that is not present in this working tree. Add your media and resume before publishing a fork.

## Tech Stack

| Category         | Technologies                                                   |
| ---------------- | -------------------------------------------------------------- |
| Frontend         | React 19, Vite 8, Tailwind CSS v4                              |
| UI and motion    | Motion, Lenis, Lucide React, Base UI, Class Variance Authority |
| Contact delivery | Cloudflare Workers, Resend                                     |
| Deployment       | GitHub Pages, GitHub Actions, Cloudflare DNS/Worker routing    |
| Development      | npm, ESLint, React Compiler                                    |

Tailwind is configured through `@tailwindcss/vite` and the `@theme inline` block in `src/styles/index.css`; there is no JavaScript `tailwind.config.*` file.

## Project Structure

```text
.
├── .github/workflows/       # GitHub Pages build and deployment
├── docs/design-system/      # Visual, component, motion, and coding conventions
├── public/                  # Static files copied directly into the Vite build
├── workers/contact-worker/  # Cloudflare Worker contact API and Wrangler config
├── src/
│   ├── assets/              # Local images and downloadable assets
│   ├── components/
│   │   ├── cards/           # Project, certificate, highlight, and timeline cards
│   │   ├── layout/          # Header, navigation, section frame, ToC, and footer
│   │   ├── portfolio/       # Complete portfolio sections
│   │   ├── shared/          # Reusable visual and behavioral components
│   │   └── ui/              # Button, badge, and field primitives
│   ├── constants/           # Profile and portfolio content records
│   ├── hooks/               # Motion, typewriter, scroll, and navigation behavior
│   ├── lib/                 # Generic helpers such as cn()
│   ├── services/            # Frontend service boundaries, including contact API calls
│   ├── styles/              # Theme variables and engineering visual patterns
│   └── utils/               # Project-specific mappings such as IconMap
├── CNAME                    # Configured GitHub Pages custom domain
├── package.json
└── vite.config.js
```

`workers/contact-worker/` contains the Worker entry point and Wrangler configuration. Local secrets are loaded from its ignored `.dev.vars` file.

## Getting Started

### Prerequisites

- Node.js 24, matching the GitHub Actions workflow.
- npm, included with Node.js.

### Clone and install

```bash
git clone https://github.com/hoanglong1811/my-portfolio.git
cd my-portfolio
npm install
```

### Run locally

```bash
npm run dev
```

Vite prints the local development URL, normally `http://localhost:5173`.

### Build and preview

```bash
npm run build
npm run preview
```

The production output is written to `dist/`.

### Available scripts

| Command           | Purpose                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------- |
| `npm run dev`     | Start the Vite development server.                                                      |
| `npm run build`   | Create a production build in `dist/`.                                                   |
| `npm run preview` | Serve the production build locally.                                                     |
| `npm run lint`    | Run ESLint across the repository.                                                       |
| `npm run deploy`  | Run the production build command. GitHub Pages deployment itself is handled by Actions. |

- `npm run worker:dev` starts the local contact Worker through Wrangler.
- `npm run worker:deploy` deploys the contact Worker through Wrangler.

## Environment Variables

Create `.env.local` in the repository root for frontend development:

```env
VITE_CONTACT_API_URL=https://api.example.com/contact
```

| Variable               | Runtime           | Required for       | Description                                                                                                                       |
| ---------------------- | ----------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_CONTACT_API_URL` | Vite frontend     | Contact form       | Full HTTPS URL that accepts the contact form's JSON `POST` request. Vite embeds this value in the client bundle, so it is public. |
| `RESEND_API_KEY`       | Cloudflare Worker | Email delivery     | Secret Resend API key. Store it as an encrypted Worker secret; never use a `VITE_` prefix.                                        |
| `CONTACT_TO_EMAIL`     | Cloudflare Worker | Owner notification | Destination inbox for new portfolio messages.                                                                                     |
| `CONTACT_FROM_EMAIL`   | Cloudflare Worker | Email delivery     | Verified Resend sender, including the display name when desired.                                                                  |
| `CORS_ALLOWED_ORIGINS` | Cloudflare Worker | Browser access     | Comma-separated frontend origins allowed to call the contact endpoint, including local development and production domains.        |

Do not commit real API keys or private environment files. Only `VITE_CONTACT_API_URL` belongs in frontend configuration.

## Contact Form Architecture

```text
Portfolio frontend (GitHub Pages)
        │
        │ POST { name, email, subject, message }
        ▼
Cloudflare Worker contact endpoint
        │
        │ authenticated server-side request
        ▼
Resend API
        │
        ├── owner notification
        └── visitor confirmation email
```

`ContactForm.jsx` owns form state and calls `sendContactMessage()` from `src/services/contactService.js`. The service reads `VITE_CONTACT_API_URL`, sends JSON, and converts non-successful responses into UI error feedback.

The frontend must never receive `RESEND_API_KEY`. A Worker or equivalent server-side endpoint validates the request, applies CORS and abuse controls, and communicates with Resend using the secret key.

> [!IMPORTANT]
> `workers/contact-worker/.dev.vars` contains local-only values and is ignored by Git. Replace its placeholder Resend key locally before testing real email delivery; never commit that file.

## Deployment

### GitHub Pages

The checked-in `.github/workflows/deploy.yml` runs when `main` is pushed. It uses Node.js 24, installs dependencies with `npm ci`, runs `npm run build`, uploads `dist/`, and deploys through GitHub Pages.

1. Fork the repository.
2. In **Settings → Pages**, select **GitHub Actions** as the source.
3. Customize the site and push to `main`.
4. Review the `Deploy to GitHub Pages` workflow run.

If the contact form is enabled, create a GitHub Actions repository variable named `VITE_CONTACT_API_URL` and expose it to the existing build step:

```yaml
- name: Build
  env:
    VITE_CONTACT_API_URL: ${{ vars.VITE_CONTACT_API_URL }}
  run: npm run build
```

The current workflow does not inject this variable automatically.

### Cloudflare Worker and Resend

Deploy the contact API separately from the static frontend:

1. Review the Worker implementation and `workers/contact-worker/wrangler.toml` configuration.
2. Configure `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, and `CORS_ALLOWED_ORIGINS` as Worker variables.
3. Store `RESEND_API_KEY` as a Cloudflare Worker secret, not plain text configuration.
4. Verify the sender domain in Resend.
5. Deploy the Worker and optionally attach an API custom domain.
6. Set the resulting `/contact` URL as the frontend's `VITE_CONTACT_API_URL`.
7. Submit the form from both local and production origins.

Refer to the official [Cloudflare Workers secret documentation](https://developers.cloudflare.com/workers/configuration/secrets/) and [Resend Cloudflare Worker guide](https://resend.com/docs/send-with-cloudflare-workers/) when deploying the Worker.

### Custom domain

The current frontend domain is declared as `hlongdev.com` in both `CNAME` and `public/CNAME`.

For a fork:

1. Replace both files with your domain, or remove them when using the default `github.io` address.
2. Add the same domain in **Settings → Pages**.
3. Configure the required DNS records with your DNS provider.
4. Enable HTTPS after GitHub verifies the domain.
5. Add the final origin to the Worker's `CORS_ALLOWED_ORIGINS`.

Use GitHub's [custom-domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) for the current DNS record values rather than copying stale addresses from third-party guides.

## Customization Guide

Most portfolio content is data-driven and can be replaced without changing component structure.

| What to customize                                              | File or location                  |
| -------------------------------------------------------------- | --------------------------------- |
| Name, role, summary, email, location, social links, resume URL | `src/constants/profile.js`        |
| About highlight cards                                          | `src/constants/profile.js`        |
| Navigation labels and section anchors                          | `src/constants/navigation.js`     |
| Skill groups, responsibilities, and technology logos           | `src/constants/skills.js`         |
| Work experience and timeline responsibilities                  | `src/constants/experience.js`     |
| Projects, stack, links, metrics, and image values              | `src/constants/projects.js`       |
| Education record                                               | `src/constants/education.js`      |
| Certificates, issuers, skills, logos, and credential URLs      | `src/constants/certificates.js`   |
| Startup terminal commands and output                           | `src/hooks/useStartupTerminal.js` |
| Contact API client contract                                    | `src/services/contactService.js`  |
| Theme colors, fonts, and radius tokens                         | `src/styles/index.css`            |
| Engineering panels, grid, labels, and technical copy           | `src/styles/App.css`              |
| Custom domain                                                  | `CNAME` and `public/CNAME`        |

### Resume and images

- Update `profile.cvHref` and add your resume at the referenced location.
- Set each project's `image` value or keep the built-in engineering placeholder.
- Replace `src/assets/images/education.png` with your institution asset if needed.
- Replace remote technology, contact, and certificate logo URLs when they do not match your content.
- Replace all personal email addresses, phone numbers, profile URLs, and domain references before publishing.

For visual rules, component contracts, spacing, motion, and accessibility guidance, read the [Design System](docs/design-system/README.md).

## Using This Template

You are welcome to use this repository as a starting point for your own portfolio. Under the MIT License, you may:

- fork or clone the repository;
- replace the personal content;
- modify or redesign the interface;
- add sections and components;
- deploy it to your preferred hosting platform;
- extend the contact and content architecture.

Replace all personal information, assets, credentials, domains, analytics identifiers, and contact configuration before publishing. Keeping the original engineering visual language is optional; the component and token structure is intended to support redesigns.

## Contributing

Contributions are welcome, including:

- UI and UX improvements;
- performance optimization;
- accessibility fixes;
- responsive-layout improvements;
- bug fixes;
- documentation corrections;
- reusable components;
- well-scoped features.

For substantial behavior, architecture, or design changes, open an Issue first so the proposed direction can be discussed.

```text
Fork
  ↓
Create a feature branch
  ↓
Implement and validate the change
  ↓
Commit with a clear message
  ↓
Open a pull request
```

Suggested workflow:

```bash
git checkout -b feat/short-description
npm install
npm run build
npm run lint
git commit -m "feat: describe the change"
```

Pull requests should explain the problem, the chosen solution, affected responsive states, and any accessibility or deployment implications. Include screenshots for visual changes.

## License

This project is available under the [MIT License](LICENSE). It is intentionally licensed for community reuse, modification, distribution, and extension, subject to the license terms.
