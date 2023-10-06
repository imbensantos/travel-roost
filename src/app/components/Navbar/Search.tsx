"use client"

import {BiSearch} from "react-icons/bi"
type Props = {}

const Search = (props: Props) => {
  return (
    <div className='flex-grow-0 flex-shrink basis-auto lg:flex-initial border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer'>
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6 text-ellipsis whitespace-nowrap">
          Anywhere
        </div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center text-ellipsis whitespace-nowrap">
          Any Week
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block text-ellipsis whitespace-nowrap">
            Add Guests
          </div>
          <div className="p-2 bg-primary rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search