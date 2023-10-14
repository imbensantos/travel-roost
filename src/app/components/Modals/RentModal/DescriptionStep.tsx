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
        title="How would you describe your place?"
        subtitle="Short and sweet works best!"
      />
      <Input
        id='title'
        label='Title'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <hr />
      <Input
        id='description'
        label='Description'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )
}

export default ImagesStep