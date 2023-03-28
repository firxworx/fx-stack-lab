import styles from './React3dBuddy.module.css'

/* eslint-disable-next-line */
export interface React3dBuddyProps {}

export function React3dBuddy(props: React3dBuddyProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to React3dBuddy!</h1>
    </div>
  )
}

export default React3dBuddy
