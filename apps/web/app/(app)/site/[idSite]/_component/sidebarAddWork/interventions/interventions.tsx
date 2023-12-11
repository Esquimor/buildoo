"use client";

import { Button, Label } from "@shared-ui";
import { useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { ModalAddIntervention } from "./modalAddIntervention";
import { InterventionItem } from "./interventionItem";
import { FormValues, Intervention, interventionDefault } from "../sidebarAddWork.zod";

export function Interventions() {
  
  const { control } = useFormContext<FormValues>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: "interventions"
  });

  const [interventionToEdit, setInterventionToEdit] = useState<Intervention|null>(null);

  return (
    <>
      <section>
        <div
          className="flex justify-between items-center"
        >
          <Label
            label="Contractors"
            size="text-xl"
            weight="font-bold"
          />
          <Button
            label="Add a contractor"
            onClick={() => setInterventionToEdit(interventionDefault)}
          />
        </div>
        <div
          className="mt-4 px-2"
        >
          {fields.map((field, index) => (
            <InterventionItem
              key={field.name}
              intervention={field}
              className="mb-4"
              onDelete={() => remove(index)}
              onEdit={() => setInterventionToEdit(field)}
            />
          ))}
        </div>
      </section>
      <ModalAddIntervention
        intervention={interventionToEdit} 
        onClose={() => setInterventionToEdit(null)}   
        onCreate={(value) => {
          append(value)
          setInterventionToEdit(null)
        }}   
      />
    </>
  )
}