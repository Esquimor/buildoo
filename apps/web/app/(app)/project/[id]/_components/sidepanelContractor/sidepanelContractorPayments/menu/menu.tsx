import { mdiDotsVertical } from "@mdi/js";
import Icon from "@mdi/react";
import { IconButton, List, ListItem } from "@shared-ui";
import { useRef, useState } from "react";
import { useOnClickOutside } from 'usehooks-ts'

interface MenuProps {
  onDelete: () => void;
}

export function Menu({
  onDelete
}: MenuProps) {

  const [open, setOpen] = useState(false);

  const handleClickOutside = () => {
   open && setOpen(false);
  }

  const ref = useRef(null)
  useOnClickOutside(ref, handleClickOutside)

  return (
    <div
      className="flex justify-center items-center w-full h-full relative"
    >
      <IconButton
        onClick={() => setOpen(true)}
        icon={<Icon path={mdiDotsVertical} size={1} />}
      />
      {open && (
        <div
          ref={ref}
          className="absolute z-40 -right-2 inline-block bg-white border border-gray-200 rounded-lg shadow-sm "
        >
          <List>
            <ListItem
              className="cursor-pointer"
              onClick={() => {
                onDelete();
                setOpen(false);
              }}
            >
              Delete
            </ListItem>
          </List>
        </div>
      )}
    </div>
  )
}