import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import 'semantic-ui-css/semantic.min.css'
import client from '@service/client'
import '../globals.css'

import CartProvider from '@store/Cart'
import AuthProvider from '@store/Auth'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default MyApp
