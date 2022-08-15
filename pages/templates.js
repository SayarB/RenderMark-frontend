import TemplateThumbnail from '../components/TemplateThumbnail/TemplateThumbnail'
import styles from '../styles/TemplateThumbnails.module.css'
import axios from 'axios'
import Head from 'next/head'
export default function TemplatesPage ({ templates }) {
  // console.log(templates)
  return (
    <div className={styles['templates-page']}>
      <Head>
        <title>Templates</title>
      </Head>
      <h1 className={styles.heading}>Templates</h1>
      <div className={styles.thumbnails}>
        {templates.map((temp) => (
          <TemplateThumbnail
            key={'template-' + temp.name}
            templateid={temp.name}
            thumbnailImage={temp.thumbnail}
            previewVideo={temp.video}
          />
        ))}
      </div>
    </div>
  )
}
export async function getServerSideProps () {
  const apiUrl = process.env.NEXT_PUBLIC_PROD_API_URL
  const res = await axios.get(`${apiUrl}/api/v1/templates`)

  return {
    props: {
      templates: res.data
    } // will be passed to the page component as props
  }
}
