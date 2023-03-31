import '../styles/globals.css'
import 'highlight.js/styles/stackoverflow-dark.css'

import SiteNavigation from "../components/SiteNavigation"
import { SessionProvider } from "next-auth/react"
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.setDefaultLocale(en.locale)
TimeAgo.addLocale(en)

function MyApp({ Component, pageProps: { session, ...pageProps },  }) {
  return (
    <>
      <SiteNavigation></SiteNavigation>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}

export default MyApp
