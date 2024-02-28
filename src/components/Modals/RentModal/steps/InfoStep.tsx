import { FieldValues, UseFormWatch } from 'react-hook-form'

import Counter from '@components/Inputs/Counter'
import Heading from '@components/Heading'

interface InfoStepProps {
  watch: UseFormWatch<FieldValues>,
  setCustomValue: (id: string, value: any) => void
}

const InfoStep: React.FC<InfoStepProps> = ({ watch, setCustomValue }) => {
  const guestCount = watch('guestCount') || 1
  const roomCount = watch('roomCount') || 1
  const bathroomCount = watch('bathroomCount') || 1

  const handleGuestCountInput = (value:number) => setCustomValue('guestCount', value)
  const handleRoomCountInput = (value:number) => setCustomValue('roomCount', value)
  const handleBathroomCountInput = (value:number) => setCustomValue('bathroomCount', value)
  

  return (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Share some basics about your place'
        subtitle="What amenities do you have?"
      />
      <Counter
        title='Guests'
        subtitle='How many guests do you allow?'
        value={guestCount}
        onChange={handleGuestCountInput}
      />
      <hr />
      <Counter
        title='Rooms'
        subtitle='How many rooms do you have?'
        value={roomCount}
        onChange={handleRoomCountInput}
      />
      <hr />
      <Counter
        title='Bathroom'
        subtitle='How many bathrooms do you have?'
        value={bathroomCount}
        onChange={handleBathroomCountInput}
      />
    </div>
  )
}

export default InfoStep