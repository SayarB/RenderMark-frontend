import { useRouter } from 'next/router'
import { marked } from 'marked'
import { parse } from 'node-html-parser'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import XMLHttpRequest from 'xhr2'
import styles from '../../../styles/EditMarkdown.module.css'
import Button from '../../../components/Button/Button'
import bg1 from '../../../assets/md-editor-bg1.svg'
import bg2 from '../../../assets/md-editor-bg2.svg'
import bg3 from '../../../assets/md-editor-bg3.svg'
import Image from 'next/image'
import axios from 'axios'
import { toast } from 'react-toastify'
import Head from 'next/head'
import useMediaQuery from '../../../hooks/useMediaQuery'
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
)

const initialMD = `# A Promo Video

## Scenes:
  
### Scene 1:

< Paste Your Image Here >
  
### Scene 2:
  
< Your Text Goes Here >
  
< Paste Your Image Here >

< Your Text Goes Here >

### Scene 3:

< Your Text Goes Here  >

< Paste Your Image Here >  

### Scene 4:
  
< Your Text Goes Here >
  
< Paste Your Image Here >

< Your Text Goes Here  >

### Scene 5:

< Your Text Goes Here >

< Your Text Goes Here  >
`

export default function EditMarkdownForTemplate () {
  const apiUrl = process.env.NEXT_PUBLIC_PROD_API_URL
  const router = useRouter()
  const { id } = router.query

  const [json, setJson] = useState({})
  const [parseDone, setParseDone] = useState(false)
  const isMobile = useMediaQuery('(max-width:756px)')
  const [value, setValue] = useState(initialMD)
  const [showPreview, setShowPreview] = useState(!isMobile)
  const insertAtPosition = (text) => {
    const textarea = document.getElementsByClassName(
      'w-md-editor-text-input'
    )[0]
    const posStart = textarea.selectionStart
    const posEnd = textarea.selectionEnd
    setValue((val) => {
      return (
        val.substring(0, posStart) + `![](${text})` + val.substring(posEnd)
      )
    })
  }

  const pasteHandler = (e) => {
    for (const element of e.clipboardData.items) {
      const item = element
      // console.log(item.type)
      if (item.type.indexOf('image') !== -1) {
        const blob = item.getAsFile()

        uploadImage(blob)
      }
    }
  }

  function uploadImage (blob) {
    const xhr = new XMLHttpRequest()

    xhr.onreadystatechange = (e) => {
      if (xhr.readyState !== 4) {
        return
      }

      if (xhr.status === 200) {
        // console.log('SUCCESS', xhr.responseText)
        insertAtPosition(xhr.responseText)
      } else {
        console.warn('request_error')
      }
    }

    xhr.open('POST', `${apiUrl}/api/v1/FileUploader`, false)
    xhr.setRequestHeader('Content-Type', blob.type)
    xhr.send(blob)
  }

  const togglePreview = () => {
    setShowPreview(!showPreview)
  }
  const showJson = (value) => {
    try {
      const html = marked.parse(value)
      // console.log(html)
      const dom = parse(html)
      let title = null
      try {
        title = dom.querySelector('h1').innerText
      } catch (err) {
        throw new Error('Could not find title')
      }
      setJson((json) => ({ ...json, template: id, title }))
      setJson((json) => ({ ...json, scenes: [] }))
      const scenesArray = []

      Array.from(dom.querySelectorAll('h3')).forEach((ele, i) => {
        const textContent = ele.textContent.trimEnd()
        if (textContent.includes('Scene') || textContent.includes('scene')) {
          const splitText = textContent.split(' ')
          // console.log(splitText)
          if (
            splitText.length !== 2 ||
            !splitText[1].endsWith(':') ||
            isNaN(parseInt(splitText[1].substring(0, splitText[1].length - 1)))
          ) {
            throw new Error(
              'Scene number is should be specified in the format Scene <scene-number>:'
            )
          }

          const index = parseInt(
            splitText[1].substring(0, splitText[1].length - 1)
          )
          if (index > scenesArray.length + 1) throw new Error('Out of Bounds')
          let nextChild = ele.nextElementSibling
          let text = ''
          let img = ''
          let subtext = ''
          if (index !== 1) {
            if (!nextChild) {
              throw new Error('Scene ' + index + ' is not specified correctly')
            }
            text = nextChild?.innerHTML
            nextChild = nextChild.nextElementSibling
          } else text = ' '
          if (index !== 5) {
            if (
              !nextChild ||
              !nextChild.firstChild ||
              !nextChild.firstChild.getAttribute
            ) {
              throw new Error(
                'Image is not specified properly in scene ' +
                  index +
                  ':  Remember to give a line gap after text'
              )
            }
            img = nextChild.firstChild.getAttribute('src')
            // console.log(index)
            nextChild = nextChild.nextElementSibling
          } else img = ''
          if (index !== 1 && index !== 3) {
            subtext = nextChild.innerHTML
          } else subtext = ' '
          scenesArray[index - 1] = { text, image: img, subtext }
        }
      })
      setJson((json) => {
        return { ...json, scenes: scenesArray }
      })
      setParseDone(true)
    } catch (err) {
      console.error(err)
      toast.error(err.toString().split('Error:')[1], {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    }
  }

  useEffect(() => {
    const renderVideo = async (toastid) => {
      try {
        const res = await axios.post(`${apiUrl}/api/v1/render`, json)
        const resData = res.data
        if (resData.task_id) {
          router.push('/status/' + resData.task_id)
          toast.dismiss(toastid)
          const now = new Date()
          const ttl = 86400000
          const item = {
            value: resData.task_id,
            expiry: now.getTime() + ttl
          }
          window.localStorage.setItem(
            'currentVideoRenderTaskId',
            JSON.stringify(item)
          )
        }
      } catch (err) {
        toast.update(toastid, {
          render: 'Server Error Occurred! Try again after some time',
          type: 'error',
          autoClose: 5000,
          isLoading: false
        })
      }
    }
    if (parseDone === true) {
      const toastid = toast.loading('Loading')
      // console.log(json)
      renderVideo(toastid)
    }
  }, [parseDone, json, router])

  return (
    <>
      <Head>
        <title>Edit Template</title>
      </Head>
      {/* {parseDone ? <p>{JSON.stringify(json)}</p> : ""} */}
      <div className={styles['edit-container']}>
        <div className={styles.background}>
          <div className={styles['edit-bg-top-left']}>
            <Image layout='fill' src={bg1} alt='' />
          </div>
          <div className={styles['edit-bg-center']}>
            <Image layout='fill' src={bg2} alt='' />
          </div>
          <div className={styles['edit-bg-bottom-right']}>
            <Image layout='fill' src={bg3} alt='' />
          </div>
        </div>
        <div data-color-mode='dark' className={styles['markdown-editor']}>
          <div className={styles['md-editor-placeholder']}>
            {/* <Button
            style={{
              marginBottom: "2rem",
              background:
                "linear-gradient(252.56deg, rgba(236, 113, 113, 0.9) 1.99%, rgba(239, 84, 196, 0.9) 100%);",
              borderRadius: "5px",
            }}
            bgColor="#eeeeee"
            onClick={togglePreview}
          >
            {showPreview ? "Editor" : "Preview"}
          </Button> */}
            <div className={styles.toolbar}>
              <div className={styles.circles}>
                <div className={styles.circle + ' ' + styles.red} />
                <div className={styles.circle + ' ' + styles.yellow} />
                <div className={styles.circle + ' ' + styles.green} />
              </div>
              {isMobile && (
                <button
                  onClick={() => {
                    togglePreview()
                  }}
                  className={styles.previewbutton}
                >
                  {showPreview ? 'Editor' : 'Preview'}
                </button>
              )}
            </div>
            <MDEditor
              hideToolbar
              onPaste={pasteHandler}
              preview={showPreview ? (isMobile ? 'preview' : 'live') : 'edit'}
              height={560}
              enableScroll
              visiableDragbar={false}
              value={value}
              style={{
                borderBottomRightRadius: '20px',
                borderBottomLeftRadius: '20px',
                height: '70vh',
                padding: '0 3px'
              }}
              onChange={(e) => {
                setValue(e)
              }}
            />
          </div>
          <Button
            style={{
              marginTop: '2rem',
              background:
                'linear-gradient(232.56deg, rgba(93, 216, 142, 0.9) 0.99%, rgba(54, 128, 249, 0.76) 100%)',
              borderRadius: '5px',
              fontSize: '2rem',
              color: 'white',
              padding: '1rem 5rem',
              paddingTop: '1.4rem',
              fontWeight: '700'
            }}
            bgColor='#10ce20'
            onClick={() => {
              setParseDone(false)
              showJson(value)
            }}
          >
            SUBMIT
          </Button>
          {/* <p style={{ color: "red", fontSize: "2rem" }}>{error}</p> */}
        </div>
      </div>
    </>
  )
}
