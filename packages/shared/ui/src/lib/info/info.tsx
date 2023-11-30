import { Label, LabelProps } from "../label/label";

export interface InfoProps {
  label?: string;
  value?: string;
  labelProps?: Omit<LabelProps,  "label">;
  valueProps?: Omit<LabelProps, "label">;
  className?: string;
}

export function Info({
  label,
  value,
  labelProps,
  valueProps,
  className: classNameProps = ""
}: InfoProps) {

  const className = `${classNameProps} flex flex-col`;

  return (
    <div
      className={className}
    >
      <Label
        label={label}
        weight="font-medium"
        size="text-sm"
        {...labelProps}
      />
      <Label
        label={value}
        weight="font-bold"
        color="text-blue-900"
        {...valueProps}
      />
    </div>
  )
}