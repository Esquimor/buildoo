import { ReactNode, MouseEvent } from "react";

export interface ListItemProps {
  children?: ReactNode;
  className?: string;
  onClick?: (event: MouseEvent<HTMLLIElement>) => void;
}

export function ListItem({
  children,
  className: classNameProps = "",
  onClick,
}: ListItemProps) {

  const className = `${classNameProps} w-full px-4 py-2 border-b border-gray-200 last:rouded-b-lg first:rounded-t-lg dark:border-gray-600`

  return (
    <li
      className={className}
      onClick={onClick}
    >
      {children}
    </li>
  );
}