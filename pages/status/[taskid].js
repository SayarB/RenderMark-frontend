import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import animationData from '../../assets/anims/progress-anim.json'
import dynamic from 'next/dynamic'
import Video from '../../components/Video/Video'
import styles from '../../styles/VideoPreview.module.css'
import axios from 'axios'
import { saveAs } from 'file-saver'
import { useQuery } from '@tanstack/react-query'
import Button from '../../components/Button/Button'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Head from 'next/head'
const Lottie = dynamic(() => import('react-lottie'))
function TaskStatusPage () {
  const router = useRouter()
  const { taskid } = router.query
  const [loading, setLoading] = useState(true)
  const [videoPath, setVideoPath] = useState('')
  const [urlPath, setUrlPath] = useState('')
  const apiUrl = process.env.NEXT_PUBLIC_PROD_API_URL
  const statusCheck = () => {
    return axios.get(`${apiUrl}/api/v1/status/${taskid}`)
    // return axios.get(`http://127.0.0.1:8000`);
  }

  // const queryClient = useQueryClient()

  // useEffect(() => {
  //   const getData = async () => {
  //     const res = await statusCheck();
  //     console.log(res.data);
  //   };
  //   getData();
  // }, []);

  useEffect(() => {
    if (videoPath !== '') {
      setLoading(false)
      axios({
        url: `${apiUrl}/api/v1/videos/${videoPath}`, // your url
        method: 'GET',
        responseType: 'blob' // important
      })
        .then((response) => {
          const url = window.URL.createObjectURL(
            new window.Blob([response.data])
          )
          setUrlPath(url)
        })
        .catch(() => {
          toast.error('Server error occurred')
        })
    }
  }, [videoPath, apiUrl])
  const defaultOptions = {
    loop: true,
    autoplay: true,

    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  useQuery(
    ['video-status'],
    async () => {
      try {
        const res = await statusCheck()
        const resData = res.data
        // console.log(res.data)
        if (resData.task_result !== null) {
          setVideoPath(resData.task_result)
        }
      } catch (err) {
        toast.error('There is some server error! Please Try again', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        })
        router.back()
      }
    },
    {
      refetchInterval: 5000,
      refetchIntervalInBackground: 5000,
      enabled: loading
    }
  )

  if (loading === true) {
    return (
      <>
        <Head>
          <title>Rendering...</title>
        </Head>
        <div className={styles['video-preview-container']}>
          <Lottie
            isClickToPauseDisabled
            options={{ ...defaultOptions }}
            height='50%'
            width='30%'
          />
          <h1>Your Video is being rendered</h1>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Head>
          <title>Your Video</title>
        </Head>
        <div className={styles['video-preview-container']}>
          <Video src={`${apiUrl}/api/v1/videos/${videoPath}`} />
          <Button
            onClick={() => {
              saveAs(urlPath, 'video.mp4')
            }}
          >
            Download
          </Button>
        </div>
      </>
    )
  }
}

export default TaskStatusPage
