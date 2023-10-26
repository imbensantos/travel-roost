import { User } from "@prisma/client"

import Container from '@components/Container'
import Logo from '@components/Navbar/Logo'
import Categories from "@components/Categories"
import Search from './Search'
import UserMenu from './UserMenu'

interface NavbarProps {
  currentUser?: User | null
}

const Navbar: React.FC<NavbarProps> = ({currentUser}) => {

  return (
    <nav className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px] border-neutral-200'>
        <Container>
          <div className='flex flex-row items-center justify-between gap-3'>
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser}/>
          </div>
        </Container>
      </div>
      <Categories />
    </nav>
  )
}

export default Navbar