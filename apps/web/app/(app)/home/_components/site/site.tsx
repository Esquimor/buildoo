import { Label } from "@shared-ui";

export interface SiteProps {
  name: string;
  id: string;
}

export function Site({
  name,
  id
}: SiteProps) {

  return (
    <div
      className="flex justify-between bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full"
    >
      <Label
        label={name}
        size="text-2xl"
        weight="font-bold"
      />
      <a
        href={`/site/${id}`}
      >
        Link
      </a>
    </div>
  )
}