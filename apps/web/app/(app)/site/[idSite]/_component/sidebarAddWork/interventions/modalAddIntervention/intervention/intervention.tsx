import { DatepickerController } from "apps/web/app/_components/form/datapickerController";
import { TextfieldController } from "apps/web/app/_components/form/textfieldController";

export function Intervention() {
  
  return (
    <div
      className="flex flex-col p-4"
    >
      <div
        className="grid grid-cols-2 gap-4 w-full"
      >
        <TextfieldController
          name="name"
          labelProps={{
            label: "Name"
          }}
        />
      </div>
      <div
        className="grid grid-cols-2 gap-4 w-full"
      >
        <DatepickerController
          name="start_date"
          labelProps={{
            label: "Start Date"
          }}
        />
        <DatepickerController
          name="end_date"
          labelProps={{
            label: "End Date"
          }}
        />
      </div>
    </div>
  )
}