import { User } from '@prisma/client'
import { IconType } from 'react-icons'
import dynamic from 'next/dynamic'

import useCountries from '@hooks/useCountries'
import Avatar from '@components/Avatar'
import ListingCategory from './ListingCategory'
import Heading from '@components/Heading'

const Map = dynamic(() => import('@components/Map'), { ssr: false })

interface ListingInfoProps {
  user: User,
  category: {
    icon: IconType,
    label: string,
    description: string,
  } | undefined,
  description: string,
  roomCount: number,
  guestCount: number,
  bathroomCount: number,
  locationValue: string,
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
}) => {
  const { getByValue } = useCountries()
  const coordinates = getByValue(locationValue)?.latlng

  return (
    <div className='col-span-4 flex flex-col gap-8'>
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <span>Hosted by {user?.name}</span>
          <Avatar
            src={user?.image}
          />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <span>{guestCount} guests</span>
          <span>{roomCount} rooms</span>
          <span>{bathroomCount} bathrooms</span>
        </div>
      </div>
      <hr />
      {category ? (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      ) : null}
      <hr />
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          About this place
        </div>
        <div className="text-lg font-light text-neutral-500">
          {description}
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          Where you&apos;ll be
        </div>
        <Map center={coordinates} />
      </div>
    </div>
  )
}

export default ListingInfo