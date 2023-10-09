"use client"

import { IconType } from "react-icons"

interface ButtonProps {
  label: string,
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
  disabled?: boolean,
  icon?: IconType,
  outline?: boolean,
  small?: boolean,
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled, icon: Icon, outline, small }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative 
        disabled:opacity-70 
        disabled:cursor-not-allowed 
        rounded-lg 
        hover:opacity-80
        transition 
        w-full 
        ${outline ? `
          bg-white
          border-neutral-900
          text-neutral-900
          hover:bg-neutral-100
            hover:opacity-100
        ` : `
          bg-primary
          border-primary
          text-white
        `}
        ${small ? `
          py-1 
          text-sm 
          font-light 
          border-[1px]
        ` : `
          py-3 
          text-md 
          font-semibold 
          border-2
        `}
      `}>
      {Icon ? (
        <Icon 
          size={24} 
          className="
            absolute
            left-4
            top-3
          "
        />
      ) : null}
      {label}
    </button>
  )
}

export default Button