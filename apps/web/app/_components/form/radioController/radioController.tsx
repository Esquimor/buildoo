"use client"

import { Label, LabelProps, Radio } from "@shared-ui";
import { Controller, useFormContext } from "react-hook-form";

interface RadioControllerProps {
  name: string;
  values: {
    id: string;
    label: string;
    value: string | number | null;
  }[];
  labelProps?: LabelProps;
}

export function RadioController({
    name,
    values,
    labelProps
}: RadioControllerProps) {

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
        <div>
          {labelProps && <Label {...labelProps} className={`${labelProps?.className} mb-2`} />}
          {values.map(val => (
            <Radio
              key={val.id}
              checked={val.value === value}
              labelProps={{
                label: val.label
              }}
              onClick={() => onChange(val.value)}
            />
          ))}
        </div>
      )}
    />
  )
}