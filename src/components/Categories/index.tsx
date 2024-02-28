"use client"

import { usePathname, useSearchParams } from 'next/navigation'

import Container from '@components/Container'
import Category from './Category'
import { CATEGORIES_LIST } from './constants'

const Categories = () => {
  const params = useSearchParams()
  const pathname = usePathname()
  const categoryName = params?.get('category')

  const isMainPage = pathname === "/"
  
  // Hides categories if not homepage
  if(!isMainPage) return null

  return (
    <Container>
      <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
        {CATEGORIES_LIST.map((category) => (
          <Category 
            key={category.label}
            label={category.label}
            icon={category.icon}
            selected={category.label === categoryName}
          />
        ))}
      </div>
    </Container>
  )
}

export default Categories