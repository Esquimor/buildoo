import { Button, Label } from "@shared-ui";
import { Work, WorkProps } from "../work";

interface WorksProps {
  onAdd: () => void;
  works: WorkProps[]
}

export function Works({
  onAdd,
  works
}: WorksProps) {

  return (
    <div
      className="flex flex-col w-full"
    >
      <div
        className="flex justify-between items-center border-b-2 border-gray-400 pb-2"
      >
        <Label
          label="Works"
          size="text-2xl"
          weight="font-bold"
        />
        <Button
          onClick={onAdd}
          label="Add a work"
        />
      </div>
      <div>
        {works.length === 0 ? (
            <div
              className="flex justify-center pt-2"
            >
              <Label
                label="No work found"
              />
            </div>
          ) : (
            works.map(work => (
              <Work
                key={work.id}
                id={work.id}
                name={work.name}
              />
            ))
          )
        }
      </div>
    </div>
  )
}