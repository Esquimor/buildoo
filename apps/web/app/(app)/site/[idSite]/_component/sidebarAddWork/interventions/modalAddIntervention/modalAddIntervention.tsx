"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Label, Modal, Stepper } from "@shared-ui";
import { FormProvider, useForm } from "react-hook-form";
import { intervention, Intervention } from "../../sidebarAddWork.zod";
import { useEffect, useState } from "react";
import { Choose } from "./choose";
import { CreateOrSelect } from "./modalAddIntervention.type";
import { Create } from "./create";
import { Select } from "./select";
import { Intervention as InterventionPart } from "./intervention";
import { Payments } from "./payments";

interface ModalAddInterventionProps {
  intervention: Intervention | null;
  onClose: () => void;
  onCreate: (value: Intervention) => void;
}

export function ModalAddIntervention({
  intervention: interventionDefault,
  onClose,
  onCreate,
}: ModalAddInterventionProps) {

  const formMethods = useForm<Intervention>({
    resolver: zodResolver(intervention),
    defaultValues: {
    }
  });

  const contractorField = formMethods.watch("contractor")
  const nameField = formMethods.watch("name");

  const onSubmit = (values: Intervention) => {
    onCreate(values)
  }

  const [step, setStep] = useState(0);
  const [createOrSelect, setCreateOrSelect] = useState(CreateOrSelect.Create)

  const steps = [
    {
      title: "Choose type",
      component: (
        <Choose
          onChange={(value) => {
            setCreateOrSelect(value)
            setStep(1)
          }}
        />
      ),
      buttons: (
        <Button
          label="Cancel"
          color="gray"
          onClick={onClose}
        />
      )
    },
    {
      title: "Select or Create",
      component: createOrSelect === CreateOrSelect.Create ? <Create /> : <Select />,
      buttons: (
        <>
          <Button
            label="Cancel"
            color="gray"
            onClick={onClose}
          />
          <Button
            label="Previous"
            color="blue"
            onClick={() => setStep(0)}
            className="mx-4"
          />
          <Button
            label="Next"
            color="blue"
            onClick={() => setStep(2)}
            disabled={!!contractorField?.name && !!contractorField?.id}
          />
        </>
      )
    },
    {
      title: "Intervention",
      component: <InterventionPart />,
      buttons: (
        <>
          <Button
            label="Cancel"
            color="gray"
            onClick={onClose}
          />
          <Button
            label="Previous"
            color="blue"
            onClick={() => setStep(1)}
            className="mx-4"
          />
          <Button
            label="Next"
            color="blue"
            onClick={() => setStep(3)}
            disabled={!nameField}
          />
        </>
      )
    },
    {
      title: "Add Payments",
      component: <Payments />,
      buttons: (
        <>
          <Button
            label="Cancel"
            color="gray"
            onClick={onClose}
          />
          <Button
            label="Previous"
            color="blue"
            onClick={() => setStep(2)}
            className="mx-4"
          />
          <Button
            label="Create"
            color="blue"
            onClick={formMethods.handleSubmit(onSubmit)}
          />
        </>
      )
    }
  ]

  useEffect(() => {
    if (!!interventionDefault) {
      // if name is "" === new intervention
      if (interventionDefault.name !== "") {
        setStep(1);
      } else {
        // already existing one
        setStep(0);
      }
      formMethods.reset(interventionDefault)
    }
  }, [interventionDefault])

  return (
    <form
      onSubmit={formMethods.handleSubmit(onSubmit)}
    >
      <Modal
        open={!!interventionDefault}
        onClickOutside={onClose}
        width="1200px"
      >
        <FormProvider {...formMethods}>
          <div
            className="flex flex-col"
          >
            <header
              className="flex justify-between bg-blue-800 p-4 rounded-t-lg"
            >
              <Label
                label="Add a contractor"
                size="text-2xl"
                weight="font-bold"
                color="text-white"
              />
            </header>
            <main
              className="bg-white"
            >
              <Stepper
                values={steps.map(({ title }) => title)}
                value={step}
                className="p-2"
              />
              <div
                className="h-[32rem] border-t-2 border-gray-200"
              >
                {steps[step].component}
              </div>
            </main>
            <footer
              className="py-4 px-8 flex justify-end bg-gray-100 rounded-b-lg"
            >
              {steps[step].buttons}
            </footer>
          </div>
        </FormProvider>
      </Modal>
    </form>
  )
}