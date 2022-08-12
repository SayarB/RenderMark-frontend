import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Navbar from '../components/Navbar/Navbar'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const queryClient = new QueryClient()
function MyApp ({ Component, pageProps }) {
  const router = useRouter()
  console.log(router.pathname)
  const [currentVideo, setCurrentVideo] = useState('')

  useEffect(() => {
    setCurrentVideo(window.localStorage.getItem('currentVideoRenderTaskId'))
  })

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar selected={router.pathname} />
      <Component {...pageProps} />
      <ToastContainer
        theme='colored'
        autoClose={5000}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover={false}
        style={{ fontSize: '1.4rem' }}
        limit={1}
      />

      {currentVideo &&
        currentVideo.length > 0 &&
        !router.pathname.includes('/status') && (
          <div className='video-link'>
            <Link href={`/status/${currentVideo}`}>Video Render Status</Link>
          </div>
      )}
    </QueryClientProvider>
  )
}

export default MyApp
