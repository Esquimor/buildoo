"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ModalForm } from "@shared-ui";
import { DatepickerController } from "apps/web/app/_components/form/datapickerController";
import { TextfieldController } from "apps/web/app/_components/form/textfieldController";
import { trpc } from "apps/web/app/trpc";
import { FormProvider, useForm } from "react-hook-form";
import * as z from 'zod';

type FormValues = {
  amountHT: string;
  amountTTC: string;
  datePayment: {
    startDate: string;
    endDate: string;
  };
  contractorPaymentCondition: {
    condition: string;
  }[]
}

interface ModalAddPaymentProps {
  open: boolean;
  onClose: () => void;
  contractorId: string;
}

export function ModalAddPayment({
  open,
  onClose,
  contractorId
}: ModalAddPaymentProps) {

  const schema = z.object({
    amountHT: z.string(),
    amountTTC: z.string(),
    datePayment: z.object({
      startDate: z.string(),
      endDate: z.string(),
    }),
    contractorPaymentCondition: z.array(z.object({
      condition: z.string()
    })).optional()
  })

  const formMethods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      amountHT: "",
      amountTTC: "",
    }
  });

  const addPayment =  trpc.contractor.addPayment.useMutation({
    onSuccess() {
      onClose()
    }
  });

  const onSubmit = async (values: FormValues) => {
    addPayment.mutate({
      contractorId: contractorId,
      amountHT: +values.amountHT,
      amountTTC: +values.amountTTC,
      datePayment: values.datePayment.startDate
    });
  }

  return (
    <form
      onSubmit={formMethods.handleSubmit(onSubmit)}
    >
      <ModalForm
        open={open}
        onCancel={onClose}
        onClose={onClose}
        onConfirm={formMethods.handleSubmit(onSubmit)}
        header="Add a Payment"
      >
        <FormProvider {...formMethods}>
          <div
            className="p-4"
          >
            <div
              className="grid grid-cols-2 gap-4 w-full"
            >
              <TextfieldController
                name={`amountHT`}
                labelProps={{
                  label: "Amount HT"
                }}
              />
              <TextfieldController
                name={`amountTTC`}
                labelProps={{
                  label: "Price TTC"
                }}
              />
              <DatepickerController
                name={`datePayment`}
                labelProps={{
                  label: "Date Paiment"
                }}
              />
            </div>
          </div>
        </FormProvider>
      </ModalForm>
    </form>
  )
}