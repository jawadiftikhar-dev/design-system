import styles from './Button.module.css'

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
    styles.button,
    styles[variant],
    styles[size],
    error ? styles.error : '',
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