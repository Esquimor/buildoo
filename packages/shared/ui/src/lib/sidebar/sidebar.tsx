import { ReactNode } from "react";
import { MouseEvent } from "react";

export interface SidebarProps {
  children: ReactNode;
  open: boolean;
  onClickOutside: (event: MouseEvent<HTMLElement>) => void;
  width?: string;
}

export function Sidebar({
  children,
  open,
  onClickOutside,
  width = "33%"
}: SidebarProps) {

  if (!open) {
    return null;
  }

  return (
    <>
      <div
        className="opacity-10 fixed inset-0 z-40 bg-black"
        style={{
          width: `calc(100% - ${width})`
        }}
      />
      <div
        className="justify-end items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none w-full h-full"
        onClick={onClickOutside}
      >
        <div
          className="relative flex justify-end h-full"
        >
          <div
            className="border-0 z-60 shadow-lg relative flex flex-col bg-white outline-none focus:outline-none"
            style={{
              width
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}