import { QueryClientProvider, QueryClient } from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import { AppProps } from 'next/app'
import 'semantic-ui-css/semantic.min.css'
import '../globals.css'

import CartProvider from '@store/Cart'

const client = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={client}>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  )
}

export default MyApp
