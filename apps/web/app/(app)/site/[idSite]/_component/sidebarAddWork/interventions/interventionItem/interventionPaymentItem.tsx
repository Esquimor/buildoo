"use client";

import { useState } from "react";
import { InterventionPayment } from "../../sidebarAddWork.zod";
import { Collapse, Info, Label } from "@shared-ui";
import { InterventionPaymentConditionItem } from "./interventionPaymentCondition.item";

interface InterventionPaymentItemProps {
  payment: InterventionPayment;
}

export function InterventionPaymentItem({
  payment
}: InterventionPaymentItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <Collapse
      open={open}
      onClickHeader={() => setOpen(!open)}
      title={payment.payment_date.startDate?.toLocaleString() || ""}
    >
      <div
        className="p-4"
      >
        <section
          className="flex flex-col pb-4"
        >
          <div
            className="grid grid-cols-2 gap-4 w-full"
          >
            <Info
              label="Date payment"
              value={payment.payment_date.startDate?.toLocaleString() || ""}
            />
          </div>
          <div
            className="grid grid-cols-2 gap-4 w-full"
          >
            <Info
              label="Amount Ht"
              value={payment.amountHT}
            />
            <Info
              label="Amount TTC"
              value={payment.amountTTC}
            />
          </div>
        </section>
        <section
          className="flex flex-col pb-4"
        >
          <Label
            label="Conditions"
            size="text-lg"
            className="pb-2"
          />
          {payment.interventionPaymentCondition.map(condition => (
            <InterventionPaymentConditionItem
              key={condition.condition}
              condition={condition}
            />
          ))}
        </section>
      </div>
    </Collapse>
  )
}