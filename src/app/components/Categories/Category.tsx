"use client"

import { useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { IconType } from "react-icons"
import queryString from "query-string"

interface CategoryProps {
  label: string,
  icon: IconType,
  selected?: boolean
}

const Category: React.FC<CategoryProps> = ({ label, icon: Icon, selected }) => {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback(() => {
    let currentQuery = {}

    if (params) {
      // we do this so we don't overwrite any pre-existing queries when updating the category
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label
    }

    if (params?.get('category') === label) {
      delete updatedQuery.category
    }

    const url = queryString.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true})

    router.push(url)
  }, [label, params, router])


  return (
    <div
      onClick={handleClick}
      className={`
        border-b-2
        transition
        cursor-pointer
        group
        ${selected ? 'border-b-neutral-900' : 'border-transparent hover:border-b-neutral-200'}
        ${selected ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'}
      `}
    >
      <div
        className="
          flex
          flex-col
          items-center
          justify-center
          gap-2
          p-3
          group-active:scale-95 
          transition
        "
      >
        <Icon size={25} />
        <div className="font-semibold text-xs whitespace-nowrap">
          {label}
        </div>
      </div>
    </div>
  )
}

export default Category