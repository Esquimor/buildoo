import { ReactNode, MouseEvent } from "react"

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "xs" | "sm" | "md";
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

export function Card({
  children,
  className: classNameProps = "",
  padding = "md",
  onClick
}: CardProps) {

  let className = `${classNameProps} flex justify-between bg-white shadow-md rounded`;

  switch (padding) {
    case "xs":
      className = `${className} px-2 pt-1.5 pb-2`;
      break;
    case "sm":
      className = `${className} px-4 pt-3 pb-4`;
      break;
    default:
      className = `${className} px-8 pt-6 pb-8`;
      break;
  }

  return (
    <div
      className={className}
      onClick={onClick}
    >
      {children}
    </div>
  )
}