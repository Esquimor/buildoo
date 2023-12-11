"use client"

import { Label, LabelProps, Textarea, TextareaProps } from "@shared-ui";
import { Controller, useFormContext } from "react-hook-form";

interface TextareaControllerProps extends TextareaProps {
    name: string;
    labelProps?: LabelProps;
}

export function TextareaController({
    name,
    labelProps,
    className,
    ...rest
}: TextareaControllerProps) {

    const {
      control,
    } = useFormContext();

    return (
      <Controller
        control={control}
        name={name}
        render={({
            field: { onChange, onBlur, value },
            fieldState: { error }
        }) => (
          <div
            className={className}
          >
            {labelProps && <Label {...labelProps} className={`${labelProps?.className} mb-2`} />}
            <Textarea
                className={className}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                {...rest}
            />
          </div>
          )}
      />
    )
}