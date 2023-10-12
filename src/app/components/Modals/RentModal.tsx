"use client"

import { useMemo, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

import useRentModal from '@hooks/useRentModal'

import Modal from '@components/Modals/Modal'
import Heading from '@components/Heading'
import { CATEGORIES_LIST } from '@components/Categories'
import CategoryInput from '@components/Inputs/CategoryInput'

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5
}

const RentModal = () => {
  const rentModal = useRentModal()

  const [step, setStep] = useState(STEPS.CATEGORY)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: ''
    }
  })

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }


  const selectedCategory = watch('category')
  const handleCategoryInput = (input: string) => setCustomValue('category', input)

  const handleBack = () => {
    if(step === STEPS.CATEGORY) return
    setStep(value => value - 1)
  }
  const handleNext = () => setStep(value => value + 1)

  const actionLabel = useMemo(() => { 
    if(step === STEPS.PRICE) return "Create"
    return 'Next'
   }, [step])

  const secondaryActionLabel = useMemo(() => { 
    if(step === STEPS.CATEGORY) return undefined
    return 'Back'
   }, [step])

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading 
        title="Which of these best describes your place?"
        subtitle='Pick a category'
      />
      <div 
        className='
          grid
          grid-cols-1
          md:grid-cols-2
          gap-3
          max-h-[50vh]
          overflow-y-auto
        '
      >
        {CATEGORIES_LIST.map(item => (
          <div key={item.label} className='col-span-1'>
            <CategoryInput
              onClick={handleCategoryInput}
              selected={item.label === selectedCategory}
              label={item.label}
              icon={item.icon}
            />
            
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <Modal 
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={handleBack}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleNext}
      title='Perch your nest!'
      body={bodyContent}
    />
  )
}

export default RentModal