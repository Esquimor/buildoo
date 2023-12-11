"use client";

import { Button, Card } from "@shared-ui";
import { DatepickerController } from "apps/web/app/_components/form/datapickerController";
import { TextfieldController } from "apps/web/app/_components/form/textfieldController";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Conditions } from "./conditions";

export function Payment() {
  const { control } = useFormContext()

  const { fields: fieldsPayment, append: appendPayment, remove: removePayment } = useFieldArray({
    control,
    name: "contractorPayment"
  });

  return (    
    <section>
      {fieldsPayment.map((field, index) => (
        <Card
          className="flex flex-col mb-4"
          key={field.id}
        >
          <div
            className="grid grid-cols-2 gap-4 w-full"
          >
            <TextfieldController
              name={`contractorPayment.${index}.amountHT`}
              labelProps={{
                label: "Amount HT"
              }}
            />
            <TextfieldController
              name={`contractorPayment.${index}.amountTTC`}
              labelProps={{
                label: "Price TTC"
              }}
            />
            <DatepickerController
              name={`contractorPayment.${index}.payment_date`}
              labelProps={{
                label: "Date Paiment"
              }}
            />
          </div>
          <Conditions
            index={index}
          />
          <div
            className="flex justify-end"
          >
            <Button
              label="Delete"
              color="red"
              onClick={() => removePayment(index)}
            />
          </div>
        </Card>
      ))}
      <div
        className="flex justify-start"
      >
        <Button
          label="Add Payment"
          color="blue"
          onClick={() => appendPayment({
            amountHT: "",
            amountTTC: "",
            payment_date: {
              startDate: "",
              endDate: ""
            },
            contractorPaymentCondition: []
          })}
        />
      </div>
    </section>
  )
}