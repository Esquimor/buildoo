"use client"

import { Button, Label } from "@shared-ui";
import { TextareaController } from "apps/web/app/_components/form/textareaController";
import { TextfieldController } from "apps/web/app/_components/form/textfieldController";
import { useFormContext, useFieldArray } from "react-hook-form";

interface PaymentConditionProps {
  index: number;
}

export function PaymentCondition({
  index,
}: PaymentConditionProps) {
  const { control } = useFormContext()

  const name = `interventionPayment.${index}.interventionPaymentCondition`;

  const { fields: fielsCondition, append: appendCondition, remove: removeCondition } = useFieldArray({
    control,
    name
  });

  return (
    <div>
      <Label
        label="Conditions"
        className="mb-2"
      />
      {fielsCondition.map((field, i) => (
        <div
          className="flex items-center mb-2"
          key={field.id}
        >
          <TextareaController
            name={`${name}.${i}.condition`}
            className="grow mr-2"
            rows={2}
          />
          <Button
            label="Delete"
            color="red"
            onClick={() => removeCondition(i)}
            className="mb-3"
          />
        </div>
      ))}
      <div
        className="flex justify-start"
      >
        <Button
          label="Add Condition"
          color="blue"
          size="sm"
          onClick={() => appendCondition({
            condition: ""
          })}
        />
      </div>
    </div>
  )
}