import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
const queryClient = new QueryClient()
function MyApp ({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ToastContainer
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
