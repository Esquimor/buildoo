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
        className="justify-end items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full h-full"
      >
        <div
          className="relative flex justify-end h-full"
        >
          <div
            className="border-0 z-60 shadow-lg relative flex flex-col bg-white outline-none focus:outline-none"
            style={{
              width
            }}
          >
            {children}
          </div>
        </div>
      </div>
      <div
        className="opacity-10 fixed inset-0 z-50 bg-black"
        onClick={onClickOutside}
        style={{
          width: `calc(100% - ${width})`
        }}
      />
    </>
  );
}