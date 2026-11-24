# Apex Design System

A clean, modern Design System foundation built with **React**, **Vite**, **JSON design tokens**, and **global CSS variables**. It serves as a single source of truth for brand colors, typography, and spacing, accompanied by an interactive Light/Dark mode visual showcase.

🔗 **Live Demo:** [https://jawadiftikhar-dev.github.io/design-system/](https://jawadiftikhar-dev.github.io/design-system/)  
📦 **Repository:** [https://github.com/jawadiftikhar-dev/design-system](https://github.com/jawadiftikhar-dev/design-system)

---

## ✨ Features

- **Single Source of Truth (`tokens.json`)** — Structured JSON definitions for colors, font families, type scale, font weights, and spacing tokens.
- **Global CSS Custom Properties (`src/styles/tokens.css`)** — Every token mapped cleanly to CSS variables under `:root` and `[data-theme="dark"]`.
- **Light & Dark Mode Toggle** — Defaults to Light Mode with smooth theme switching and semantic surface/text variables.
- **Visual Token Showcase**:
  - **Colors:** Brand, semantic, and neutral swatches rendered with live CSS variables.
  - **Fonts & Typography:** Font family specimens (`Plus Jakarta Sans` & `JetBrains Mono`), modular type scale (`xs` to `4xl`), and font weights.
  - **Spacing:** 4px-based spacing scale visualized proportionally with usage guidelines.
- **Click-to-Copy** — Click any color swatch or spacing card to copy its `var(--token-name)` directly to your clipboard.

---

## 📁 Project Structure

```text
design-system/
├── public/
├── src/
│   ├── styles/
│   │   └── tokens.css      # Global CSS variables (Light & Dark themes)
│   ├── App.css             # Showcase layout & component styles
│   ├── App.jsx             # Interactive Design System demo page
│   ├── index.css           # Base resets & global stylesheet import
│   └── main.jsx            # React entry point
├── tokens.json             # Single source of truth for design tokens
├── index.html              # HTML entry + Google Fonts
├── package.json            # Dependencies & GitHub Pages deploy scripts
└── vite.config.js          # Vite config with GitHub Pages base path
```

---

## 🛠️ Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- CSS Custom Properties (CSS Variables)
- [gh-pages](https://www.npmjs.com/package/gh-pages) for deployment

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/jawadiftikhar-dev/design-system.git
cd design-system
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open `http://localhost:5173/design-system/` in your browser.

### 4. Build for Production

```bash
npm run build
```

---

## 🎨 Using the Design Tokens

### In CSS

All tokens are available globally via `src/styles/tokens.css`:

```css
.card {
  background-color: var(--bg-surface);
  color: var(--text-primary);
  padding: var(--space-6);
  border: 1px solid var(--border-subtle);
  font-family: var(--font-sans);
  font-size: var(--text-base);
}

.button-primary {
  background-color: var(--color-brand-primary);
  color: var(--color-neutral-white);
  padding: var(--space-3) var(--space-5);
}
```

### In JavaScript / React

Import `tokens.json` directly when you need programmatic access to raw values:

```jsx
import tokens from '../tokens.json'

console.log(tokens.colors.brand.primary.value) // "#4F46E5"
console.log(tokens.spacing['4'].px)            // "16px"
```

---

## 🌐 Deployment (GitHub Pages)

This repository is configured to deploy automatically to the `gh-pages` branch using `gh-pages`:

```bash
npm run deploy
```

Ensure **Settings → Pages** in your GitHub repository is set to deploy from the `gh-pages` branch (`/ (root)`).

---

## 🧩 Core Components

All form building blocks are exported from `src/components/index.js`:

```jsx
import { Button, Input, Select } from './components'

## ✅ Checklist

- [x] `tokens.json` file with colors, fonts, and spacing
- [x] Demo page displaying token values visually in responsive grids
- [x] CSS variables defined in a global stylesheet (`src/styles/tokens.css`)
- [x] Light/Dark theme toggle (Light Mode by default)
- [x] Deployed to GitHub Pages

---

## 👤 Author

**Jawad Iftikhar**  
GitHub: [@jawadiftikhar-dev](https://github.com/jawadiftikhar-dev)