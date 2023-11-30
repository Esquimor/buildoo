"use client"

import { Button, Label } from "@shared-ui";
import { TextfieldController } from "apps/web/app/_components/form/textfieldController";
import { useFormContext, useFieldArray } from "react-hook-form";

interface ConditionsProps {
  index: number;
}

export function Conditions({
  index,
}: ConditionsProps) {
  const { control } = useFormContext()

  const name = `contractorPayment.${index}.contractorPaymentCondition`;

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
          <TextfieldController
            name={`${name}.${i}.condition`}
            inputProps={{
              type: "textarea"
            }}
            className="grow mr-2"
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