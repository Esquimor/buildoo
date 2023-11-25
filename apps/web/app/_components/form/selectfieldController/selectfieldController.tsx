"use client"

import { Selectfield, SelectfieldProps } from "@shared-ui";
import { Controller, useFormContext } from "react-hook-form";

interface SelectfieldControllerProps extends SelectfieldProps {
    name: string;
}

export function SelectfieldController({
    name,
    className,
    labelProps,
    selectProps,
}: SelectfieldControllerProps) {

    const {
        control,
    } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({
                field: { onChange, value },
                fieldState: { error }
            }) => (
                <Selectfield
                    className={className}
                    selectProps={{
                        ...selectProps,
                        onChange,
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