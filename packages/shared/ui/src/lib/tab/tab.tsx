import { MouseEvent } from "react";

export interface TabProps {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  label: string;
  selected?: boolean;
}

export function Tab({
  onClick,
  label,
  selected
}: TabProps) {

  let className = "inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg group"

  if (selected) {
    className = `${className} font-bold text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500`
  } else {
    className = `${className} hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300`
  }


  return (
    <li
      className="me-2"
    >
      <button
        onClick={onClick}
        className={className}
      >
        {label}
      </button>
    </li>
  )
}