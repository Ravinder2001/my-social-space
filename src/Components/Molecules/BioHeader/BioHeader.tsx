import React from 'react'
import styles from "./styles.module.scss"
function BioHeader() {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>Intro</div>
      <div className={styles.bio}>Life runs on code Software Engineer</div>
      <div className={styles.bio_button}>Edit Bio</div>
    </div>
  )
}

export default BioHeader