"use client"

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Listing, Reservation, User } from '@prisma/client'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'


import Container from '@components/Container'
import { CATEGORIES_LIST } from '@components/Categories/constants'
import ListingHead from '@components/Listings/ListingHead'
import ListingInfo from '@components/Listings/ListingInfo'
import ListingReservation from '@components/Listings/ListingReservation'

import useLoginModal from '@hooks/useLoginModal'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Range } from 'react-date-range'

const initialDateRange = {
  startDate: undefined,
  endDate: new Date(""),
  key: 'selection'
}

interface ListingClientProps {
  reservations?: Reservation[],
  listing: Listing & { user: User },
  currentUser?: User | null

}

const ListingClient: React.FC<ListingClientProps> = ({ listing, currentUser, reservations = [] }) => {
  const loginModal = useLoginModal()
  const router = useRouter()
  
  const [isLoading, setIsLoading] = useState(false)
  const [stayPrice, setStayPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)
  const [dayCount, setDayCount] = useState(0)

  const serviceFee = Math.round(stayPrice * .14)
  const totalPrice = stayPrice + serviceFee
  

  const disabledDates = useMemo(() => {
    let dates: Date[] = []

    reservations.forEach(reservation => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      })

      dates = [...dates, ...range]
    })

    return dates
  }, [reservations])

  const onCreateReservation = useCallback(() => {
    if (!currentUser) return loginModal.onOpen()

    setIsLoading(true)

    axios.post('/api/reservations', {
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing?.id
    })
      .then(() => {
        toast.success('Listing reserved!')
        setDateRange(initialDateRange)
        router.push('/trips')
      })
      .catch(() => { toast.error('Something went wrong.') })
      .finally(() => { setIsLoading(false) })
  }, [
    currentUser,
    dateRange.startDate,
    dateRange.endDate,
    listing?.id,
    loginModal,
    router,
    totalPrice
  ])

  const category = useMemo(() => CATEGORIES_LIST.find(item => item.label === listing.category), [listing.category])

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      setDayCount(differenceInCalendarDays(dateRange.endDate, dateRange.startDate))

      if (dayCount && listing.price) {
        setStayPrice((dayCount * listing.price))
      } else {
        setStayPrice(listing.price)
      }

    }

  }, [
    dateRange.startDate,
    dateRange.endDate,
    listing.price,
    dayCount,
    stayPrice,
    serviceFee
  ])

  return (
    <Container>
      <div className='max-w-screen-lg max-auto'>
        <div className='flex flex-col gap-6'>
          <ListingHead
            id={listing.id}
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            currentUser={currentUser}
          />
          <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                serviceFee={serviceFee}
                totalPrice={totalPrice}
                onChangeDate={value => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
                dayCount={dayCount}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient