import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Nav = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { name: 'Explore', path: '/' },
    { name: 'Tickets', path: '/tickets' },
    { name: 'Wallet', path: '/wallet' },
    { name: 'Settings', path: '/settings' },
  ]

  return (
    <nav>
      {isOpen &&
        <ul className='left-0 right-0 top-0 bottom-0 pt-28 z-10 text-brand bg-brand-dark absolute h-screen'>
          {links.map(l => (
            <li key={l.name}>
              <Link href={l.path}>
                <a href={l.url}
                  onClick={() => setIsOpen(false)}
                  className={`${router.pathname === l.path && 'active'} 
                    w-full block text-2xl md:text-4xl text-center leading-loose px-8 py-2 md:py-8 
                    transition-all hover:bg-highlight hover:text-brand-dark cursor-pointer`}>
                  {l.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      }

      <div className='absolute left-4 top-4 z-20'>
        <button className='outline-none text-brand' onClick={() => setIsOpen(!isOpen)} aria-label='Open Mobile Navigation'>
          {!isOpen ?
            <svg xmlns='http://www.w3.org/2000/svg' className='h-14 w-14 text-highlight hover:opacity-80' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' viewBox='0 0 24 24' stroke='currentColor'>
              <path d='M4 6h16M4 12h16M4 18h16'></path>
            </svg>
            :
            <svg xmlns='http://www.w3.org/2000/svg' className='h-14 w-14 text-highlight hover:opacity-80' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          }
        </button>
      </div>

    </nav>

  )
}

export default Nav
