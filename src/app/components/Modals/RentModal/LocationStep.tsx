import { FieldValues, UseFormWatch } from 'react-hook-form'

import Heading from '@components/Heading'
import CountrySelection, { CountrySelectionValue } from '@components/Inputs/CountrySelection'
import { useMemo } from 'react'
import dynamic from 'next/dynamic'

interface CategoryStepProps {
  watch: UseFormWatch<FieldValues>,
  setCustomValue: (id: string, value: any) => void
}

const LocationStep: React.FC<CategoryStepProps> = ({ watch, setCustomValue }) => {

  const selectedLocation = watch('location')
  const handleCountrySelection = (value: CountrySelectionValue) => setCustomValue('location', value)
  
  // selectedLocation is a necessary dependency as this is a workaround for Leaflet
  const Map = useMemo(() => dynamic(() => import('@components/Map'), { ssr: false }), [selectedLocation]) 
  

  return (
    <div className='flex flex-col gap-8'>
      <Heading
        title="Where's your place located?"
        subtitle='Help guests find you!'
      />
      <CountrySelection
        value={selectedLocation}
        onChange={handleCountrySelection}
      />
      <div className='h-[35vh] w-full rounded-lg bg-neutral-50'>
        <Map center={selectedLocation?.latlng} />
      </div>
    </div>
  )
}

export default LocationStep