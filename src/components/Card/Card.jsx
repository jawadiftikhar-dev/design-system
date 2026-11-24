import styles from './Card.module.css'

export default function Card({
  title,
  subtitle,
  header,
  body,
  children,
  footer,
  actions,
  variant = 'default',
  interactive = false,
  className = '',
  ...rest
}) {
  // Support both explicit header/body/footer slots and title/children/actions aliases
  const resolvedHeader =
    header ??
    (title || subtitle ? (
      <>
        {title && <h3 className={styles.title}>{title}</h3>}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </>
    ) : null)

  const resolvedBody = body ?? children
  const resolvedFooter = footer ?? actions

  const cardClasses = [
    styles.card,
    styles[variant],
    interactive ? styles.interactive : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <article className={cardClasses} {...rest}>
      {resolvedHeader && (
        <header className={styles.header}>{resolvedHeader}</header>
      )}

      {resolvedBody && <div className={styles.body}>{resolvedBody}</div>}

      {/* Conditionally render footer only when content is provided */}
      {resolvedFooter && (
        <footer className={styles.footer}>{resolvedFooter}</footer>
      )}
    </article>
  )
}