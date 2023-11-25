"use client"

import { Label, LabelProps } from "@shared-ui";
import { Controller, useFormContext } from "react-hook-form";
import Datepicker from "react-tailwindcss-datepicker";

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
                  <Datepicker 
                    asSingle={true} 
                    value={value} 
                    onChange={onChange} 
                    displayFormat={"DD/MM/YYYY"}
                    inputClassName="appearance-none border border-gray-300 rounded w-full py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  /> 
                </div>
              )}
        />
    )
}