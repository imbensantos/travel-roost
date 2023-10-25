import { Listing, User } from '@prisma/client'

import Container from '@components/Container'
import Heading from '@components/Heading'
import ListingCard from '@components/Listings/ListingCard'

interface WishListsClientProps{
  listings: Listing[],
  currentUser?: User | null,
}

const WishListsClient: React.FC<WishListsClientProps> = ({listings, currentUser}) => {
  return (
    <Container>
      <Heading 
        title="Wishlists"      
        subtitle="List of places you have favorited!"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map(listing => (
          <ListingCard 
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default WishListsClient