import React, { useCallback } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

interface CounterProps {
  title: string,
  subtitle: string,
  value: number,
  onChange: (value: number) => void
}

const Counter: React.FC<CounterProps> = ({title, subtitle, value, onChange}) => {
  const isAddable = value != 16
  const isReducible = value != 1

  const onAdd = useCallback(() => {
    if(value === 16) return

    onChange(value + 1)

  }, [onChange, value])

  const onReduce = useCallback(() => {
    if(value === 1) return

    onChange(value - 1)

  }, [onChange, value])

  return (
    <div className='flex flex-row items-center justify-between'>
      <div className='flex flex-col'>
        <div className='font-medium'>
          {title}
        </div>
        <div className='font-light text-gray-600'>
          {subtitle}
        </div>
      </div>
      <div className='flex flex-row items-center gap-4 justify-between'>
        <button 
          type="button"
          disabled={!isReducible}
          onClick={onReduce}
          className={`
            w-10
            h-10
            rounded-full
            border-[1px]
            flex
            items-center
            justify-center
            transition
            ${!isReducible ? `
              cursor-not-allowed
            text-neutral-200 
            border-neutral-200 
            ` : `
              cursor-pointer
            text-neutral-600
            border-neutral-400
            hover:text-neutral-800
            active:text-gray-900
            hover:border-neutral-600
            active:border-neutral-800
              active:scale-95
            `}
          `}
        >
          <AiOutlineMinus />
        </button>
        <div className='w-[3ch] text-center font-light text-xl text-gray-900'>
          {value}{!isAddable && '+'}
        </div>
        <button 
          type="button"
          disabled={!isAddable}
          onClick={onAdd}
          className={`
            w-10
            h-10
            rounded-full
            border-[1px]
            flex
            items-center
            justify-center
            cursor-pointer
            transition
            ${!isAddable ? `
              cursor-not-allowed
            text-neutral-200 
            border-neutral-200 
            ` : `
              cursor-pointer
            text-neutral-600
            border-neutral-400
            hover:text-neutral-800
            active:text-gray-900
            hover:border-neutral-600
            active:border-neutral-800
              active:scale-95
            `}
          `}
        >
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  )
}

export default Counter