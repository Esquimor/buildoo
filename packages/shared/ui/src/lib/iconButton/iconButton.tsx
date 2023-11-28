import { ReactNode, MouseEvent } from "react"

export interface IconButtonProps {
  icon: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function IconButton({
  icon,
  onClick,
}: IconButtonProps) {
  
  return (
    <button
      onClick={onClick}
      type="button"
      className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-full text-sm p-0.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
    >
      {icon}
    </button>
  )
}