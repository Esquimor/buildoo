import { Label, LabelProps } from "../label/label";

export interface CheckboxProps {
  value: boolean;
  labelProps?: LabelProps;
  className?: string;
  onClick?: () => void;
}

export function Checkbox({
  value,
  labelProps,
  className: classNameProps = "",
  onClick
}: CheckboxProps) {

  const className = `${classNameProps} flex items-center`

  return (
    <div
      className={className}
      onClick={onClick}
    >
      <input
        id="default-checkbox"
        type="checkbox"
        checked={value}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      {labelProps?.label && (  
        <Label
          {...labelProps}
        />
      )}
    </div>
  )
}