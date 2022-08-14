import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import styles from '../../styles/TemplateThumbnails.module.css'
import Link from 'next/link'
import ProgressBar from '../TemplateThumbnail/ProgressBar'
function TemplateThumbnail ({ templateid, thumbnailImage, previewVideo }) {
  const videoRef = useRef()
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (videoRef) {
      videoRef.current.addEventListener('timeupdate', () => {
        if (videoRef.current) {
          setProgress(
            (videoRef?.current.currentTime / videoRef?.current.duration) * 100
          )
        }
      })
    }
  }, [videoRef])
  return (
    <Link href={`/template/${templateid}/edit`}>
      <div className={styles['thumbnail-outer-container']}>
        <div
          className={styles['video-preview-container']}
          onMouseEnter={() => {
            if (videoRef.current.paused) videoRef.current.play()
          }}
          onMouseLeave={() => {
            if (!videoRef.current.paused) {
              videoRef.current.pause()
              videoRef.current.load()
            }
          }}
        >
          <div className={styles['image-preview']}>
            <Image
              layout='responsive'
              width={300}
              height={200}
              src={thumbnailImage}
              alt=''
            />
          </div>
          <video
            muted
            ref={videoRef}
            className={styles['video-preview']}
            src={previewVideo}
            loop
          />
          <ProgressBar done={progress} />
        </div>
      </div>
    </Link>
  )
}

export default TemplateThumbnail
