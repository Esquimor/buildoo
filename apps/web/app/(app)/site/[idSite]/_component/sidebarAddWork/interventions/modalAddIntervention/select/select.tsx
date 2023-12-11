"use client";

import { TrpcStatus } from "apps/web/_components/trpcStatus";
import { SelectfieldController } from "apps/web/app/_components/form/selectfieldController";
import { trpc } from "apps/web/app/trpc";

export function Select() {

  const contractors = trpc.contractor.get.useQuery();

  return (
    <div
      className="p-4"
    >
      <div
        className="grid grid-cols-1 gap-4 w-full"
      >
        <TrpcStatus
          status={contractors.status}
        >
          <SelectfieldController
            name={`contractor.id`}
            labelProps={{
              label: "Contractor"
            }}
            selectProps={{
              values: contractors?.data?.map(({ id, name }) => ({ id, label: name })) || []
            }}
          />
        </TrpcStatus>
      </div>
    </div>
  )
}