import { useEffect, useState } from 'react'
import tokens from '../tokens.json'
import './App.css'

export default function App() {
  // Light mode by default
  const [theme, setTheme] = useState('light')
  const [copiedMsg, setCopiedMsg] = useState('')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text)
    setCopiedMsg(`Copied ${text}`)
    setTimeout(() => setCopiedMsg(''), 2000)
  }

  const colorGroups = [
    { title: 'Brand & Accent', entries: Object.entries(tokens.colors.brand) },
    { title: 'Semantic Status', entries: Object.entries(tokens.colors.semantic) },
    { title: 'Neutral Surfaces & Text', entries: Object.entries(tokens.colors.neutral) },
  ]

  const totalColors = colorGroups.reduce((sum, group) => sum + group.entries.length, 0)
  const fontScaleEntries = Object.entries(tokens.fonts.sizes)
  const fontFamilyEntries = Object.entries(tokens.fonts.families)
  const fontWeightEntries = Object.entries(tokens.fonts.weights)
  const spacingEntries = Object.entries(tokens.spacing)

  return (
    <div className="ds-app">
      {/* Sticky Header */}
      <header className="ds-navbar">
        <div className="ds-container ds-navbar-inner">
          <a href="#top" className="ds-brand">
            <div className="ds-brand-mark">A</div>
            <span className="ds-brand-title">{tokens.meta.name}</span>
            <span className="ds-brand-badge">v{tokens.meta.version}</span>
          </a>

          <nav className="ds-nav-links" aria-label="Token sections">
            <a href="#colors">Colors</a>
            <a href="#fonts">Fonts</a>
            <a href="#spacing">Spacing</a>
          </nav>

          <button
            type="button"
            className="ds-theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle light or dark theme"
          >
            <span>{theme === 'light' ? '🌙' : '☀️'}</span>
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <main id="top">
        <section className="ds-hero">
          <div className="ds-container">
            <span className="ds-hero-eyebrow">Single Source of Truth</span>
            <h1 className="ds-hero-title">
              Core Design Tokens for Consistent Product Craft
            </h1>
            <p className="ds-hero-subtitle">
              {tokens.meta.description} Defined in <code>tokens.json</code> and mapped to global
              CSS variables. Click any token card to copy its CSS variable.
            </p>

            <div className="ds-stats-grid">
              <div className="ds-stat-card">
                <div className="ds-stat-value">{totalColors}</div>
                <div className="ds-stat-label">Color Tokens</div>
              </div>
              <div className="ds-stat-card">
                <div className="ds-stat-value">
                  {fontFamilyEntries.length} / {fontScaleEntries.length}
                </div>
                <div className="ds-stat-label">Font Families &amp; Type Steps</div>
              </div>
              <div className="ds-stat-card">
                <div className="ds-stat-value">{spacingEntries.length}</div>
                <div className="ds-stat-label">Spacing Scale Tokens</div>
              </div>
            </div>
          </div>
        </section>

        {/* Colors Section */}
        <section id="colors" className="ds-section">
          <div className="ds-container">
            <div className="ds-section-header">
              <div>
                <h2 className="ds-section-title">Colors</h2>
                <p className="ds-section-desc">
                  Brand, semantic, and neutral swatches rendered using live CSS custom properties.
                </p>
              </div>
            </div>

            {colorGroups.map((group) => (
              <div key={group.title}>
                <h3 className="ds-group-heading">{group.title}</h3>
                <div className="ds-color-grid">
                  {group.entries.map(([key, token]) => (
                    <button
                      key={key}
                      type="button"
                      className="ds-color-card"
                      onClick={() => handleCopy(`var(${token.cssVar})`)}
                      title={`Click to copy var(${token.cssVar})`}
                    >
                      <div
                        className="ds-color-swatch"
                        style={{ backgroundColor: `var(${token.cssVar})` }}
                      >
                        <span className="ds-copy-pill">Copy var()</span>
                      </div>
                      <div className="ds-color-meta">
                        <div className="ds-color-top">
                          <span className="ds-token-name">{key}</span>
                          <span className="ds-token-hex">{token.value}</span>
                        </div>
                        <code className="ds-token-var">{token.cssVar}</code>
                        <p className="ds-token-desc">{token.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fonts Section */}
        <section id="fonts" className="ds-section">
          <div className="ds-container">
            <div className="ds-section-header">
              <div>
                <h2 className="ds-section-title">Fonts &amp; Typography</h2>
                <p className="ds-section-desc">
                  Font families, modular type scale, and weights applied via CSS variables.
                </p>
              </div>
            </div>

            <h3 className="ds-group-heading">Font Families</h3>
            <div className="ds-font-families-grid">
              {fontFamilyEntries.map(([key, token]) => (
                <div
                  key={key}
                  className="ds-font-family-card"
                  style={{ fontFamily: `var(${token.cssVar})` }}
                >
                  <div className="ds-color-top">
                    <span className="ds-token-name">{token.label}</span>
                    <code className="ds-token-hex">{token.cssVar}</code>
                  </div>
                  <div className="ds-font-specimen">Aa Bb Cc 0123</div>
                  <p className="ds-font-charset">
                    ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 !@#$%
                  </p>
                  <p className="ds-token-desc">{token.description}</p>
                </div>
              ))}
            </div>

            <h3 className="ds-group-heading">Type Scale</h3>
            <div className="ds-type-scale-list">
              {fontScaleEntries.map(([key, token]) => (
                <div key={key} className="ds-type-row">
                  <div className="ds-type-meta">
                    <span className="ds-token-name">text-{key}</span>
                    <code className="ds-token-var">{token.cssVar}</code>
                    <span className="ds-type-specs">
                      {token.value} ({token.px})
                    </span>
                  </div>
                  <div
                    className="ds-type-sample"
                    style={{ fontSize: `var(${token.cssVar})` }}
                  >
                    {token.sample}
                  </div>
                </div>
              ))}
            </div>

            <h3 className="ds-group-heading">Font Weights</h3>
            <div className="ds-weights-grid">
              {fontWeightEntries.map(([key, token]) => (
                <div key={key} className="ds-weight-card">
                  <div className="ds-color-top">
                    <span className="ds-token-name">{key}</span>
                    <span className="ds-token-hex">{token.value}</span>
                  </div>
                  <code className="ds-token-var">{token.cssVar}</code>
                  <p
                    style={{
                      fontWeight: `var(${token.cssVar})`,
                      fontSize: 'var(--text-lg)',
                      marginTop: 'var(--space-2)',
                    }}
                  >
                    Design Systems Scale
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Spacing Section */}
        <section id="spacing" className="ds-section">
          <div className="ds-container">
            <div className="ds-section-header">
              <div>
                <h2 className="ds-section-title">Spacing</h2>
                <p className="ds-section-desc">
                  4px-based spatial rhythm tokens visualized proportionally using their CSS variables.
                </p>
              </div>
            </div>

            <div className="ds-spacing-grid">
              {spacingEntries.map(([key, token]) => (
                <div
                  key={key}
                  className="ds-spacing-card"
                  onClick={() => handleCopy(`var(${token.cssVar})`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleCopy(`var(${token.cssVar})`)
                    }
                  }}
                >
                  <div className="ds-spacing-header">
                    <span className="ds-token-name">space-{key}</span>
                    <span className="ds-token-hex">
                      {token.px} / {token.value}
                    </span>
                  </div>
                  <code className="ds-token-var">{token.cssVar}</code>
                  <div className="ds-spacing-visual-wrap">
                    <div
                      className="ds-spacing-bar"
                      style={{ width: `var(${token.cssVar})` }}
                    />
                  </div>
                  <p className="ds-token-desc">{token.usage}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="ds-footer">
        <div className="ds-container">
          Built with React + Vite • Tokens sourced from <code>tokens.json</code> &amp;{' '}
          <code>src/styles/tokens.css</code>
        </div>
      </footer>

      {copiedMsg && <div className="ds-toast">{copiedMsg}</div>}
    </div>
  )
}