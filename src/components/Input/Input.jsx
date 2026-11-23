import { useId } from 'react'
import styles from './Input.module.css'

export default function Input({
  label,
  size = 'md',
  variant = 'outline',
  error = false,
  errorMessage = '',
  helperText = '',
  disabled = false,
  id,
  className = '',
  ...rest
}) {
  const generatedId = useId()
  const inputId = id || generatedId
  const errorId = `${inputId}-error`
  const helperId = `${inputId}-helper`

  const hasError = Boolean(error)
  const resolvedError =
    typeof error === 'string' && error.trim().length > 0 ? error : errorMessage

  const describedBy =
    hasError && resolvedError ? errorId : helperText ? helperId : undefined

  const inputClasses = [
    styles.input,
    styles[variant],
    styles[size],
    hasError ? styles.error : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={inputClasses}
        disabled={disabled}
        aria-invalid={hasError ? 'true' : undefined}
        aria-describedby={describedBy}
        {...rest}
      />

      {hasError && resolvedError ? (
        <span id={errorId} className={styles.errorText} role="alert">
          {resolvedError}
        </span>
      ) : (
        helperText && (
          <span id={helperId} className={styles.helper}>
            {helperText}
          </span>
        )
      )}
    </div>
  )
}