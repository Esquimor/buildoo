"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Label, Sidebar, Tabs } from "@shared-ui";
import { trpc } from "apps/web/app/trpc";
import { BaseSyntheticEvent, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { General } from "./general";
import { Interventions } from "./interventions";
import { FormValues, schema } from "./sidebarAddWork.zod";

interface SidebarAddWorkProps {
  open: boolean;
  onClose: () => void;
  siteId: string;
}

export function SidebarAddWork({
  open,
  onClose,
  siteId
}: SidebarAddWorkProps) {

  const formMethods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      interventions: []
    }
  });


  const createWork =  trpc.work.create.useMutation({
    onSuccess() {
      onClose()
    }
  });

  const onSubmit = async (values: FormValues, e: BaseSyntheticEvent | undefined) => {
    e?.stopPropagation();
    e?.preventDefault();

    createWork.mutate({
      site_id: siteId,
      name: values.name,
      type: values.type,
      start_date: values.start_date?.startDate ? values.start_date.startDate.toLocaleString() : null,
      end_date: values.end_date?.startDate ? values.end_date.startDate.toLocaleString() : null,
      description: values.description,
      interventions: values.interventions ?
        values.interventions.map(interventionVal => ({
          name: interventionVal.name,
          start_date: interventionVal.start_date?.startDate ? interventionVal.start_date.startDate.toLocaleString() : null,
          end_date: interventionVal.end_date?.startDate ? interventionVal.end_date.startDate.toLocaleString() : null,
          contractor: interventionVal.contractor,
          intervention_payments: interventionVal.interventionPayment ?
          interventionVal.interventionPayment.map(paymentVal => ({
            payment_date: paymentVal.payment_date?.startDate ? paymentVal.payment_date.startDate.toLocaleString() : null,
            amount_ht: +paymentVal.amountHT,
            amount_ttc: +paymentVal.amountTTC,
            intervention_payment_conditions: paymentVal.interventionPaymentCondition ?
              paymentVal.interventionPaymentCondition.map(conditionVal => ({
                condition: conditionVal.condition
              })) : []
          })) : []
        })) : []
    })
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
      name: "Interventions",
      component: (
        <Interventions />
      )
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
              className="border-t-2 py-4 px-8 flex justify-end bottom-0 bg-white"
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