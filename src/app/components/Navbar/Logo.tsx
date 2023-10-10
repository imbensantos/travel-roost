"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

type Props = {}

const Logo = (props: Props) => {
  const router = useRouter()

  const handleClick = () => router.push('/')

  return (
    <div 
      onClick={handleClick}
      className="flex flex-grow-0 flex-shrink-0 basis-auto lg:flex-initial"
    >
      <Image
        alt="Travel Roost"
        className="hidden sm:-mt-3 sm:block lg:hidden align-baseline cursor-pointer"
        height={40}
        width={40}
        src={"/images/logo.svg"}
      />
      <Image
        alt="Travel Roost"
        className="hidden sm:-mt-3 lg:block align-baseline cursor-pointer"
        height={40}
        width={260}
        src={"/images/logo-text.svg"}
      />
    </div>
  )
}

export default Logo