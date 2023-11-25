import { Select, SelectProps } from "../select/select";
import { Label, LabelProps } from "../label/label";

export interface SelectfieldProps {
  className?: string;
  selectProps: SelectProps;
  labelProps?: LabelProps;
}

export function Selectfield({
  className,
  selectProps,
  labelProps
}: SelectfieldProps) {

  return (
    <div
      className={className}
    >
      <Label {...labelProps} className={`${labelProps?.className} mb-2`} />
      <Select {...selectProps} />
    </div>
  );
}
