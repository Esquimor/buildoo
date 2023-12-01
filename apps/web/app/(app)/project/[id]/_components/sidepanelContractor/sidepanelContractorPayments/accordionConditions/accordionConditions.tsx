"use client";

import { Checkbox } from "@shared-ui";
import { useState } from "react";
import { AccordionItem } from "./accordionItem";

export interface AccordionConditionsProps {
  items: {
    id: string|number;
    title: string;
    children: string;
    checked: boolean;
  }[];
  className?: string;
  onChange?: (
    values: {
      condition?: string,
      completed?: boolean;
    },
    id: string|number
  ) => void;
}

export function AccordionConditions({
  items,
  className: classNameProps = "",
  onChange,
}: AccordionConditionsProps) {

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
            <div
              className="flex items-center"
            >
              <div
                className="mr-2"
              >
                {item.id === open ? '\u25BC' : '\u25B6'}
              </div>
              <div>{item.title}</div>
            </div>
            <div
              className="w-20 flex items-center justify-end h-10"
              onClick={(e) => e.stopPropagation()}
            >
              <Checkbox
                value={item.checked}
                onClick={() => {
                  onChange?.({
                    completed: !item.checked,
                  }, item.id)
                }}
              />
            </div>
          </button>
          {open === item.id && (
            <div
              className="h-fit w-400 p-4 border-r-gray-200 border-l-gray-200 border border-b-0 border-t-0"
            >
              <AccordionItem
                value={item.children}
                onChange={(value) => {
                  if (value)
                    onChange?.({condition: value}, item.id)
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}