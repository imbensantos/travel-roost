"use client"

import { IconType } from "react-icons"

interface CategoryInputProps {
  icon: IconType
  label: string,
  onClick: (value: string) => void,
  selected?: boolean
}

const CategoryInput: React.FC<CategoryInputProps> = ({icon: Icon, label, onClick, selected}) => {
  return (
    <button
      onClick={() => onClick(label)}
      className={`
        w-full
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        transition
        cursor-pointer
        active:scale-95
        ${selected ? 'border-gray-900' : 'border-neutral-200 hover:border-neutral-900'}
        ${selected ? 'text-gray-900' : 'text-neutral-700 hover:text-neutral-900'}
        ${selected ? 'bg-neutral-25' : ''}
      `}
    >
      <Icon size={30} />
      <span className="font-semibold">{label}</span>
    </button>
  )
}

export default CategoryInput