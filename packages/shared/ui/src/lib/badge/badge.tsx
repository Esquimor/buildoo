import { MouseEvent } from "react";

export interface BadgeProps {
  label?: string;
  className?: string;
  color?: string |
    "default" |
    "blue" |
    "red" |
    "green" |
    "gray" |
    "orange" |
    "yellow";
  size?: "xs" | "sm" | "lg";
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

export function Badge({
  label,
  color = "default",
  className: classNameProps = "",
  size = "xs",
  onClick,
}: BadgeProps) {

  let className = `${classNameProps} font-medium me-2 px-2.5 py-0.5 rounded inline-block text-center`

  switch (size) {
    case "lg":
      className = `${className} text-lg`;
      break;
    case "sm":
      className = `${className} text-sm`;
      break;
    default:
      className = `${className} text-xs`
  }

  switch (color) {
    case "blue":
      className = `${className} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300`;
      break;
    case "red":
      className = `${className} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300`;
      break;
    case "green":
      className = `${className} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300`;
      break;
    case "gray":
      className = `${className} bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300`;
      break;
    case "orange":
      className = `${className} bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300`;
      break;
    case "yellow":
      className = `${className} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300`;
      break;
    default:
      className = `${className} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300`;
      break;
  }

  return (
    <div
      className={className}
      onClick={onClick}
    >
      {label}
    </div>
  )
}