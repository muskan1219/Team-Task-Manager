import Link from 'next/link'
import styles from './Navigation.module.css'

export default function Navigation() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">Team Task Manager</Link>
      </div>
      <div className={styles.links}>
        <Link href="/" className="glass-button">Dashboard</Link>
      </div>
    </nav>
  )
}
