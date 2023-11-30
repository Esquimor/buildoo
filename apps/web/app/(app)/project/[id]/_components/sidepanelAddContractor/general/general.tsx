"use client";

import { ContractorType } from "@shared-type";
import { FileUploadController } from "apps/web/app/_components/form/fileUploadController/fileUploadController";
import { SelectfieldController } from "apps/web/app/_components/form/selectfieldController";
import { TextfieldController } from "apps/web/app/_components/form/textfieldController";

export function General() {

  const typeValues = Object.values(ContractorType).map(type => ({
    id: type,
    label: type
  }));

  return (
    <section>
      <div
        className="grid grid-cols-2 gap-4"
      >
        <TextfieldController
          name="name"
          labelProps={{
            label: "Name"
          }}
        />
        <SelectfieldController
          name="type"
          labelProps={{
            label: "Type"
          }}
          selectProps={{
            values: typeValues
          }}
        />
      </div>
      <div
        className="grid grid-cols-2 gap-4"
      >
        <FileUploadController
          name="decennial_civil_liability"
          labelProps={{
            label: "Rc décennal"
          }}
          fileUploadProps={{
            helpText: "Pdf only"
          }}
        />
      </div>
    </section>
  )
}