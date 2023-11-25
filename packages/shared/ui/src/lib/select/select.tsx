import { ChangeEvent } from "react";

export interface SelectProps {
  value?: string | number;
  values?: {
    id: string | number;
    label: string;
  }[];
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  hasError?: boolean;
  textInfo?: string;
}

export function Select({
  value,
  values = [],
  onChange,
  className: classNameProps = "",
  hasError = false,
  textInfo,
}: SelectProps) {

  let className = `${classNameProps} bg-white border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3`

  let classNameInfo = "text-xs italic"

  if (hasError) {
    className = `${className} border-red-500`

    classNameInfo = `${classNameInfo} text-red-500`
  }

  return (
    <div>
      <select
        value={value}
        onChange={onChange}
        className={className}
      >
        {values.map(valueInput => (
          <option
            key={valueInput.id}
          >
            {valueInput.label}
          </option>
        ))}
      </select>
      {textInfo != "" && (
        <p
          className={classNameInfo}
        >
          {textInfo}
        </p>
      )}
    </div>
  )
}