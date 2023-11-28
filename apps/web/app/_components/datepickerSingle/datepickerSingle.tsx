"use client"

import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

interface DatepickerSingleProps {
  value: DateValueType;
  onChange: (value: DateValueType) => void;
  className?: string;
}

export function DatepickerSingle({
  value,
  onChange,
  className: classNameProps = "",
}: DatepickerSingleProps) {

  const className = `${classNameProps} appearance-none border border-gray-300 rounded w-full py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`

  return (
    <Datepicker 
      asSingle={true} 
      value={value} 
      onChange={onChange} 
      displayFormat={"DD/MM/YYYY"}
      inputClassName={className}
      startWeekOn="mon" 
    /> 
  )
}