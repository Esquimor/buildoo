import { Card, Label } from "@shared-ui";
import { MouseEvent } from "react";

interface ChooseItemProp {
  title: string;
  help: string;
  onClick: (event: MouseEvent<HTMLElement>) => void;
}

export function ChooseItem({
  title,
  help,
  onClick
}: ChooseItemProp) {

  return (
    <Card
      className="flex flex-col cursor-pointer w-[30rem]"
      onClick={onClick}
    >
      <Label
        label={title}
        size="text-4xl"
        weight="font-bold"
        className="pb-10 h-32"
      />
      <Label
        label={help}
        size="text-sm"
      />
    </Card>
  )
}