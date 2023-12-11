import { Label, LabelProps } from "../label/label";

export interface RadioProps {
  checked: boolean;
  labelProps?: LabelProps;
  className?: string;
  onClick?: () => void;
}

export function Radio({
  checked,
  labelProps,
  className: classNameProps = "",
  onClick
}: RadioProps) {

  const className = `${classNameProps} flex items-center mb-2 cursor-pointer`

  return (
    <div
      className={className}
      onClick={onClick}
    >
      <input
        type="radio"
        checked={checked}
        className="mr-2 w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      {labelProps?.label && (  
        <Label
          {...labelProps}
        />
      )}
    </div>
  )
}