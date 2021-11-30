import { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import 'semantic-ui-css/semantic.min.css'
import '../globals.css'

import CartProvider from '@store/Cart'

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </QueryClientProvider>
  )
}

export default MyApp
