import { Button, Card, Label } from "@shared-ui";
import { DatepickerController } from "apps/web/app/_components/form/datapickerController";
import { TextfieldController } from "apps/web/app/_components/form/textfieldController";
import { useFieldArray, useFormContext } from "react-hook-form";
import { PaymentCondition } from "./paymentCondition";

export function Payments() {
  
  const { control } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    control,
    name: "interventionPayment"
  });

  return (
    <section
      className=" overflow-scroll h-full"
    >
      <div
        className="flex justify-between items-center z-40 sticky top-0 bg-white p-4 border-b-2 border-gray-300"
      >
        <Label
          label="Payments"
          size="text-2xl"
          weight="font-bold"
        />
        <Button
          label="Add Payment"
          color="blue"
          onClick={() => append({
            amountHT: "",
            amountTTC: "",
            datePayment: {
              startDate: "",
              endDate: ""
            },
            interventionPaymentCondition: []
          })}
        />
      </div>
      <div
        className="p-4"
      >
        {fields.map((field, index) => (
          <Card
            className="flex flex-col mb-4"
            key={field.id}
          >
            <div
              className="grid grid-cols-3 gap-4 w-full"
            >
              <TextfieldController
                name={`interventionPayment.${index}.amountHT`}
                labelProps={{
                  label: "Price HT"
                }}
              />
              <TextfieldController
                name={`interventionPayment.${index}.amountTTC`}
                labelProps={{
                  label: "Price TTC"
                }}
              />
              <DatepickerController
                name={`interventionPayment.${index}.payment_date`}
                labelProps={{
                  label: "Date Paiment"
                }}
              />
            </div>
            <PaymentCondition
              index={index}
            />
            <div
              className="flex justify-end"
            >
              <Button
                label="Delete"
                color="red"
                onClick={() => remove(index)}
              />
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
