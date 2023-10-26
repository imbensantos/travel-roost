import React from 'react'

const Footer = () => {
  const yearToday = new Date().getFullYear()

  return (
    <footer className='fixed bottom-0 z-10 w-full py-4 bg-white border-t-[1px] border-neutral-200 shadow-sm'>
      <small className='flex flex-row items-center justify-around'>
        &copy; {yearToday} Travel Roost. All rights reserved.
      </small>
    </footer>
  )
}

export default Footer