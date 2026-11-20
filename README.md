# Apex Design System — Core Design Tokens

A foundational design system built with **React** and **Vite** that establishes a **single source of truth** for brand colors, typography, and spacing tokens. All design tokens are defined in `tokens.json`, mapped to global CSS custom properties in `src/styles/tokens.css`, and showcased through a clean, responsive Light/Dark mode demo page.

🔗 **Live Demo:** [https://jawadiftikhar-dev.github.io/design-system/](https://jawadiftikhar-dev.github.io/design-system/)

---

## ✨ Features

- **Single Source of Truth (`tokens.json`):** Structured JSON definitions for brand/semantic/neutral colors, font families, modular type scale, font weights, and 4px-based spacing tokens.
- **Global CSS Variables (`src/styles/tokens.css`):** Maps every token to `:root` custom properties along with `[data-theme="dark"]` overrides.
- **Light & Dark Mode Toggle:** Defaults to a crisp **Light Mode** with instant, smooth switching to **Dark Mode**.
- **Interactive Token Showcase:**
  - **Colors:** Visual swatches grouped by Brand, Semantic, and Neutral palettes with hex values and CSS variable names.
  - **Fonts & Typography:** Live specimens for `Plus Jakarta Sans` and `JetBrains Mono`, modular type scale (`xs` to `4xl`), and font weights (`400`–`700`).
  - **Spacing:** Proportional visual bars rendered directly using CSS spacing variables (`--space-1` to `--space-16`).
- **Click-to-Copy:** Click any color swatch or spacing card to copy its `var(--token)` reference to your clipboard.

---

## 📁 Project Structure

```text
design-system/
├── index.html               # Loads Google Fonts & sets default light theme
├── package.json             # Project scripts including GitHub Pages deployment
├── tokens.json              # Single source of truth for colors, fonts, and spacing
├── vite.config.js           # Vite configuration with GitHub Pages base path
└── src/
    ├── styles/
    │   └── tokens.css       # Global CSS variables (:root & [data-theme="dark"])
    ├── App.css              # Responsive showcase styles using CSS variables
    ├── App.jsx              # Visual token grid & Light/Dark mode toggle
    ├── index.css            # Base reset & global stylesheet import
    └── main.jsx             # React entry point

🚀 Getting Started

Prerequisites

  - Node.js (v18 or higher recommended)
  - npm (comes with Node.js)

Local Development

1.  Clone the repository:

    git clone https://github.com/jawadiftikhar-dev/design-system.git
    cd design-system

2.  Install dependencies:

    npm install

3.  Start the development server:

    npm run dev

4.  Open the local URL shown in your terminal (typically
    http://localhost:5173/design-system/).

🎨 Token Overview

1. JSON Tokens (tokens.json)

All core values live in tokens.json under three main sections:

  - colors (brand, semantic, neutral)
  - fonts (families, sizes, weights)
  - spacing (1 through 16)

2. CSS Variables (src/styles/tokens.css)

Use the tokens anywhere in your CSS:

.card {
  background-color: var(--bg-surface);
  color: var(--text-primary);
  border: 1px solid var(--border-subtle);
  padding: var(--space-6);
  font-family: var(--font-sans);
  font-size: var(--text-base);
}

.button-primary {
  background-color: var(--color-brand-primary);
  color: var(--color-neutral-white);
}

📦 Build & Deploy to GitHub Pages

To create a production build and deploy to the gh-pages branch:

npm run build
npm run deploy

npm run deploy automatically runs npm run build via predeploy and publishes the
dist/ directory to GitHub Pages.

✅ Checklist

- [x] Repository includes tokens.json with colors, fonts, and spacing
- [x] Global CSS variables defined in src/styles/tokens.css
- [x] Demo page visually displays all token values in clean responsive grids
- [x] Light/Dark mode toggle (Light mode by default)
- [x] Deployed to GitHub Pages

👤 Author

Jawad Iftikhar
GitHub: @jawadiftikhar-dev

