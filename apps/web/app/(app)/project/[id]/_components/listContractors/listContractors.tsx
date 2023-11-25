import { Contractor } from "@server/contractors/contractors.entity";
import { Button, Label } from "@shared-ui";
import { useState } from "react";
import DataGrid, { CellClickArgs } from 'react-data-grid';
import { SidepanelAddContractor } from "../sidepanelAddContractor";

interface ListContractorsProps {
  contractors: Contractor[];
  projectId: string;
}

export function ListContractors({
  contractors,
  projectId
}: ListContractorsProps) {

  const columns = [
    { key: 'name', name: 'Name' },
    { key: 'type', name: 'Type' },
    { key: 'decennial_civil_liability', name: 'RC décennal' },
    { key: 'work_status', name: 'Work status' },
  ];

  const [openSidepanelAdd, SetOpenSidepanelAdd] = useState(false);

  const handleCellClick = (args: CellClickArgs<Contractor>) => {
    console.log(args)
  }

  return (
    <>
      <div
        className="flex flex-col w-full"
      >
        <div
          className="flex justify-between items-center mb-4"
        >
          <Label
            size="text-3xl"
            weight="font-bold"
            label="Contractors (x)"
          />
          <Button
            label="Add"
            color="blue"
            onClick={() => SetOpenSidepanelAdd(true)}
          />
        </div>
        <DataGrid
          columns={columns}
          rows={contractors}
          style={{
            maxHeight: "100%"
          }}
          onCellClick={handleCellClick}
        />
      </div>
      <SidepanelAddContractor
        open={openSidepanelAdd}
        onClose={() => SetOpenSidepanelAdd(false)}
        projectId={projectId}
      />
    </>
  )
}