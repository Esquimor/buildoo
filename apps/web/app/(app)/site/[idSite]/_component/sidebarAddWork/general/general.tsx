"use client";

import { WorkType } from "@shared-type";
import { DatepickerController } from "apps/web/app/_components/form/datapickerController";
import { RadioController } from "apps/web/app/_components/form/radioController";
import { TextareaController } from "apps/web/app/_components/form/textareaController";
import { TextfieldController } from "apps/web/app/_components/form/textfieldController";

export function General() {

  const typeValues = Object.values(WorkType).map(type => ({
    id: type,
    label: type,
    value: type
  }));

  return (
    <section>
      <div
        className="grid grid-cols-1 gap-4"
      >
        <TextfieldController
          name="name"
          labelProps={{
            label: "Name"
          }}
        />
      </div>
      <div
        className="grid grid-cols-2 gap-4"
      >
        <DatepickerController
          name="start_date"
          labelProps={{
            label: "Start date"
          }}
        />
        <DatepickerController
          name="end_date"
          labelProps={{
            label: "End date"
          }}
        />
        <RadioController
          name="type"
          values={typeValues}
          labelProps={{
            label: "Type"
          }}
        />
      </div>
      <div
        className="grid grid-cols-1 gap-4 mt-4"
      >
        <TextareaController
          name="description"
          labelProps={{
            label: "Description"
          }}
        />
      </div>
    </section>
  )
}