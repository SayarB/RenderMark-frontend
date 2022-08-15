import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { marked } from 'marked'
import { parse } from 'node-html-parser'
import styles from '../../../styles/UploadMarkdown.module.css'
import StyledDropzone from '../../../components/Dropzone/StyledDropzone'
import Button from '../../../components/Button/Button'
export default function Upload () {
  const router = useRouter()
  const { id } = router.query
  const [file, setFile] = useState(null)
  const [fileText, setFileText] = useState('')
  const [json, setJson] = useState({})
  const [parseDone, setParseDone] = useState(false)

  useEffect(() => {
    if (fileText.length > 0) {
      // console.log(marked.parse(fileText))
      const html = marked.parse(fileText)
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
          const img =
            nextChild.nextElementSibling.firstChild.getAttribute('src')
          // console.log(index)
          setJson((json) => {
            const scenesArray = [...json.scenes]
            scenesArray[index - 1] = { text, img }
            return { ...json, scenes: scenesArray }
          })
        }
      })
      setParseDone(true)
    }
  }, [fileText])

  useEffect(() => {
    // if (parseDone === true) console.log(json)
  }, [parseDone])

  function handleFile (e) {
    setFileText(e.target.result)
  }
  const handleFileSubmit = useCallback(() => {
    if (typeof window === 'undefined') return

    const reader = new window.FileReader(file)
    reader.onloadend = handleFile
    reader.readAsText(file, 'utf-8')
  }, [file])

  const onDrop = useCallback(
    (acceptedFile) => {
      setFile(acceptedFile)
      handleFileSubmit()
    },
    [setFile, handleFileSubmit]
  )

  return (
    <div className={styles['upload-container']}>
      <StyledDropzone onDrop={onDrop} file={file} />
      <Button style={{ margin: '20px' }} onClick={handleFileSubmit}>
        Submit
      </Button>
      {/* <pre style={{ width: '50px' }}>{JSON.stringify(json)}</pre> */}
    </div>
  )
}
