import { useContext } from 'react'
import Head from 'next/head'

import { Header } from '@components/utils/header'
import { Sidebar } from '@components/utils/sidebar'
import { Cookies } from '@components/utils/cookies'
import { UtilsContext } from '@contexts/UtilsContext'

interface Data {
  children: JSX.Element
  title: string
}

export function Layout(props: Data) {
  const { useSidebarAdmin } = useContext(UtilsContext)

  return (
    <>
      <Head>
        <title>{props.title} - Hylex</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700;900&display=swap"
          rel="stylesheet"
        />

        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <Cookies />

      <div className="bg-foreground flex h-screen w-screen">
        <Sidebar show={useSidebarAdmin} />
        <div
          className={
            useSidebarAdmin
              ? 'w-28 lg:w-full overflow-y-auto overscroll-y-auto h-screen'
              : 'w-full overflow-y-auto overscroll-y-auto h-screen'
          }
        >
          <Header />
          <div
            className={
              useSidebarAdmin
                ? 'hidden lg:block container py-10'
                : 'container py-10'
            }
          >
            {props.children}
          </div>
        </div>
      </div>
    </>
  )
}
