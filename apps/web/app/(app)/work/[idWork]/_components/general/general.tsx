import { Work } from "@server/works/works.entity";
import { Template } from "../template";
import { Info } from "@shared-ui";

interface GeneralProps {
  work: Work;
}

export function General({
  work
}: GeneralProps) {

  return (
    <Template
      header="General"
    >
      <div
        className="grid grid-cols-2 gap-4"
      >
        <Info
          label="Name"
          value={work.name}
        />
        <Info
          label="Type"
          value={work.type}
        />
        <Info
          label="Start date"
          value={work.start_date.toLocaleString()}
        />
        <Info
          label="End date"
          value={work.end_date.toLocaleString()}
        />
      </div>
      <div
        className="grid grid-cols-1 gap-4 mt-4"
      >
        <Info
          label="Description"
          value={work.description != "" ? work.description : "No description"}
        />
      </div>
    </Template>
  )
}