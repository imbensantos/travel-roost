"use client"

import { useCallback, useState } from "react"
import { signOut } from "next-auth/react"

import { AiOutlineMenu } from "react-icons/ai"

import { User } from "@prisma/client"
import useRegisterModal from "@hooks/useRegisterModal"
import useLoginModal from "@hooks/useLoginModal"

import Avatar from "@components/Avatar"
import MenuItem from "./MenuItem"

interface UserMenuProps {
  currentUser?: User | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])


  return (
    <div className="relative flex-grow flex-shrink-0 basis-auto lg:flex-initial">
      <div className="flex flex-row items-center gap-3 justify-end">
        <div
          onClick={() => { }}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Perch your nest
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-rw items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen ? (
        <div className="absolute rounded-xl py-2 shadow-md w-[40vw] md:w-11/12 bg-white overflow-hidden right-0 top-14 md:top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={() => { }} label="Trips" />
                <MenuItem onClick={() => { }} label="Wishlists" />
                <MenuItem onClick={() => { }} label="Reservations" />
                <MenuItem onClick={() => { }} label="Properties" />
                <hr className="my-2" />
                <MenuItem onClick={() => { }} label="Perch your nest" />
                <MenuItem onClick={() => { }} label="Account" />
                <hr className="my-2" />
                <MenuItem onClick={() => signOut()} label="Log out" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default UserMenu

