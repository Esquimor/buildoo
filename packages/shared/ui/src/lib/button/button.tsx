import { MouseEvent } from "react";

export interface ButtonProps {
  label?: string;
  color?: "blue" | "red" | "green";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function Button({
  label,
  color = "blue",
  onClick
}: ButtonProps) {

  let className = "font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";;

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
    default:
      break;
  }

  return (
    <button
      className={className}
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
