import { ChangeEvent } from "react";

export interface InputProps {
    id?: string;
    type?: "text" | "password";
    placeholder?: string;
    onChange?: (e: ChangeEvent<Element>) => void;
    onBlur?: (e: ChangeEvent<Element>) => void;
    value?: string;
    hasError?: boolean;
    textInfo?: string;
}

export function Input({
    id,
    type = "text",
    placeholder,
    onChange,
    onBlur,
    value,
    hasError = false,
    textInfo,
}: InputProps) {

  let className = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"

  let classNameInfo = "text-xs italic"

  if (hasError) {
    className = `${className} border-red-500`

    classNameInfo = `${classNameInfo} text-red-500`
  }

  return (
    <div>
      <input
          className={className}
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
      />
      {textInfo != "" && (
        <p
          className={classNameInfo}
        >
          {textInfo}
        </p>
      )}
    </div>
  );
}
