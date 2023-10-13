import { FieldValues, UseFormWatch } from 'react-hook-form'

import Counter from '@components/Inputs/Counter'
import Heading from '@components/Heading'
import ImageUpload from '@components/Inputs/ImageUpload'

interface ImagesStepProps {
  watch: UseFormWatch<FieldValues>,
  setCustomValue: (id: string, value: any) => void
}

const ImagesStep: React.FC<ImagesStepProps> = ({ watch, setCustomValue }) => {
  const imageSrc = watch('imageSrc')
  const handleImageUpload = (value: string) => setCustomValue('imageSrc', value)

  return (
    <div className='flex flex-col gap-8'>
      <Heading
        title="Add a photo of your place"
        subtitle='Show guests what your place looks like!'
      />
      <ImageUpload
        value={imageSrc}
        onChange={handleImageUpload}
      />
    </div>
  )
}

export default ImagesStep