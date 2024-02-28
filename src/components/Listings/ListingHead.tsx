import Image from "next/image"
import { User } from "@prisma/client"

import useCountries from "@hooks/useCountries"

import Heading from "@components/Heading"
import HeartButton from "../HeartButton"
import { IoChevronBackCircle } from "react-icons/io5"


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
      <div className="flex flex-row gap-5 items-center justify-start relative">
        <span className="text-neutral-200 text-lg lg:absolute top-0 right-[105%]">
          <IoChevronBackCircle size={48} />
        </span>
        <Heading 
          title={title}
          subtitle={`${location?.region}, ${location?.label}`}
        />
      </div>
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