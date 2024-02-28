import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
import { BiDollar } from "react-icons/bi"

interface InputProps {
  errors: FieldErrors
  id: string,
  label: string,
  register: UseFormRegister<FieldValues>,
  disabled?: boolean,
  formatPrice?: boolean,
  required?: boolean,
  type?: string,
}

const Input: React.FC<InputProps> = ({ errors, id, label, register, disabled, formatPrice, required, type = "text" }) => {
  return (
    <div className="w-full relative">
      {formatPrice ? (
        <BiDollar size={24} className="text-neutral-700 absolute top-5 left-2" />
      ) : null}
      <input
        id={id}
        disabled={disabled}
        type={type}
        {...register(id, { required })}
        placeholder=" "
        className={`
          peer
          w-full
          p-4
          pt-6
          font-light
          bg-white
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-danger ' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-danger ' : 'focus:border-neutral-900'}
        `}
      />
      <label 
        className={`
          absolute
          text-md
          duration-150
          transform
          -translate-y-3
          top-5
          z-10
          origin-[0]
          ${formatPrice ? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? 'text-danger' : 'text-zinc-400'}
        `}
        htmlFor="">
        {label}
      </label>
    </div>
  )
}

export default Input