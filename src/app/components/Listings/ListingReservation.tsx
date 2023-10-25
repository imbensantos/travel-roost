import { Range } from "react-date-range"
import Calendar from "@components/Inputs/Calendar"
import Button from "@components/Button"

interface ListingReservationProps {
  price: number,
  serviceFee: number,
  totalPrice: number,
  onChangeDate: (value: Range) => void,
  dateRange: Range,
  onSubmit: () => void,
  disabled?: boolean,
  disabledDates: Date[],
  dayCount: number,
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  serviceFee,
  totalPrice,
  onChangeDate,
  dateRange,
  onSubmit,
  disabled,
  disabledDates,
  dayCount
}) => {
  const isInvalid = dayCount === 0
  const stayPrice = price * dayCount

  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <span className="text-2xl font-semibold">
          ${price}
        </span>
        <span className="font-light text-neutral-600"> night</span>
      </div>
      <hr />
      <Calendar 
        value={dateRange}
        disabledDates={disabledDates}
        onChange={value => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button
          disabled={disabled || isInvalid}
          label="Reserve"
          onClick={onSubmit}
        />
      </div>
      {!isInvalid ? (
        <>
          <div className="flex flex-row items-center justify-between font-light text-lg px-4 pt-4 pb-2">
            <span>${price} x {dayCount} {dayCount > 1 ? 'nights' : 'night'}</span>
            <span>${stayPrice}</span>
          </div>
          <div className="flex flex-row items-center justify-between font-light text-lg px-4 pb-4 pt-2">
            <span>Travel Roost service fee</span>
            <span>${serviceFee}</span>
          </div>
          <hr />
          <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${totalPrice}</span>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default ListingReservation