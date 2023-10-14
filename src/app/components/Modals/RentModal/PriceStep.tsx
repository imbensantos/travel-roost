import { FieldErrors, FieldValues, UseFormRegister, UseFormWatch } from 'react-hook-form'

import Heading from '@components/Heading'
import Input from '@components/Inputs/Input'

interface ImagesStepProps {
  isLoading: boolean,
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors<FieldValues>,
}

const ImagesStep: React.FC<ImagesStepProps> = ({ isLoading, register, errors }) => {
  return (
    <div className='flex flex-col gap-8'>
      <Heading
        title="Now, set your price"
        subtitle="How much do you charge per night?"
      />
      <Input
        id='price'
        label='Price'
        formatPrice
        type="number"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )
}

export default ImagesStep