import 'tailwindcss/tailwind.css'
import  Nav from '../components/Nav'
import { Provider } from 'next-auth/client'

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
    <Nav/>
    <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
