import { ReactNode, useState } from "react";

export interface AccordionProps {
  items: {
    id: string|number;
    title: string;
    children: ReactNode;
  }[];
  className?: string;
}

export function Accordion({
  items,
  className: classNameProps = "",
}: AccordionProps) {

  const [open, setOpen] = useState<string|number>("")

  const handleClick = (id: string|number) => {
    if (open === id) {
      setOpen("")
    } else {
      setOpen(id)
    }
  }

  return (
    <div
      className={classNameProps}
    >
      {items.map(item => (
        <div key={item.id}>
          <h2>
            <button
              type="button"
              className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
              onClick={() => handleClick(item.id)}
            >
              <span>{item.title}</span>
              {item.id === open ? '\u25BC' : '\u25B6'}
            </button>
          </h2>
          <div
            className="hidden"
          >
            {item.children}
          </div>
        </div>
      ))}
    </div>
  )
}