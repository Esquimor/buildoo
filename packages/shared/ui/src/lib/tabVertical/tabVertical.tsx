import { MouseEvent } from "react";

export interface TabVerticalProps {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  label: string;
  selected?: boolean;
}

export function TabVertical({
  onClick,
  label,
  selected
}: TabVerticalProps) {

  let className = "inline-flex items-center px-4 py-3 rounded-lg "

  if (selected) {
    className = `${className} text-white bg-blue-700 active w-full dark:bg-blue-600`
  } else {
    className = `${className} hover:text-gray-900 bg-gray-200 hover:bg-gray-300 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white`
  }


  return (
    <li>
      <button
        onClick={onClick}
        className={className}
      >
        {label}
      </button>
    </li>
  )
}