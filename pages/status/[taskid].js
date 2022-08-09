import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import animationData from '../../assets/anims/progress-anim.json'
import Video from '../../components/Video/Video'
import Lottie from 'react-lottie'
import styles from '../../styles/VideoPreview.module.css'
import axios from 'axios'
import { saveAs } from 'file-saver'
import { useQuery } from '@tanstack/react-query'
import Button from '../../components/Button/Button'

function TaskStatusPage () {
  const router = useRouter()
  const { taskid } = router.query
  const [loading, setLoading] = useState(true)
  const [videoPath, setVideoPath] = useState('')
  const [urlPath, setUrlPath] = useState('')
  const statusCheck = () => {
    return axios.get(`http://localhost:8000/api/v1/status/${taskid}`)
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
        url: 'http://localhost:8000/api/v1/videos/' + videoPath, // your url
        method: 'GET',
        responseType: 'blob' // important
      }).then((response) => {
        const url = window.URL.createObjectURL(
          new window.Blob([response.data])
        )
        setUrlPath(url)
      })
    }
  }, [videoPath])
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
      const res = await statusCheck()
      const resData = res.data
      console.log(res.data)
      if (resData.task_result !== null) {
        setVideoPath(resData.task_result)
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
      <div className={styles['video-preview-container']}>
        <Lottie
          isClickToPauseDisabled
          options={{ ...defaultOptions }}
          height='50%'
          width='30%'
        />
        <h1>Your Video is being rendered</h1>
      </div>
    )
  } else {
    return (
      <div className={styles['video-preview-container']}>
        <Video src={'http://localhost:8000/api/v1/videos/' + videoPath} />
        <Button
          onClick={() => {
            saveAs(urlPath, 'image.mp4')
          }}
        >
          Download
        </Button>
      </div>
    )
  }
}

export default TaskStatusPage
