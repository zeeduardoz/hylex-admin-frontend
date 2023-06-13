/* eslint-disable import/extensions */
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { ToastContainer } from 'react-toastify'

import '../styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'

import { AuthProvider } from '@contexts/AuthContext'
import { InfluencersProvider } from '@contexts/InfluencersContext'
import { UtilsProvider } from '@contexts/UtilsContext'
import { ProductsProvider } from '@contexts/ProductsContext'
import { PatchNotesProvider } from '@contexts/PatchNotesContext'
import { CouponsProvider } from '@contexts/CouponsContext'
import { NewsProvider } from '@contexts/NewsContext'
import { OrdersProvider } from '@contexts/OrdersContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <UtilsProvider>
        <ThemeProvider enableSystem={false}>
          <ToastContainer
            autoClose={3000}
            position="top-right"
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
          />

          <ProductsProvider>
            <InfluencersProvider>
              <PatchNotesProvider>
                <CouponsProvider>
                  <NewsProvider>
                    <OrdersProvider>
                      <Component {...pageProps} />
                    </OrdersProvider>
                  </NewsProvider>
                </CouponsProvider>
              </PatchNotesProvider>
            </InfluencersProvider>
          </ProductsProvider>
        </ThemeProvider>
      </UtilsProvider>
    </AuthProvider>
  )
}
export default MyApp
