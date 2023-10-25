"use client"

import { useCallback, useMemo } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Listing, Reservation, User } from '@prisma/client'
import { format } from 'date-fns'

import useCountries from '@hooks/useCountries'

import HeartButton from '@components/HeartButton'
import Button from '@components/Button'


interface ListingCardProps {
  data: Listing,
  reservation?: Reservation,
  onAction?: (id: string) => void,
  onSecondaryAction?: (id: string) => void,
  disabled?: boolean,
  actionLabel?: string,
  secondaryActionLabel?: string,
  actionId?: string,
  currentUser?: User | null,
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  onSecondaryAction,
  disabled,
  actionLabel,
  secondaryActionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter()
  const { getByValue } = useCountries()

  const location = getByValue(data.locationValue)

  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice.toLocaleString('us')
    return data.price.toLocaleString('us')

  }, [reservation, data.price])

  const reservationDate = useMemo(() => {
    if (!reservation) return null

    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)

    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  }, [reservation])

  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) return
    onAction?.(actionId)
    
  }, [onAction, actionId, disabled])

  const handleEdit = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (disabled) return

    onSecondaryAction?.(actionId)

  }, [disabled, actionId, onSecondaryAction])

  const handleClick = () => router.push(`/listings/${data.id}`)


  return (
    <div
      onClick={handleClick}
      className='col-span-1 cursor-pointer group'
    >
      <div className='flex flex-col gap-2 w-full'>
        <div className='aspect-square w-full relative overflow-hidden rounded-xl'>
          <Image
            fill
            alt={`${data.title} Listing`}
            src={data.imageSrc}
            className='
              object-cover
              h-full
              w-full
              group-hover:scale-110
              transition
            '
          />
          <div className='absolute top-3 right-3'>
            <HeartButton 
              listingId={data.id}
              currentUser={currentUser}
            />
          </div>
        </div>
        <div className='font-semibold text-lg'>
          {location?.region}, {location?.label}
        </div>
        <div className='font-light text-neutral-500'>
          {reservationDate || data.category}
        </div>
        <div>
          <span className='font-semibold'>
            ${price}
          </span>
          {!reservation ? (
            <span className='font-light'> night</span>
          ) : null}
        </div>
        {onSecondaryAction && secondaryActionLabel ? (
          <Button 
            disabled={disabled}
            small
            label={secondaryActionLabel}
            onClick={handleEdit}
            outline
          />
        ) : null}
        {onAction && actionLabel ? (
          <Button 
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        ) : null}
      </div>
    </div>
  )
}

export default ListingCard