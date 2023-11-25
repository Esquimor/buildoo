import { MouseEvent } from "react";

export interface ButtonProps {
  label?: string;
  color?: "blue" | "red" | "green" | "gray";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit";
}

export function Button({
  label,
  color = "blue",
  onClick,
  className: classNameProps,
  type="button",
}: ButtonProps) {

  let className = `${classNameProps} font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`;

  switch(color) {
    case "blue":
      className = `${className} bg-blue-500 hover:bg-blue-700 text-white`;
      break;
    case "red":
      className = `${className} bg-red-500 hover:bg-red-700 text-white`;
      break;
    case "green":
      className = `${className} bg-green-500 hover:bg-green-700 text-white`;
      break;
    case "gray":
      className = `${className} bg-gray-500 hover:bg-gray-700 text-white`;
      break;
    default:
      break;
  }

  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
