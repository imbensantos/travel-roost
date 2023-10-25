import { useMemo } from 'react'
import { Listing, Reservation, User } from '@prisma/client'


import Container from '@components/Container'
import { CATEGORIES_LIST } from '@components/Categories/constants'
import ListingHead from '@components/Listings/ListingHead'
import ListingInfo from '@components/Listings/ListingInfo'

interface ListingClientProps {
  reservations?: Reservation[],
  listing: Listing & { user: User },
  currentUser?: User | null

}

const ListingClient: React.FC<ListingClientProps> = ({ listing, currentUser, reservations }) => {
  const category = useMemo(() => CATEGORIES_LIST.find(item => item.label === listing.category), [listing.category])

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
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient