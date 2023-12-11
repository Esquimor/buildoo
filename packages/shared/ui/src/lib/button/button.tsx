import { MouseEvent } from "react";

export interface ButtonProps {
  label?: string;
  color?: "blue" | "red" | "green" | "gray";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit";
  size?: "xs" | "sm" | "md";
  disabled?: boolean;
}

export function Button({
  label,
  color = "blue",
  onClick,
  className: classNameProps,
  type="button",
  size="md",
  disabled = false,
}: ButtonProps) {

  let className = `${classNameProps} font-bold rounded focus:outline-none focus:shadow-outline`;

  switch(size) {
    case "xs":
      className = `${className} py-1 px-2 text-xs`;
      break;
    case "sm":
      className = `${className} py-1.5 px-3 text-sm`;
      break;
    default:
      className = `${className} py-2 px-4`
  }

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

  if (disabled) {
    className = `${className} cursor-not-allowed`
  }

  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
