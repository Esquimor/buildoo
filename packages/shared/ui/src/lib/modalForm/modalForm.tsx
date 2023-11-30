import { ReactNode } from "react";
import { Button } from "../button/button";
import { Label } from "../label/label";
import { Modal } from "../modal/modal";

export interface ModalFormProps {
  open: boolean;
  onClose: () => void;
  width?: string;
  children: ReactNode;
  header?: string;
  onConfirm: () => void;
  onCancel: () => void;
  cancelLabel?: string;
  confirmLabel?: string;
}

export function ModalForm({
  open,
  onClose,
  width = "800px",
  children,
  header,
  onCancel,
  onConfirm,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm"
}: ModalFormProps) {
    
  return (
    <Modal
      open={open}
      onClickOutside={onClose}
      width={width}
    >
      <div
        className="flex flex-col"
      >
        <header
          className="flex justify-between bg-blue-800 p-4 rounded-t-lg"
        >
          <Label
            label={header}
            size="text-2xl"
            weight="font-bold"
            color="text-white"
          />
        </header>
        <main
          className="bg-white"
        >
          {children}
        </main>
        <footer
          className="py-4 px-8 flex justify-end bg-gray-100 rounded-b-lg"
        >
          <Button
            label={cancelLabel}
            onClick={onCancel}
            className="mr-4"
            color="gray"
          />
          <Button
            label={confirmLabel}
            onClick={onConfirm}
          />
        </footer>
      </div>
    </Modal>
  )
}