import React from 'react'
import styles from '../../styles/VideoPreview.module.css'
function Video ({ src }) {
  return (
    <div className={styles['video-outer-container']}>
      <div className={styles['video-container']}>
        <video className={styles.video} src={src} controls />
      </div>
    </div>
  )
}

export default Video
