"use client"

import { useCallback, useMemo, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

import useRentModal from '@hooks/useRentModal'

import Modal from '@components/Modals/Modal'
import CategoryStep from './CategoryStep'
import LocationStep from './LocationStep'
import InfoStep from './InfoStep'
import ImagesStep from './ImagesStep'

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
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: ''
    }
  })

  const setCustomValue = useCallback((id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }, [setValue])

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

   // let bodyContent = <CategoryStep watch={watch} setCustomValue={setCustomValue} />

  const bodyContent = (() => {
    switch(step){
      case STEPS.CATEGORY: 
        return <CategoryStep watch={watch} setCustomValue={setCustomValue} />
      

      case STEPS.LOCATION: 
        return <LocationStep watch={watch} setCustomValue={setCustomValue} />
      

      case STEPS.INFO: 
        return <InfoStep watch={watch} setCustomValue={setCustomValue} />

      case STEPS.IMAGES:
        return <ImagesStep watch={watch} setCustomValue={setCustomValue} />

      default:
        return <></>
    }
  })()

  // if(step === STEPS.LOCATION) bodyContent = <LocationStep watch={watch} setCustomValue={setCustomValue} />

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