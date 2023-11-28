import { Contractor } from "@server/contractors/contractors.entity";
import { Button, Label } from "@shared-ui";
import { useState } from "react";
import DataGrid, { CellClickArgs } from 'react-data-grid';
import { SidepanelAddContractor } from "../sidepanelAddContractor";
import useParamsQuery from "../../../../_hooks/useParamsQuery";
import { SidepanelContractor } from "../sidepanelContractor";

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
    { key: 'work_status', name: 'Work status' },
  ];

  const [openSidepanelAdd, SetOpenSidepanelAdd] = useState(false);
  
  const {
    setParamsQuery,
    getParamByName
  } = useParamsQuery();

  const handleCellClick = (args: CellClickArgs<Contractor>) => {
    setParamsQuery("contractor", `${args.row.id}`)
  }

  const contractorIdSelected = getParamByName("contractor");

  const contractor = contractors.find(({ id }) => id === contractorIdSelected)

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
      {contractor && <SidepanelContractor
        open={!!contractor}
        onClose={() => setParamsQuery("contractor", null)}
        contractor={contractor}
      />}
    </>
  )
}