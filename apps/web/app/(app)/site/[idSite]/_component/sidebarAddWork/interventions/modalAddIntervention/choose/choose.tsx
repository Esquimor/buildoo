import { CreateOrSelect } from "../modalAddIntervention.type";
import { ChooseItem } from "./chooseItem";

interface ChooseProps {
  onChange: (value: CreateOrSelect) => void;
}

export function Choose({
  onChange
}: ChooseProps) {

  return (
    <div
      className="flex justify-between items-center p-10 h-2/3"
    >
      <ChooseItem
        title="Select an existing contractor"
        help="Choose if you already register the contractor in this app"
        onClick={() => onChange(CreateOrSelect.Select)}
      />
      <ChooseItem
        title="Create a new one"
        help="Choose if it's the fist time you work with this contractor in this app"
        onClick={() => onChange(CreateOrSelect.Create)}
      />
    </div>
  )
}