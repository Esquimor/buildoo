"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Label } from "@shared-ui";
import { TextfieldController } from "apps/web/app/_components/form/textfieldController";
import { trpc } from "apps/web/app/trpc";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import * as z from 'zod';

type FormValues = {
  name: string;
}

export default function ProjectCreate() {
  
  const router = useRouter();

  const createProject =  trpc.project.create.useMutation({
    onSuccess(data) {
      router.push("/home");
    }
  });

  const schema = z.object({
    name: z.string().min(1, { message: "Required" }),
  })

  const formMethods = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (values: FormValues) => {

    createProject.mutate(values);
  }

  return (
    <div
      className="flex justify-center items-top h-screen bg-zinc-100 pt-8"
    >
      <div
        className="w-full max-w-5xl">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={formMethods.handleSubmit(onSubmit)}
        >
          <FormProvider {...formMethods}>
            <div
              className="mb-4"
            >
              <Label label="Create a Project" size="text-2xl" weight="font-bold" />
            </div>
            <div
              className="mb-4"
            >
              <TextfieldController
                name="name"
                labelProps={{
                  label: "Name"
                }}
              />
            </div>
            <div
              className="flex items-center justify-start"
            >
              <Button label="Create" onClick={formMethods.handleSubmit(onSubmit)} />
            </div>
          </FormProvider>
        </form>
      </div>
    </div>
  )
}