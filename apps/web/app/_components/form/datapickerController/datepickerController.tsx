"use client"

import { Label, LabelProps } from "@shared-ui";
import { Controller, useFormContext } from "react-hook-form";
import { DatepickerSingle } from "../../datepickerSingle";

interface DatepickerControllerProps {
    name: string;
    labelProps: LabelProps
}

export function DatepickerController({
    name,
    labelProps,
}: DatepickerControllerProps) {

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
                <div
                  className="mb-3"
                >
                  <Label {...labelProps} className={`${labelProps?.className} mb-2`} />
                  <DatepickerSingle 
                    value={value} 
                    onChange={onChange}
                  /> 
                </div>
              )}
        />
    )
}