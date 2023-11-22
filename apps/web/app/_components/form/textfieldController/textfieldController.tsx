"use client"

import { Textfield, TextfieldProps } from "@shared-ui";
import { Controller, useFormContext } from "react-hook-form";

interface TextfieldControllerProps extends TextfieldProps {
    name: string;
}

export function TextfieldController({
    name,
    labelProps,
    inputProps,
    className,
}: TextfieldControllerProps) {

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
                <Textfield
                    className={className}
                    inputProps={{
                        ...inputProps,
                        onChange,
                        onBlur,
                        value,
                        hasError: !!error,
                        textInfo: error ? error.message : ""
                    }}
                    labelProps={labelProps}
                />
              )}
        />
    )
}