"use client"

import Select from "react-select"

import useCountries from "@hooks/useCountries"

export type CountrySelectionValue = {
  flag: string,
  label: string,
  latlng: number[],
  region: string,
  value: string
}

interface CountrySelectionProps {
  value?: CountrySelectionValue,
  onChange: (value: CountrySelectionValue) => void
}

const CountrySelection: React.FC<CountrySelectionProps> = ({ value, onChange }) => {
  const { getAll } = useCountries()

  return (
    <div>
      <Select 
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={value => onChange(value as CountrySelectionValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label}, 
              <span className="focus:text-neutral-200 text-neutral-600 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg'
        }}
        theme={theme => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: '#141d0f',
            primary25: '#ddead7',
            primary50: '#C1D9B6'
          }
        })}
      />
    </div>
  )
}

export default CountrySelection