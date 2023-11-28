"use client"

import { FileUpload, FileUploadProps, Label, LabelProps } from "@shared-ui";
import { Controller, useFormContext } from "react-hook-form";

interface FileUploadControllerProps {
    name: string;
    labelProps?: LabelProps;
    fileUploadProps?: Omit<FileUploadProps, "value" | "onChange">
}

export function FileUploadController({
    name,
    labelProps,
    fileUploadProps,
}: FileUploadControllerProps) {

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
                  <FileUpload
                    value={value?.fileName}
                    onChange={(event) => {
                      if (event.target.files)
                        onChange(event.target.files[0]);
                    }}
                    {...fileUploadProps}
                  />
                </div>
              )}
        />
    )
}