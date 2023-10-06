"use client"

import Container from '@components/Container'
import Logo from '@components/Navbar/Logo'
import Search from './Search'
import UserMenu from './UserMenu'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <nav className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-row items-center justify-between gap-3'>
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
    </nav>
  )
}

export default Navbar