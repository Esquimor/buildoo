import { Card, Label } from "@shared-ui";

interface HeaderProps {
  label?: string;
}

export function Header({
  label
}: HeaderProps) {

  return (
    <Card
      className="mb-4"
    >
      <Label label={label} size="text-3xl" weight="font-bold" />
    </Card>
  )
}