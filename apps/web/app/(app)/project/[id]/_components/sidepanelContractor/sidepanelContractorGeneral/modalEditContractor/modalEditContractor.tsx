"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Contractor } from "@server/contractors/contractors.entity";
import { ContractorType, ContractorWorkStatus } from "@shared-type";
import { ModalForm } from "@shared-ui";
import { DatepickerController } from "apps/web/app/_components/form/datapickerController";
import { SelectfieldController } from "apps/web/app/_components/form/selectfieldController";
import { TextfieldController } from "apps/web/app/_components/form/textfieldController";
import { trpc } from "apps/web/app/trpc";
import { FormProvider, useForm } from "react-hook-form";
import * as z from 'zod';

type FormValues = {
  name: string;
  type: string;
  work_status: string;
}

interface ModalEditContractorProps {
  open: boolean;
  onClose: () => void;
  contractor: Contractor;
}

export function ModalEditContractor({
  open,
  onClose,
  contractor
}: ModalEditContractorProps) {

  const schema = z.object({
    name: z.string().min(1, { message: "Required" }),
    type: z.string().min(1, { message: "Required" }),
    work_status: z.string(),
  })

  const formMethods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: contractor
  });

  const editContractor =  trpc.contractor.edit.useMutation({
    onSuccess() {
      onClose()
    }
  });

  const onSubmit = async (values: FormValues) => {
    editContractor.mutate({
      ...contractor,
      ...values
    });
  }

  const typeValues = Object.values(ContractorType).map(type => ({
    id: type,
    label: type
  }));

  const workStatusValues = Object.values(ContractorWorkStatus).map(work_status => ({
    id: work_status,
    label: work_status
  }))

  return (
    <form
      onSubmit={formMethods.handleSubmit(onSubmit)}
    >
      <ModalForm
        open={open}
        onCancel={onClose}
        onClose={onClose}
        onConfirm={formMethods.handleSubmit(onSubmit)}
        header="Edit"
      >
        <FormProvider {...formMethods}>
          <div
            className="p-4"
          >
            <div
              className="grid grid-cols-2 gap-4 w-full"
            >
              <TextfieldController
                name="name"
                labelProps={{
                  label: "Name"
                }}
              />
              <SelectfieldController
                name="type"
                labelProps={{
                  label: "Type"
                }}
                selectProps={{
                  values: typeValues
                }}
              />
              <SelectfieldController
                name="work_status"
                labelProps={{
                  label: "Work Status"
                }}
                selectProps={{
                  values: workStatusValues
                }}
              />
            </div>
          </div>
        </FormProvider>
      </ModalForm>
    </form>
  )
}