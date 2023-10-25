import { FieldValues, UseFormWatch } from 'react-hook-form'

import Heading from '@components/Heading'
import CategoryInput from '@components/Inputs/CategoryInput'

import { CATEGORIES_LIST } from '@components/Categories/constants'

interface CategoryStepProps {
  watch: UseFormWatch<FieldValues>,
  setCustomValue: (id: string, value: any) => void
}

const CategoryStep: React.FC<CategoryStepProps> = ({watch, setCustomValue}) => {
  
  const selectedCategory = watch('category')
  const handleCategoryInput = (input: string) => setCustomValue('category', input)

  return (
    <div className='flex flex-col gap-8'>
      <Heading 
        title="Which of these best describes your place?"
        subtitle='Pick a category'
      />
      <div 
        className='
          grid
          grid-cols-1
          md:grid-cols-2
          gap-3
          max-h-[50vh]
          overflow-y-auto
        '
      >
        {CATEGORIES_LIST.map(item => (
          <div key={item.label} className='col-span-1'>
            <CategoryInput
              onClick={handleCategoryInput}
              selected={item.label === selectedCategory}
              label={item.label}
              icon={item.icon}
            />
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryStep