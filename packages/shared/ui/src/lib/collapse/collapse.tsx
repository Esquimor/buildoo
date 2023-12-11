import { ReactNode } from "react";
import { Label } from "../label/label";

export interface CollapseProps {
  onClickHeader?: () => void;
  title?: string;
  open?: boolean;
  children?: ReactNode;
  className?: string;
  headerActions?: ReactNode;
}

export function Collapse({
  onClickHeader,
  title,
  open = false,
  children,
  className: classNameProps = "",
  headerActions
}: CollapseProps) {

  const className = `${classNameProps} flex flex-col rounded-xl`

  return (
    <div
      className={className}
    >
      <button 
        type="button"
        className="cursor-pointer flex items-center justify-between h-14 w-full p-4 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={onClickHeader}
      >
        <div
          className="flex items-center"
        >
          <div
            className="mr-2"
          >
            {open ? '\u25BC' : '\u25B6'}
          </div>
          <Label
            label={title}
            size="text-xl"
            weight="font-bold"
          />
        </div>
        {headerActions}
      </button>
      {open && (
        <div
          className="h-fit border border-gray-200 border-t-0"
        >
          {children}
        </div>
      )}
    </div>
  )
}