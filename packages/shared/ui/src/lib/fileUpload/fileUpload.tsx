import { ChangeEvent, FormEvent } from "react";
import { Label, LabelProps } from "../label/label";

export interface FileUploadProps {
  labelProps?: LabelProps;
  helpText?: string;
  onFileChangeCapture?: (event: FormEvent<HTMLInputElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value?: string;
}

export function FileUpload({
  labelProps,
  helpText,
  onFileChangeCapture,
  onChange,
  className: classNameProps = "",
  value
}: FileUploadProps) {
  
  const classNameInput = "appearance-none border border-gray-300 rounded w-full py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

  const className = `${classNameProps} mb-3`

  return (
    <div
      className={className}
    >
      <Label {...labelProps} />
      <input
        className={classNameInput}
        aria-describedby="file_input_help"
        type="file"
        onChange={onChange}
        onChangeCapture={onFileChangeCapture}
        value={value}
      />
      {helpText && (<p
        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
      >
        {helpText}
      </p>)}
    </div>
  )
}