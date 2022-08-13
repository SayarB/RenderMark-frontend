import React from 'react'
import styles from '../../styles/TemplateThumbnails.module.css'
function ProgressBar ({ done }) {
  return (
    <div className={styles['progress-bar-track']}>
      <div
        style={{
          width: `${done}%`
        }}
        className={styles['progress-bar']}
      />
    </div>
  )
}

export default ProgressBar
