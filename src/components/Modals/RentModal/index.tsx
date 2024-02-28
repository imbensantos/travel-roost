"use client"

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation' 
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'

import useRentModal from '@hooks/useRentModal'

import Modal from '@components/Modals/Modal'
import CategoryStep from './steps/CategoryStep'
import LocationStep from './steps/LocationStep'
import InfoStep from './steps/InfoStep'
import ImagesStep from './steps/ImagesStep'
import DescriptionStep from './steps/DescriptionStep'
import PriceStep from './steps/PriceStep'

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5
}

const RentModal = () => {
  const router = useRouter()
  const rentModal = useRentModal()

  const rentData = rentModal?.data
  const isUpdating = !!rentData
  
  const [isLoading, setIsLoading] = useState(false)
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
    if(step === STEPS.PRICE) return isUpdating ? "Update" : "Create"
    return 'Next'
   }, [step, isUpdating])

  const secondaryActionLabel = useMemo(() => { 
    if(step === STEPS.CATEGORY) return undefined
    return 'Back'
   }, [step])

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if(step != STEPS.PRICE){
      return handleNext()
    }
    
    setIsLoading(true)
    axios.post('/api/listings', data)
    .then(() => { 
      toast.success('Listing created!')
      router.refresh()
      reset()
      setStep(STEPS.CATEGORY)
      rentModal.onClose()
    }).catch(() => { toast.error('Something went wrong.') })
    .finally(() => { setIsLoading(false) })
  }

  const onUpdate: SubmitHandler<FieldValues> = data => {
    if(step != STEPS.PRICE){
      return handleNext()
    }

    setIsLoading(true)
    axios.put(`/api/listings/${rentData?.id}`, {...data, listingId: rentData?.id})
    .then(() => {
      toast.success('Listing updated!')
      router.refresh()
      reset()
      setStep(STEPS.CATEGORY)
      rentModal.onClose()
    }).catch(() => { toast.error('Something went wrong.') })
    .finally(() => { setIsLoading(false) })
  }

  const bodyContent = (() => {
    switch(step){
      default:
      case STEPS.CATEGORY: 
        return <CategoryStep watch={watch} setCustomValue={setCustomValue} />

      case STEPS.LOCATION: 
        return <LocationStep watch={watch} setCustomValue={setCustomValue} />
      
      case STEPS.INFO: 
        return <InfoStep watch={watch} setCustomValue={setCustomValue} />

      case STEPS.IMAGES:
        return <ImagesStep watch={watch} setCustomValue={setCustomValue} />

      case STEPS.DESCRIPTION:
        return (
          <DescriptionStep isLoading={isLoading} register={register} errors={errors} />
        )
      case STEPS.PRICE:
        return (
          <PriceStep isLoading={isLoading} register={register} errors={errors} />
        )
    }
  })()

  useEffect(() => {
    if(rentData){
      reset({
        category: rentData?.category,
        location: rentData?.location,
        guestCount: rentData?.guestCount,
        roomCount: rentData?.roomCount,
        bathroomCount: rentData?.bathroomCount,
        imageSrc: rentData?.imageSrc,
        price: rentData?.price,
        title: rentData?.title,
        description: rentData?.description
      })
    }
  }, [rentData, reset])

  return (
    <Modal 
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={handleBack}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(isUpdating ? onUpdate : onSubmit)}
      title='Perch your nest!'
      body={bodyContent}
    />
  )
}

export default RentModal