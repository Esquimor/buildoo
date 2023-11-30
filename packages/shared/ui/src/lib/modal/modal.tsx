import { ReactNode } from "react";
import { MouseEvent } from "react";

export interface ModalProps {
  children: ReactNode;
  open: boolean;
  onClickOutside: (event: MouseEvent<HTMLElement>) => void;
  width?: string;
}

export function Modal({
  children,
  open,
  onClickOutside,
  width = "100%"
}: ModalProps) {

  if (!open) {
    return null;
  }

  return (
    <>
      <div
        className="opacity-10 fixed inset-0 z-60 bg-black"
        
      />
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed left-0 top-0 inset-0 z-60 outline-none focus:outline-none"
        onClick={onClickOutside}
      >
        <div
          className="relative flex justify-end"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div
            className="z-60 shadow-lg relative flex flex-col outline-none focus:outline-none"
            style={{
              width
            }}
          >
          {children}
          </div>
        </div>
      </div>
    </>
  );
}