import { MouseEvent } from "react";

export interface StepProps {
  index: number;
  title: string;
  selected: boolean;
  onClick?: (event: MouseEvent<HTMLLIElement>) => void;
  last?: boolean;
}

export function Step({
  index,
  title,
  selected,
  onClick,
  last = false,
}: StepProps) {

  let className = "flex items-center";

  if (!!onClick) {
    className = `${className} cursor-pointer`
  }

  if (!last) {
    className = `${className} md:w-full after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`
  }

  if (selected) {
    className = `${className} text-blue-600 dark:text-blue-500 sm:after:content-['']`
  }

  return (
    <li
      className={className}
      onClick={onClick}
    >
      <div className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
        <div className="mx-4">{index + 1}</div>
        <div>{title}</div>
      </div>
    </li>
  )
}