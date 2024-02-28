"use client"

import { useCallback, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Range } from 'react-date-range'
import queryString from 'query-string'
import { formatISO } from 'date-fns'

import useSearchModal from '@hooks/useSearchModal'

import Modal from './Modal'
import Heading from '@components/Heading'
import CountrySelection, { CountrySelectionValue } from '@components/Inputs/CountrySelection'
import Calendar from '@components/Inputs/Calendar'
import Counter from '@components/Inputs/Counter'

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2
}

const SearchModal = () => {
  const router = useRouter()
  const params = useSearchParams()
  const searchModal = useSearchModal()

  const [step, setStep] = useState(STEPS.LOCATION)
  const [location, setLocation] = useState<CountrySelectionValue>()
  const [guestCount, setGuestCount] = useState(1)
  const [roomCount, setRoomCount] = useState(1)
  const [bathroomCount, setBathroomCount] = useState(1)
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  })

  // NOTE: selectedLocation is a necessary dependency as this is a workaround for Leaflet
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Map = useMemo(() => dynamic(() => import('@components/Map'), { ssr: false }), [location])

  const onBack = useCallback(() => setStep(value => value - 1), [])
  const onNext = useCallback(() => setStep(value => value + 1), [])

  const onSubmit = useCallback(async () => {
    if (step != STEPS.INFO) return onNext()

    let currentQuery = {}

    if (params) currentQuery = queryString.parse(params.toString())

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount
    }

    if (dateRange.startDate) updatedQuery.startDate = formatISO(dateRange.startDate)
    if (dateRange.endDate) updatedQuery.endDate = formatISO(dateRange.endDate)

    const url = queryString.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true })

    setStep(STEPS.LOCATION)
    searchModal.onClose()
    router.push(url)

  }, [
    bathroomCount,
    dateRange.endDate,
    dateRange.startDate,
    guestCount,
    location?.value,
    onNext,
    params,
    roomCount,
    router,
    searchModal,
    step
  ])

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) return "Search"
    return "Next"
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) return undefined
    return "Back"
  }, [step])


  const bodyContent = (() => {
    switch(step){
      default:
      case STEPS.LOCATION: 
        return (
          <div className="flex flex-col gap-8">
            <Heading
              title='Where do you wanna go?'
              subtitle='Find the perfect location!'
            />
            <CountrySelection
              value={location}
              onChange={value => setLocation(value as CountrySelectionValue)}
            />
            <hr />
            <div className='h-[35vh] w-full rounded-lg bg-neutral-50'>
              <Map center={location?.latlng} />
            </div>
          </div>
        )

      case STEPS.DATE: 
        return (
          <div className="flex flex-col gap-8">
            <Heading
              title='When do you wanna go?'
              subtitle='Make sure everyone is free!'
            />
            <Calendar 
              value={dateRange}
              onChange={value => setDateRange(value.selection)}
            />
          </div>
        )
      
      case STEPS.INFO: 
        return (
          <div className="flex flex-col gap-8">
            <Heading
              title='More information'
              subtitle='What amenities do you need?'
            />
            <Counter
              title='Guests'
              subtitle='How many guests are coming?'
              value={guestCount}
              onChange={value => setGuestCount(value)}
            />
            <hr />
            <Counter
              title='Rooms'
              subtitle='How many rooms do you need?'
              value={roomCount}
              onChange={value => setRoomCount(value)}
            />
            <hr />
            <Counter
              title='Bathroom'
              subtitle='How many bathrooms do you need?'
              value={bathroomCount}
              onChange={value => setBathroomCount(value)}
            />
          </div>
        )
    }
  })()


  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title='Filters'
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={onBack}
      body={bodyContent}
    />
  )
}

export default SearchModal