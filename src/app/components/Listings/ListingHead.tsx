import Image from "next/image"
import { User } from "@prisma/client"

import useCountries from "@hooks/useCountries"

import Heading from "@components/Heading"
import HeartButton from "../HeartButton"


interface ListingHeadProps {
  id: string,
  title: string,
  imageSrc: string,
  locationValue: string,
  currentUser?: User | null,
}

const ListingHead: React.FC<ListingHeadProps> = ({
  id,
  title,
  imageSrc,
  locationValue,
  currentUser,
}) => {
  const { getByValue } = useCountries()
  const location = getByValue(locationValue)

  return (
    <>
      <Heading 
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] bg-neutral-50 overflow-hidden rounded-xl relative">
        <Image 
          alt={`${title}`}
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton 
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
  )
}

export default ListingHead