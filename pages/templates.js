import TemplateThumbnail from '../components/TemplateThumbnail/TemplateThumbnail'
import styles from '../styles/TemplateThumbnails.module.css'
export default function TemplatesPage () {
  return (
    <div className={styles['templates-page']}>
      <div className={styles.thumbnails}>
        <TemplateThumbnail
          templateid={1}
          thumbnailImage='https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGVuc3xlbnwwfHwwfHw%3D&w=1000&q=80'
          previewVideo='http://34.93.232.27/api/v1/videos/a2dace1b-e260-45e6-8d26-297691d80022.mp4'
        />
      </div>
    </div>
  )
}
