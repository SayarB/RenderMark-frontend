import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Navbar from '../components/Navbar/Navbar'
import { useRouter } from 'next/router'
const queryClient = new QueryClient()
function MyApp ({ Component, pageProps }) {
  const router = useRouter()
  console.log(router.pathname)
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
    </QueryClientProvider>
  )
}

export default MyApp
