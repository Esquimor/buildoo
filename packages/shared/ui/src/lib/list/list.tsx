import { ReactNode } from "react"

export interface ListProps {
  children?: ReactNode;
  className?: string;
}

export function List({
  children,
  className: classNameProps = "",
}: ListProps) {

  const className = `${classNameProps} text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white`

  return (
    <ul
      className={className}
    >
      {children}
    </ul>
  )
}