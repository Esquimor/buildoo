"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Label, Sidebar, Tabs } from "@shared-ui";
import { FormProvider, useForm } from "react-hook-form";
import * as z from 'zod';
import { ContractorType } from "@shared-type"
import { trpc } from "apps/web/app/trpc";
import { General } from "./general";
import { Payment } from "./payment";
import { BaseSyntheticEvent, useState } from "react";

export type FormValues = {
  name: string;
  type: string;
  decennial_civil_liability: File;
  contractorPayment: {
    amountHT: string;
    amountTTC: string;
    payment_date: {
      startDate: string;
      endDate: string;
    };
    contractorPaymentCondition: {
      condition: string;
    }[]
  }[]
}

interface SidepanelAddContractorProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
}

export function SidepanelAddContractor({
  open,
  onClose,
  projectId,
}: SidepanelAddContractorProps) {

  const schema = z.object({
    name: z.string().min(1, { message: "Required" }),
    type: z.string().min(1, { message: "Required" }),
    decennial_civil_liability: z.instanceof(File),
    contractorPayment: z.array(z.object({
      amountHT: z.string(),
      amountTTC: z.string(),
      payment_date: z.object({
        startDate: z.string(),
        endDate: z.string(),
      }),
      contractorPaymentCondition: z.array(z.object({
        condition: z.string()
      })).optional()
    })).optional()
  })

  const formMethods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      type: ContractorType.Unknow,
      contractorPayment: []
    }
  });


  const createContractor =  trpc.contractor.create.useMutation({
    onSuccess() {
      onClose()
    }
  });

  const toBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  const onSubmit = async (values: FormValues, e: BaseSyntheticEvent | undefined) => {
    e?.stopPropagation();
    e?.preventDefault();
    createContractor.mutate({
      ...values, 
      projectId,
      decennial_civil_liability: await toBase64(values.decennial_civil_liability)as string,
      contractorPayment: values.contractorPayment.map(contractorPayment => ({
        ...contractorPayment,
        amountHT: +contractorPayment.amountHT,
        amountTTC: +contractorPayment.amountTTC,
        datePayment: contractorPayment.datePayment.startDate
      }))
    });
  }
  
  const [tab, setTab] = useState(0)

  const tabs = [
    {
      id: 0,
      name: "Général",
      component: (
        <General />
      )
    },
    {
      id: 1,
      name: "Payment",
      component: <Payment />
    }
  ]

  return (
    <Sidebar
      open={open}
      onClickOutside={onClose}
      width="1200px"
    >
      <div
        className="h-full overflow-scroll"
      >
        <FormProvider {...formMethods}>
          <div
            className="flex flex-col h-full"
          >
            <header
              className="bg-blue-800 text-white p-4"
            >
              <Label label="Add a contractor" size="text-2xl" color="text-white" />
            </header>
            <main
              className="grow p-4 flex flex-col"
            >
              <Tabs
                tabs={tabs.map((tab, index) => ({label: tab.name, id: index}))}
                currentTab={tab}
                onClickTab={setTab}            
              />
              <div
                className="my-4 w-full"
              >
                {tabs[tab].component}
              </div>
            </main>
            <footer
              className="border-t-2 border-t-gray-4300 py-4 px-8 flex justify-end sticky bottom-0 bg-white"
            >
              <Button
                label="Cancel"
                color="gray"
                className="mr-6"
                onClick={onClose}
              />
              <Button
                label="Create"
                onClick={formMethods.handleSubmit(onSubmit)}
                type="submit"
              />
            </footer>
          </div>
        </FormProvider>
      </div>
    </Sidebar>
  )
}