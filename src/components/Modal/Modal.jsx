import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  closeOnBackdrop = true,
  showCloseButton = true,
  initialFocusRef,
}) {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const previousFocusRef = useRef(null)

  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    if (!isOpen) return undefined

    // Save the trigger element so focus can be restored when the modal closes
    previousFocusRef.current = document.activeElement

    // Lock background scrolling while modal is open and restore previous value on close
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const frameId = requestAnimationFrame(() => {
      // Default to closeButtonRef for predictable entry; pass initialFocusRef
      // (e.g. pointing to a Cancel button) for destructive confirm dialogs.
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus()
      } else if (showCloseButton && closeButtonRef.current) {
        closeButtonRef.current.focus()
      } else {
        // Fallback when modal has no focusable elements
        dialogRef.current?.focus()
      }
    })

    return () => {
      cancelAnimationFrame(frameId)
      document.body.style.overflow = previousOverflow

      if (
        previousFocusRef.current &&
        typeof previousFocusRef.current.focus === 'function'
      ) {
        previousFocusRef.current.focus()
      }
    }
  }, [isOpen, initialFocusRef, showCloseButton])

  const getFocusableElements = () => {
    if (!dialogRef.current) return []
    return Array.from(
      dialogRef.current.querySelectorAll(FOCUSABLE_SELECTOR)
    ).filter((el) => el.getClientRects().length > 0 && !el.disabled)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.stopPropagation()
      onClose?.()
      return
    }

    if (e.key !== 'Tab') return

    // Query focusable elements dynamically on every Tab keydown so newly
    // enabled or conditionally rendered controls are always included.
    const focusable = getFocusableElements()

    if (focusable.length === 0) {
      e.preventDefault()
      dialogRef.current?.focus()
      return
    }

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (e.shiftKey) {
      if (
        document.activeElement === first ||
        document.activeElement === dialogRef.current
      ) {
        e.preventDefault()
        last.focus()
      }
    } else if (document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  if (!isOpen) return null

  return createPortal(
    <div
      className={styles.backdrop}
      onClick={(e) => {
        if (closeOnBackdrop && e.target === e.currentTarget) {
          onClose?.()
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={`${styles.dialog} ${styles[size]}`}
      >
        {(title || description || showCloseButton) && (
          <header className={styles.header}>
            <div>
              {title && (
                <h2 id={titleId} className={styles.title}>
                  {title}
                </h2>
              )}
              {description && (
                <p id={descriptionId} className={styles.description}>
                  {description}
                </p>
              )}
            </div>

            {showCloseButton && (
              <button
                ref={closeButtonRef}
                type="button"
                className={styles.closeButton}
                onClick={() => onClose?.()}
                aria-label="Close modal"
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M5 5L15 15M15 5L5 15"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}
          </header>
        )}

        {children && <div className={styles.body}>{children}</div>}

        {footer && <footer className={styles.footer}>{footer}</footer>}
      </div>
    </div>,
    document.body
  )
}