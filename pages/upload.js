import { useEffect, useState } from 'react'

import { marked } from 'marked'
import { parse } from 'node-html-parser'
export default function Upload () {
  const [file, setFile] = useState(null)
  const [fileText, setFileText] = useState('')
  const [json, setJson] = useState({})
  const [parseDone, setParseDone] = useState(false)
  useEffect(() => {
    if (fileText.length > 0) {
      console.log(marked.parse(fileText))
      const html = marked.parse(fileText)
      const dom = parse(html)
      const title = dom.querySelector('h1').innerText
      setJson((json) => ({ ...json, title }))
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
          console.log(index)
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
    if (parseDone === true) console.log(json)
  }, [parseDone])

  function handleFile (e) {
    setFileText(e.target.result)
  }
  function handleFileSubmit () {
    if (typeof window === 'undefined') return

    const reader = new window.FileReader(file)
    reader.onloadend = handleFile
    reader.readAsText(file, 'utf-8')
  }
  return (
    <div>
      <input
        type='file'
        accept='.md, .markdown'
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleFileSubmit}>Submit</button>

      <pre>{JSON.stringify(json)}</pre>
    </div>
  )
}
