# Akash Aakula Portfolio

A premium personal portfolio built with Next.js, React, Tailwind CSS, Framer Motion, Three.js, and custom WebGL shader effects. The site presents Akash Aakula as an AI/ML engineer, data scientist, full-stack developer, and DevOps-focused builder through a polished single-page experience.

## Live Demo

Available at [https://portfolio-pi-livid-lni8rjwhws.vercel.app/](https://portfolio-pi-livid-lni8rjwhws.vercel.app/)



## Preview




### Home Page

<img src="./public/readme-assets/home-page.png" alt="Akash Aakula portfolio home page" width="900" />



## Highlights

- Animated hero section with role switching, magnetic calls to action, shader ambience, and resume download.
- Full-screen intro loader with a WebGL shader backdrop and progress animation.
- Responsive navigation with desktop header and mobile bottom nav.
- About, skills, featured projects, GitHub activity, experience, startup ventures, and contact sections.
- Interactive project case studies with modal previews, screenshots, stack details, and links.
- GitHub dashboard powered by public API routes for profile stats and contribution activity.
- Motion system using Framer Motion and GSAP-friendly scroll reveal patterns.
- Custom visual system with glass panels, ash clouds, aurora layers, cursor glow, and shader backgrounds.

## Tech Stack

- **Framework:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS, custom global CSS, responsive design tokens
- **Animation:** Framer Motion, GSAP
- **3D / Visuals:** Three.js, React Three Fiber, Drei, WebGL shaders
- **Icons:** Lucide React
- **Data:** Next.js route handlers for GitHub profile and contribution data


## Project Structure

```txt
app/
  api/
    github-contributions/   Public contribution activity endpoint
    github-profile/         Public GitHub profile stats endpoint
  globals.css               Global theme, utilities, and visual effects
  layout.tsx                Root metadata and HTML shell
  loading.tsx               Route loading screen
  page.tsx                  Main portfolio page
  template.tsx              Intro loader wrapper

components/
  loader-visual.tsx         Shader-backed loading experience
  shader-backdrop.tsx       WebGL canvas shader background
  project-showcase.tsx      Featured project cards and modal previews
  github-dashboard.tsx      GitHub profile summary UI
  github-contribution-graph.tsx
  contact-form.tsx
  ...                       UI, animation, and visual components

public/
  Aakula_Akash_ATS_Optimized_Resume.docx
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the local development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

Build for production:

```bash
npm run build
```

Start the production build locally:

```bash
npm run start
```

## Deployment

This project is ready for deployment on Vercel or any platform that supports Next.js.

No required environment variables are currently needed. The GitHub dashboard uses public endpoints:

- `https://api.github.com/users/{username}`
- `https://api.github.com/users/{username}/repos`
- `https://github.com/users/{username}/contributions`

Because these are public, the dashboard can be rate-limited by GitHub under heavy traffic. If the site receives significant traffic, add a GitHub token and update the API route headers to use authenticated requests.

## Notes

- The bottom-left Next.js development indicator is disabled in `next.config.ts`.
- The shader effects use WebGL. If WebGL is unavailable, the page still renders the fallback layout, text, glow layers, and progress UI.
- The intro loader is mounted through `app/template.tsx`, so it appears during client-side route initialization.
- The resume download points to `public/Aakula_Akash_ATS_Optimized_Resume.docx`.

## Available Scripts

```bash
npm run dev      # Start the Next.js development server
npm run build    # Create a production build
npm run start    # Start the production server
npm run lint     # Run Next.js lint command
```

## Customization Checklist

- Update profile copy, roles, skills, projects, ventures, and timeline data in `app/page.tsx`.
- Replace or update the resume file in `public/`.
- Adjust theme colors in `tailwind.config.ts`.
- Tune global effects, panels, and background layers in `app/globals.css`.
- Modify shader behavior in `components/shader-backdrop.tsx`.
