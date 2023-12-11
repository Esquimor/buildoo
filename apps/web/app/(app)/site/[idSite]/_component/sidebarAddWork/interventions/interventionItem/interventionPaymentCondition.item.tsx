"use client";

import { useState } from "react";
import { InterventionPaymentCondition } from "../../sidebarAddWork.zod";
import { Collapse } from "@shared-ui";

interface InterventionPaymentConditionItemProps {
  condition: InterventionPaymentCondition;
}

export function InterventionPaymentConditionItem({
  condition
}: InterventionPaymentConditionItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <Collapse
      open={open}
      onClickHeader={() => setOpen(!open)}
      title={condition.condition.slice(0, 20)}
    >
      <div
        className="p-4"
      >
        {condition.condition}
      </div>
    </Collapse>
  )
}