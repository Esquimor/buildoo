"use client";

import { Button, Collapse, Info, Label } from "@shared-ui";
import { Intervention } from "../../sidebarAddWork.zod";
import { useState } from "react";
import { InterventionPaymentItem } from "./interventionPaymentItem";

interface InterventionItemProps {
  intervention: Intervention;
  className?: string;
  onEdit: () => void;
  onDelete: () => void;
}

export function InterventionItem({
  intervention,
  className = "",
  onEdit,
  onDelete,
}: InterventionItemProps) {

  const [open, setOpen] = useState(false);

  return (
    <Collapse
      open={open}
      onClickHeader={() => setOpen(!open)}
      title={`${intervention.contractor?.name}-${intervention.name}`}
      className={className}
      headerActions={(
        <div
          className="flex items-center justify-end"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Button
            label="Edit"
            color="blue"
            onClick={onEdit}
            className="mr-4"
          />
          <Button
            label="Delete"
            color="red"
            onClick={onDelete}
          />
        </div>
      )}
    >
      <div
        className="p-4"
      >
        <section
          className="flex flex-col pb-4"
        >
          <Label
            label="Contractor"
            size="text-xl"
            className="pb-2"
          />
          <div
            className="grid grid-cols-2 gap-4 w-full"
          >
            <Info
              label="Name"
              value={intervention.contractor?.name || ""}
            />
          </div>
        </section>
        <section
          className="flex flex-col pb-4"
        >
          <Label
            label="Intervention"
            size="text-xl"
            className="pb-2"
          />
          <div
            className="grid grid-cols-2 gap-4 w-full pb-2"
          >
            <Info
              label="Name"
              value={intervention.name}
            />
          </div>
          <div
            className="grid grid-cols-2 gap-4 w-full"
          >
            <Info
              label="Start date"
              value={intervention.start_date?.startDate?.toLocaleString() || ""}
            />
            <Info
              label="End date"
              value={intervention.end_date?.startDate?.toLocaleString() || ""}
            />
          </div>
        </section>
        <section
          className="flex flex-col pb-4"
        >
          <Label
            label="Payments"
            size="text-xl"
            className="pb-2"
          />
          {intervention.interventionPayment.map(payment => (
            <InterventionPaymentItem
              key={`${payment.payment_date}-${payment.amountHT}-${payment.amountTTC}`}
              payment={payment}
            />
          ))}
        </section>
      </div>
    </Collapse>
  )
}