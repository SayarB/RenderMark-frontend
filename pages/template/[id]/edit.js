import { useRouter } from 'next/router'
import { marked } from 'marked'
import { parse } from 'node-html-parser'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'
import styles from '../../../styles/EditMarkdown.module.css'
import Button from '../../../components/Button/Button'
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
)
const EditerMarkdown = dynamic(
  () =>
    import('@uiw/react-md-editor').then((mod) => {
      return mod.default.Markdown
    }),
  { ssr: false }
)
const Markdown = dynamic(
  () => import('@uiw/react-markdown-preview').then((mod) => mod.default),
  { ssr: false }
)
const initialMD = `# A Promo Video

## Scenes:
  
### Scene 1:

< Your Text Goes Here  >

< Image goes here >
  
### Scene 2:
  
< Your Text Goes Here >
  
< Image goes Here >
`

export default function EditMarkdownForTemplate () {
  const router = useRouter()
  const { id } = router.query
  const [showPreview, setShowPreview] = useState()
  const [json, setJson] = useState({})
  const [parseDone, setParseDone] = useState(false)
  const togglePreview = useCallback(() => {
    setShowPreview(!showPreview)
  }, [showPreview])
  const showJson = (value) => {
    const html = marked.parse(value)
    console.log(html)
    const dom = parse(html)

    const title = dom.querySelector('h1').innerText
    setJson((json) => ({ ...json, templateid: id, title }))
    setJson((json) => ({ ...json, scenes: [] }))
    Array.from(dom.querySelectorAll('h3')).forEach((ele) => {
      const textContent = ele.textContent.trimEnd()
      if (textContent.includes('Scene')) {
        const index = textContent
          .split(' ')[1]
          .substring(0, textContent.split(' ')[1].length - 1)
        const nextChild = ele.nextElementSibling
        const text = nextChild?.innerHTML

        const img = nextChild.nextElementSibling.firstChild.getAttribute('src')
        console.log(index)
        setJson((json) => {
          const scenesArray = [...json.scenes]
          scenesArray[index - 1] = { text, img }
          return { ...json, scenes: scenesArray }
        })
      }
      setParseDone(true)
    })
  }

  useEffect(() => {
    if (parseDone === true) {
      console.log(json)
    }
  }, [parseDone])

  const [value, setValue] = useState(initialMD)

  return (
    <>
      <p>{JSON.stringify(json)}</p>
      <div data-color-mode='dark' className={styles['markdown-editor']}>
        <h1>{id}</h1>
        <Button
          style={{ marginBottom: '2rem' }}
          bgColor='#eeeeee'
          onClick={togglePreview}
        >
          {showPreview ? 'Editor' : 'Preview'}
        </Button>
        <MDEditor
          preview={showPreview ? 'preview' : 'edit'}
          height={600}
          value={value}
          onChange={setValue}
        />
        <Button
          style={{ marginTop: '2rem' }}
          bgColor='#10ce20'
          onClick={() => showJson(value)}
        >
          Submit
        </Button>
      </div>
    </>
  )
}
