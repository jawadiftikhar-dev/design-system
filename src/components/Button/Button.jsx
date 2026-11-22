import './Button.css'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  error = false,
  disabled = false,
  type = 'button',
  className = '',
  ...rest
}) {
  const classes = [
    'ds-btn',
    `ds-btn--${variant}`,
    `ds-btn--${size}`,
    error ? 'ds-btn--error' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      aria-invalid={error ? 'true' : undefined}
      {...rest}
    >
      {children}
    </button>
  )
}