import NextNprogress from 'nextjs-progressbar'
import Nav from './Nav'
import Footer from './Footer'
import Wallet from './Wallet'

const Layout = ({ children }) => {
  return (
    <>
      <NextNprogress startPosition={0.3} stopDelayMs={100} height={3} showOnShallow={true} color='var(--color-highlight)' />
      <Nav />
      <Wallet />
      <main className='w-full min-h-screen py-8 px-4 text-center text-white bg-brand-dark bg-cover'>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
