import { createPortal } from "react-dom";
import { Spinner } from "../spinner/spinner";

export function SpinnerScreeen() {
  
  return createPortal(
    <div
      className="opacity-10 fixed inset-0 z-[200] bg-black flex items-center justify-center"
    >
      <Spinner />
    </div>,
    document.body
  )
}