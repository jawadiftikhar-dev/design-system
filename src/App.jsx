import { useEffect, useRef, useState } from 'react'
import tokens from '../tokens.json'
import './App.css'
import {
  Button,
  Card,
  Input,
  Modal,
  Select,
  Toast,
  useToast,
} from './components'

export default function App() {
  // Light mode by default
  const [theme, setTheme] = useState('light')

  // Interactive Form Playground state
  const [formValues, setFormValues] = useState({
    fullName: '',
    email: '',
    role: '',
  })
  const [formErrors, setFormErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  // Modal states
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [modalNote, setModalNote] = useState('')
  const cancelConfirmRef = useRef(null)

  // Toast queue hook
  const { toasts, addToast, removeToast, clearAllToasts } = useToast()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text)
    addToast({
      title: 'Token Copied',
      message: `Copied ${text}`,
      variant: 'success',
      duration: 2500,
    })
  }

  const colorGroups = [
    { title: 'Brand & Accent', entries: Object.entries(tokens.colors.brand) },
    { title: 'Semantic Status', entries: Object.entries(tokens.colors.semantic) },
    {
      title: 'Neutral Surfaces & Text',
      entries: Object.entries(tokens.colors.neutral),
    },
  ]

  const totalColors = colorGroups.reduce(
    (sum, group) => sum + group.entries.length,
    0
  )
  const fontScaleEntries = Object.entries(tokens.fonts.sizes)
  const fontFamilyEntries = Object.entries(tokens.fonts.families)
  const fontWeightEntries = Object.entries(tokens.fonts.weights)
  const spacingEntries = Object.entries(tokens.spacing)

  const roleOptions = [
    { value: 'designer', label: 'Product Designer' },
    { value: 'frontend', label: 'Frontend Engineer' },
    { value: 'pm', label: 'Product Manager' },
  ]

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const nextErrors = {}

    if (!formValues.fullName.trim()) {
      nextErrors.fullName = 'Full name is required.'
    }
    if (!formValues.email.includes('@')) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (!formValues.role) {
      nextErrors.role = 'Please select a team role.'
    }

    setFormErrors(nextErrors)
    const isValid = Object.keys(nextErrors).length === 0
    setSubmitted(isValid)

    if (isValid) {
      addToast({
        title: 'Form Validated',
        message: 'All Mehfil form fields passed validation.',
        variant: 'success',
      })
    }
  }

  const handleFormReset = () => {
    setFormValues({ fullName: '', email: '', role: '' })
    setFormErrors({})
    setSubmitted(false)
  }

  const handleTriggerBurst = () => {
    addToast({
      title: 'Sync Started',
      message: 'Fetching latest design tokens...',
      variant: 'info',
    })
    addToast({
      title: 'Cache Warning',
      message: 'Local preview tokens are 1 version behind.',
      variant: 'warning',
    })
    addToast({
      title: 'Publish Complete',
      message: 'Mehfil UI kit updated cleanly.',
      variant: 'success',
    })
  }

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

          <nav className="ds-nav-links" aria-label="Token and component sections">
            <a href="#colors">Colors</a>
            <a href="#fonts">Fonts</a>
            <a href="#spacing">Spacing</a>
            <a href="#buttons">Buttons</a>
            <a href="#inputs">Inputs</a>
            <a href="#selects">Selects</a>
            <a href="#cards">Cards</a>
            <a href="#modals">Modals</a>
            <a href="#toasts">Toasts</a>
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

      <main id="top">
        {/* Hero */}
        <section className="ds-hero">
          <div className="ds-container">
            <span className="ds-hero-eyebrow">Single Source of Truth</span>
            <h1 className="ds-hero-title">
              Core Design Tokens &amp; Mehfil UI Components
            </h1>
            <p className="ds-hero-subtitle">
              {tokens.meta.description} Defined in <code>tokens.json</code>,
              mapped to global CSS variables, and used across accessible form,
              layout, and feedback components.
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
              <div className="ds-stat-card">
                <div className="ds-stat-value">6</div>
                <div className="ds-stat-label">Core UI Components</div>
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
                  Brand, semantic, and neutral swatches rendered using live CSS
                  custom properties.
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
                  Font families, modular type scale, and weights applied via CSS
                  variables.
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
                    ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz
                    0123456789 !@#$%
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
                  4px-based spatial rhythm tokens visualized proportionally using
                  their CSS variables.
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
                      e.preventDefault()
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

        {/* Buttons Section */}
        <section id="buttons" className="ds-section">
          <div className="ds-container">
            <div className="ds-section-header">
              <div>
                <h2 className="ds-section-title">Buttons</h2>
                <p className="ds-section-desc">
                  Primary, secondary, and ghost button variants across sizes and
                  interactive states.
                </p>
              </div>
            </div>

            <div className="ds-showcase-grid">
              <div className="ds-showcase-card">
                <div>
                  <h3 className="ds-showcase-card-title">Variants</h3>
                  <p className="ds-showcase-card-sub">
                    Hover or Tab onto buttons to inspect focus rings.
                  </p>
                </div>
                <div className="ds-btn-row">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
              </div>

              <div className="ds-showcase-card">
                <div>
                  <h3 className="ds-showcase-card-title">Sizes</h3>
                  <p className="ds-showcase-card-sub">
                    Small, Medium, and Large scale steps.
                  </p>
                </div>
                <div className="ds-btn-row">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>

              <div className="ds-showcase-card">
                <div>
                  <h3 className="ds-showcase-card-title">States</h3>
                  <p className="ds-showcase-card-sub">
                    Disabled and Error states.
                  </p>
                </div>
                <div className="ds-btn-row">
                  <Button variant="primary" disabled>
                    Disabled
                  </Button>
                  <Button variant="primary" error>
                    Error Primary
                  </Button>
                  <Button variant="secondary" error>
                    Error Secondary
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inputs Section */}
        <section id="inputs" className="ds-section">
          <div className="ds-container">
            <div className="ds-section-header">
              <div>
                <h2 className="ds-section-title">Inputs</h2>
                <p className="ds-section-desc">
                  Text inputs supporting labels, outline/filled variants, sizes,
                  and accessible error messages.
                </p>
              </div>
            </div>

            <div className="ds-showcase-grid">
              <div className="ds-showcase-card">
                <div>
                  <h3 className="ds-showcase-card-title">Variants</h3>
                  <p className="ds-showcase-card-sub">
                    Outline and Filled surface styles.
                  </p>
                </div>
                <div className="ds-form-stack">
                  <Input
                    label="Project Name (Outline)"
                    variant="outline"
                    placeholder="Mehfil Web App"
                    helperText="Default outline input style"
                  />
                  <Input
                    label="Workspace Slug (Filled)"
                    variant="filled"
                    placeholder="mehfil-design"
                  />
                </div>
              </div>

              <div className="ds-showcase-card">
                <div>
                  <h3 className="ds-showcase-card-title">Sizes</h3>
                  <p className="ds-showcase-card-sub">
                    Consistent heights matching Button tokens.
                  </p>
                </div>
                <div className="ds-form-stack">
                  <Input
                    label="Small"
                    size="sm"
                    placeholder="Small input (34px)"
                  />
                  <Input
                    label="Medium"
                    size="md"
                    placeholder="Medium input (42px)"
                  />
                  <Input
                    label="Large"
                    size="lg"
                    placeholder="Large input (50px)"
                  />
                </div>
              </div>

              <div className="ds-showcase-card">
                <div>
                  <h3 className="ds-showcase-card-title">States</h3>
                  <p className="ds-showcase-card-sub">
                    Validation error message and disabled state.
                  </p>
                </div>
                <div className="ds-form-stack">
                  <Input
                    label="Email Address"
                    type="email"
                    defaultValue="invalid-email"
                    error="Please enter a valid email address."
                  />
                  <Input
                    label="Read-only Token"
                    defaultValue="mehfil-prod-key"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Selects Section */}
        <section id="selects" className="ds-section">
          <div className="ds-container">
            <div className="ds-section-header">
              <div>
                <h2 className="ds-section-title">Selects</h2>
                <p className="ds-section-desc">
                  Accessible dropdown controls sharing size, variant, and error
                  states.
                </p>
              </div>
            </div>

            <div className="ds-showcase-grid">
              <div className="ds-showcase-card">
                <div>
                  <h3 className="ds-showcase-card-title">Variants</h3>
                  <p className="ds-showcase-card-sub">
                    Outline and Filled dropdowns.
                  </p>
                </div>
                <div className="ds-form-stack">
                  <Select
                    label="Department (Outline)"
                    variant="outline"
                    defaultValue=""
                    options={roleOptions}
                  />
                  <Select
                    label="Environment (Filled)"
                    variant="filled"
                    defaultValue="Production"
                    options={['Development', 'Staging', 'Production']}
                  />
                </div>
              </div>

              <div className="ds-showcase-card">
                <div>
                  <h3 className="ds-showcase-card-title">Sizes</h3>
                  <p className="ds-showcase-card-sub">
                    Small, Medium, and Large dropdown heights.
                  </p>
                </div>
                <div className="ds-form-stack">
                  <Select
                    label="Small"
                    size="sm"
                    defaultValue=""
                    options={roleOptions}
                  />
                  <Select
                    label="Medium"
                    size="md"
                    defaultValue=""
                    options={roleOptions}
                  />
                  <Select
                    label="Large"
                    size="lg"
                    defaultValue=""
                    options={roleOptions}
                  />
                </div>
              </div>

              <div className="ds-showcase-card">
                <div>
                  <h3 className="ds-showcase-card-title">States</h3>
                  <p className="ds-showcase-card-sub">
                    Error feedback and disabled select.
                  </p>
                </div>
                <div className="ds-form-stack">
                  <Select
                    label="Team Role"
                    defaultValue=""
                    options={roleOptions}
                    error="Role selection is required before continuing."
                  />
                  <Select
                    label="Region (Locked)"
                    defaultValue="Pakistan (PK)"
                    options={['Pakistan (PK)']}
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* Live Interactive Mehfil Form Demo */}
            <form
              className="ds-playground-card"
              onSubmit={handleFormSubmit}
              noValidate
            >
              <h3 className="ds-showcase-card-title">
                Interactive Form Playground
              </h3>
              <p className="ds-showcase-card-sub">
                Submit empty or invalid values to test validation, then edit a
                field to clear its error on change.
              </p>

              <div className="ds-playground-grid">
                <Input
                  label="Full Name"
                  placeholder="Jawad Iftikhar"
                  value={formValues.fullName}
                  onChange={(e) => {
                    const value = e.target.value
                    setFormValues((prev) => ({ ...prev, fullName: value }))
                    if (formErrors.fullName && value.trim()) {
                      setFormErrors((prev) => ({ ...prev, fullName: '' }))
                    }
                  }}
                  error={formErrors.fullName}
                />
                <Input
                  label="Work Email"
                  type="email"
                  placeholder="name@mehfil.dev"
                  value={formValues.email}
                  onChange={(e) => {
                    const value = e.target.value
                    setFormValues((prev) => ({ ...prev, email: value }))
                    if (formErrors.email && value.includes('@')) {
                      setFormErrors((prev) => ({ ...prev, email: '' }))
                    }
                  }}
                  error={formErrors.email}
                />
                <Select
                  label="Role"
                  options={roleOptions}
                  value={formValues.role}
                  onChange={(e) => {
                    const value = e.target.value
                    setFormValues((prev) => ({ ...prev, role: value }))
                    if (formErrors.role && value) {
                      setFormErrors((prev) => ({ ...prev, role: '' }))
                    }
                  }}
                  error={formErrors.role}
                />
              </div>

              <div className="ds-playground-actions">
                <Button type="submit" variant="primary">
                  Validate &amp; Submit
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleFormReset}
                >
                  Reset Form
                </Button>
                <Button type="button" variant="ghost" onClick={handleFormReset}>
                  Cancel
                </Button>
              </div>

              {submitted && (
                <div className="ds-success-banner">
                  All fields validated cleanly! Ready for Mehfil production
                  forms.
                </div>
              )}
            </form>
          </div>
        </section>

        {/* Cards Section */}
        <section id="cards" className="ds-section">
          <div className="ds-container">
            <div className="ds-section-header">
              <div>
                <h2 className="ds-section-title">Cards</h2>
                <p className="ds-section-desc">
                  Layout containers with optional header/title, body, and
                  footer/action slots.
                </p>
              </div>
            </div>

            <div className="ds-cards-grid">
              <Card
                title="Event Invitation"
                subtitle="Header, body, and action slots"
                variant="elevated"
                interactive
                actions={
                  <>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        addToast({
                          title: 'Declined',
                          message: 'Invitation declined.',
                          variant: 'info',
                        })
                      }
                    >
                      Decline
                    </Button>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() =>
                        addToast({
                          title: 'RSVP Confirmed',
                          message: 'You joined the Mehfil Design Review.',
                          variant: 'success',
                        })
                      }
                    >
                      Accept Invite
                    </Button>
                  </>
                }
              >
                Use Cards to group related actions and content into clear visual
                sections across Mehfil pages.
              </Card>

              <Card
                variant="default"
                header={
                  <div>
                    <span className="ds-card-badge">Custom Header Slot</span>
                    <h3 className="ds-showcase-card-title">
                      Token Sync Summary
                    </h3>
                  </div>
                }
                body="All color, font, and spacing CSS custom properties are active in both Light and Dark mode."
                footer={
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setIsInfoModalOpen(true)}
                  >
                    Inspect Details
                  </Button>
                }
              />

              <Card
                title="Body-Only Card"
                subtitle="No footer slot rendered"
                variant="outlined"
              >
                When no footer or actions prop is passed, the footer container
                is omitted completely so there is no extra whitespace.
              </Card>
            </div>
          </div>
        </section>

        {/* Modals Section */}
        <section id="modals" className="ds-section">
          <div className="ds-container">
            <div className="ds-section-header">
              <div>
                <h2 className="ds-section-title">Modals</h2>
                <p className="ds-section-desc">
                  Accessible dialogs with dynamic Tab focus trapping, Escape key
                  handling, scroll locking, and focus restoration.
                </p>
              </div>
            </div>

            <div className="ds-showcase-grid">
              <div className="ds-showcase-card">
                <div>
                  <h3 className="ds-showcase-card-title">Standard Info Modal</h3>
                  <p className="ds-showcase-card-sub">
                    Focuses the Close button by default, traps Tab/Shift+Tab,
                    and restores focus on close.
                  </p>
                </div>
                <div className="ds-btn-row">
                  <Button
                    variant="primary"
                    onClick={() => setIsInfoModalOpen(true)}
                  >
                    Open Info Modal
                  </Button>
                </div>
              </div>

              <div className="ds-showcase-card">
                <div>
                  <h3 className="ds-showcase-card-title">
                    Destructive Confirm Modal
                  </h3>
                  <p className="ds-showcase-card-sub">
                    Uses initialFocusRef to focus Cancel instead of the
                    destructive button.
                  </p>
                </div>
                <div className="ds-btn-row">
                  <Button
                    variant="secondary"
                    error
                    onClick={() => setIsConfirmModalOpen(true)}
                  >
                    Open Confirm Modal
                  </Button>
                </div>
              </div>

              <div className="ds-showcase-card">
                <div>
                  <h3 className="ds-showcase-card-title">Form Inside Modal</h3>
                  <p className="ds-showcase-card-sub">
                    Demonstrates interactive Input and Button controls inside
                    the focus trap.
                  </p>
                </div>
                <div className="ds-btn-row">
                  <Button
                    variant="secondary"
                    onClick={() => setIsFormModalOpen(true)}
                  >
                    Open Quick Note Modal
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Toasts Section */}
        <section id="toasts" className="ds-section">
          <div className="ds-container">
            <div className="ds-section-header">
              <div>
                <h2 className="ds-section-title">Toast Notifications</h2>
                <p className="ds-section-desc">
                  Auto-dismissing queue using ref-tracked timers, unmount
                  cleanup, and message deduplication.
                </p>
              </div>
            </div>

            <div className="ds-showcase-grid">
              <div className="ds-showcase-card">
                <div>
                  <h3 className="ds-showcase-card-title">
                    Trigger Status Toasts
                  </h3>
                  <p className="ds-showcase-card-sub">
                    Click to add individual or queued notifications (4s
                    auto-dismiss).
                  </p>
                </div>
                <div className="ds-btn-row">
                  <Button
                    variant="primary"
                    onClick={() =>
                      addToast({
                        title: 'Saved',
                        message: 'Changes saved to Mehfil workspace.',
                        variant: 'success',
                      })
                    }
                  >
                    Success Toast
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      addToast({
                        title: 'Heads Up',
                        message: 'Draft saved locally only.',
                        variant: 'warning',
                      })
                    }
                  >
                    Warning Toast
                  </Button>
                  <Button
                    variant="secondary"
                    error
                    onClick={() =>
                      addToast({
                        title: 'Upload Failed',
                        message: 'Could not reach asset server.',
                        variant: 'error',
                      })
                    }
                  >
                    Error Toast
                  </Button>
                </div>
              </div>

              <div className="ds-showcase-card">
                <div>
                  <h3 className="ds-showcase-card-title">
                    Queue &amp; Deduplication
                  </h3>
                  <p className="ds-showcase-card-sub">
                    Fire 3 distinct toasts at once, or click Success Toast twice
                    to see deduplication reset its timer instead of stacking.
                  </p>
                </div>
                <div className="ds-btn-row">
                  <Button variant="primary" onClick={handleTriggerBurst}>
                    Fire 3 Toasts
                  </Button>
                  <Button variant="ghost" onClick={clearAllToasts}>
                    Clear Queue
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="ds-footer">
        <div className="ds-container">
          Built with React + Vite • Tokens sourced from <code>tokens.json</code>{' '}
          &amp; <code>src/styles/tokens.css</code>
        </div>
      </footer>

      {/* Modal Instances */}
      <Modal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        title="Mehfil Design System"
        description="Keyboard navigation and focus trapping are active."
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsInfoModalOpen(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setIsInfoModalOpen(false)
                addToast({
                  title: 'Acknowledged',
                  message: 'Modal closed and focus restored to trigger button.',
                  variant: 'info',
                })
              }}
            >
              Got It
            </Button>
          </>
        }
      >
        <div className="ds-modal-preview-list">
          <p>
            Press <strong>Tab</strong> and <strong>Shift + Tab</strong> to cycle
            between controls inside this dialog. Background scrolling is locked
            while open.
          </p>
          <p>
            Press <strong>Escape</strong> or click outside the dialog to close
            and return keyboard focus back to the button that opened it.
          </p>
        </div>
      </Modal>

      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        size="sm"
        title="Delete Draft?"
        description="This action cannot be undone."
        initialFocusRef={cancelConfirmRef}
        footer={
          <>
            <Button
              ref={cancelConfirmRef}
              variant="secondary"
              onClick={() => setIsConfirmModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              error
              onClick={() => {
                setIsConfirmModalOpen(false)
                addToast({
                  title: 'Draft Deleted',
                  message: 'The selected draft was removed.',
                  variant: 'error',
                })
              }}
            >
              Delete
            </Button>
          </>
        }
      >
        <p>
          For safety on destructive confirmations, initial focus defaults to the{' '}
          <strong>Cancel</strong> action rather than the delete button.
        </p>
      </Modal>

      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title="Add Release Note"
        description="Test interactive inputs inside a focus-trapped dialog."
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsFormModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setIsFormModalOpen(false)
                addToast({
                  title: 'Note Saved',
                  message: modalNote.trim()
                    ? `Saved: "${modalNote.trim()}"`
                    : 'Empty release note saved.',
                  variant: 'success',
                })
                setModalNote('')
              }}
            >
              Save Note
            </Button>
          </>
        }
      >
        <Input
          label="Release Summary"
          placeholder="Added Card, Modal, and Toast components"
          value={modalNote}
          onChange={(e) => setModalNote(e.target.value)}
        />
      </Modal>

      {/* Toast Portal Container */}
      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  )
}