import { Step } from "../step/step";

export interface StepperProps {
  values: string[];
  value: number;
  className?: string;
  onChange?: (value: number) => void;
}

export function Stepper({
  values,
  value,
  className: classNameProps = "",
  onChange,
}: StepperProps) {

  const className = `${classNameProps} flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base`

  return (
    <ol
      className={className}
    >
      {values.map((val, index) => (
        <Step
          key={val}
          title={val}
          index={index}
          selected={index === value}
          onClick={() => onChange?.(index)}
          last={index === (values.length - 1)}
        />
      ))}
    </ol>
  )
}