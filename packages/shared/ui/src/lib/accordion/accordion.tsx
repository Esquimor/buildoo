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
        <div
          key={item.id}
          className="flex flex-col first:rounded-t-xl last:rounded-b-xl"
        >
          <button 
            type="button"
            className="cursor-pointer flex items-center justify-between h-10 w-full p-2 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => handleClick(item.id)}
          >
            <div>{item.title}</div>
            <div>{item.id === open ? '\u25BC' : '\u25B6'}</div>
          </button>
          {open === item.id && (
            <div
              className="h-fit"
            >
              {item.children}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}