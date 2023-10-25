import { IconType } from "react-icons"

interface ButtonProps {
  label: string,
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
  disabled?: boolean,
  icon?: IconType,
  iconClassName?: string,
  outline?: boolean,
  small?: boolean,
}

const Button: React.FC<ButtonProps> = ({ label, onClick, iconClassName, disabled, icon: Icon, outline, small }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative 
        disabled:opacity-70 
        disabled:cursor-not-allowed 
        rounded-lg 
        transition 
        w-full 
        enabled:active:scale-95
        ${outline ? `
          bg-white
          border-neutral-900
          text-neutral-900
          enabled:hover:bg-neutral-100
          enabled:active:bg-neutral-200
        ` : `
          bg-primary
          border-primary
          text-white
          enabled:hover:bg-primary-400
          enabled:hover:border-primary-400
          hover:text-white
          enabled:active:bg-primary-600
          enabled:active:border-primary-600
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
          className={`
            ${iconClassName}
            absolute
            left-4
            top-3
          `}
        />
      ) : null}
      {label}
    </button>
  )
}

export default Button