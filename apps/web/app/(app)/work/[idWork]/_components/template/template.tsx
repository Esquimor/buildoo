import { Label } from "@shared-ui";
import { ReactNode } from "react";

interface TemplateProps {
  header: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function Template({
  header,
  actions,
  children,
}: TemplateProps) {

  return (
    <section
      className="p-4 bg-white rounded h-full"
    >
      <header
        className="flex justify-between items-center mb-4"
      >
        <Label
          label={header}
          size="text-2xl"
          weight="font-bold"
        />
        {actions}
      </header>
      {children}
    </section>
  )
}