import { useId } from 'react'
import styles from './Select.module.css'

export default function Select({
  label,
  options = [],
  placeholder = 'Select an option',
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
  const selectId = id || generatedId
  const errorId = `${selectId}-error`
  const helperId = `${selectId}-helper`

  const hasError = Boolean(error)
  const resolvedError =
    typeof error === 'string' && error.trim().length > 0 ? error : errorMessage

  const describedBy =
    hasError && resolvedError ? errorId : helperText ? helperId : undefined

  const selectClasses = [
    styles.select,
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
        <label htmlFor={selectId} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.wrapper}>
        <select
          id={selectId}
          className={selectClasses}
          disabled={disabled}
          aria-invalid={hasError ? 'true' : undefined}
          aria-describedby={describedBy}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => {
            const normalized =
              typeof opt === 'string' ? { value: opt, label: opt } : opt
            return (
              <option
                key={normalized.value}
                value={normalized.value}
                disabled={normalized.disabled}
              >
                {normalized.label}
              </option>
            )
          })}
        </select>

        <span className={styles.icon} aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

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