import { ReactNode } from "react"

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({
  children,
  className: classNameProps = ""
}: CardProps) {

  let className = `${classNameProps} flex justify-between bg-white shadow-md rounded px-8 pt-6 pb-8`

  return (
    <div
      className={className}
    >
      {children}
    </div>
  )
}