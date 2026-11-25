import { createPortal } from 'react-dom'
import styles from './Toast.module.css'

export default function Toast({ toasts = [], onDismiss }) {
  if (toasts.length === 0) return null

  return createPortal(
    <div
      className={styles.container}
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className={`${styles.toast} ${styles[toast.variant] || styles.info}`}
        >
          <div className={styles.content}>
            {toast.title && <span className={styles.title}>{toast.title}</span>}
            <span className={styles.message}>{toast.message}</span>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={() => onDismiss?.(toast.id)}
            aria-label="Dismiss notification"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path
                d="M5 5L15 15M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>,
    document.body
  )
}