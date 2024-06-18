import styles from '../../styles/loader.module.css'

export function Loader() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className={styles.loader}>
        <div className={`${styles.cell} ${styles['d-0']}`}></div>
        <div className={`${styles.cell} ${styles['d-1']}`}></div>
        <div className={`${styles.cell} ${styles['d-2']}`}></div>
        <div className={`${styles.cell} ${styles['d-1']}`}></div>
        <div className={`${styles.cell} ${styles['d-2']}`}></div>
        <div className={`${styles.cell} ${styles['d-2']}`}></div>
        <div className={`${styles.cell} ${styles['d-3']}`}></div>
        <div className={`${styles.cell} ${styles['d-3']}`}></div>
        <div className={`${styles.cell} ${styles['d-4']}`}></div>
      </div>
    </div>
  );
}
