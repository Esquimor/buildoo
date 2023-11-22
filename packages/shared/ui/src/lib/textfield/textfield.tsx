import { Input, InputProps } from "../input/input";
import { Label, LabelProps } from "../label/label";

export interface TextfieldProps {
  className?: string;
  inputProps?: InputProps;
  labelProps?: LabelProps;
}

export function Textfield({
  className,
  inputProps,
  labelProps
}: TextfieldProps) {

  return (
  <div
    className={className}
  >
    <Label {...labelProps} className={`${labelProps?.className} mb-2`} />
    <Input {...inputProps} />
  </div>
  );
}
