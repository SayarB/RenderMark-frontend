import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Navbar from '../components/Navbar/Navbar'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Footer from '../components/Footer/Footer'

const queryClient = new QueryClient()
function MyApp ({ Component, pageProps }) {
  const router = useRouter()
  // console.log(router.pathname)
  const [currentVideo, setCurrentVideo] = useState('')

  useEffect(() => {
    function getWithExpiry (key) {
      const itemStr = window.localStorage.getItem(key)
      // if the item doesn't exist, return null
      if (!itemStr) {
        return null
      }
      const item = JSON.parse(itemStr)
      const now = new Date()
      // compare the expiry time of the item with the current time
      if (now.getTime() > item.expiry) {
        // If the item is expired, delete the item from storage
        // and return null
        window.localStorage.removeItem(key)
        return null
      }
      return item.value
    }

    setCurrentVideo(getWithExpiry('currentVideoRenderTaskId'))
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
      <Footer
        color={
          router.pathname === '/templates' || router.pathname.includes('/edit')
            ? 'black'
            : 'white'
        }
      />
    </QueryClientProvider>
  )
}

export default MyApp
