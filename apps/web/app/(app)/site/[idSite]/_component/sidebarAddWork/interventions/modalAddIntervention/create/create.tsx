import { TextfieldController } from "apps/web/app/_components/form/textfieldController";

export function Create() {

  return (
    <div
      className="p-4"
    >
      <div
        className="grid grid-cols-1 gap-4 w-full"
      >
        <TextfieldController
          name={`contractor.name`}
          labelProps={{
            label: "Name"
          }}
        />
      </div>
    </div>
  )
}