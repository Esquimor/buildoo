"use client";

import { Button, Textarea } from "@shared-ui";
import { ChangeEvent, useEffect, useState } from "react";

interface AccordionItemProps {
  value?: string | null;
  onChange?: (value: string | null) => void;
}

export function AccordionItem({
  value: valueProps,
  onChange
}: AccordionItemProps) {

  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(valueProps);

  useEffect(() => {
    setValue(valueProps)
  }, [valueProps])

  const handleBlur = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value !== undefined) {
      onChange?.(event.target.value);
    }
    setEdit(false);
  }

  const handleCancel = () => {
    setValue(valueProps);
    setEdit(false);
  }

  const handleEdit = () => {
    if (valueProps !== undefined)
      onChange?.(valueProps)
    setEdit(false);
  }

  return edit ? (
    <div>
      <Textarea
        value={value}
        onBlur={handleBlur}
        onChange={(e) => setValue(e.target.value)}
      />
      <div
        className="mt-2 flex justify-end"
      >
        <Button
          label="Cancel"
          color="gray"
          className="mr-4"
          onClick={handleCancel}
        />
        <Button
          label="Edit"
          color="blue"
          onClick={handleEdit}
        />
      </div>
    </div>
  ) : (
    <div
      onClick={() => setEdit(true)}
    >
      {value}
    </div>
  );
}