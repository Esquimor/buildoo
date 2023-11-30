"use client";

import { Contractor } from "@server/contractors/contractors.entity";
import { Button, Info, Label } from "@shared-ui";
import { useState } from "react";
import { ModalEditContractor } from "./modalEditContractor";

interface SidepanelContractorGeneralProps {
  contractor: Contractor;
}

export function SidepanelContractorGeneral({
  contractor
}: SidepanelContractorGeneralProps) {

  const [openEdit, setOpenEdit] = useState(false);

  return (
    <>
      <div
        className="flex flex-col"
      >
        <section
          className="flex flex-col"
        >
          <div
            className="flex justify-between px-5 pb-4"
          >
            <Label
              label="General"
              size="text-2xl"
              weight="font-bold"
            />
            <Button
              label="Edit"
              onClick={() => setOpenEdit(true)}
            />
          </div>
          <div
            className="p-5"
          >
            <div
              className="grid grid-cols-4 gap-4"
            >
              <Info
                label="Name"
                value={contractor.name} 
              />
              <Info
                label="Type"
                value={contractor.type} 
              />
              <Info
                label="Status"
                value={contractor.work_status} 
              />
            </div>
          </div>
        </section>
      </div>
      <ModalEditContractor
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        contractor={contractor}
      />
    </>
  )
}