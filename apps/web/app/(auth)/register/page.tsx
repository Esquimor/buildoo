"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "../../trpc";
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from "react-hook-form";
import * as z from 'zod';
import { Button } from "@shared-ui";
import { TextfieldController } from "../../_components/form/textfieldController";

type FormValues = {
  email: string;
  password: string;
}

export default function Register() {
    const router = useRouter();
  
    const register =  trpc.auth.register.useMutation({
      onSuccess() {
        router.push("/login");
      },
    });

    const schema = z.object({
      email: z.string().min(1, { message: "Required" }),
      password: z.string().min(1, { message: "Required" })
    })

    const formMethods = useForm<FormValues>({
      resolver: zodResolver(schema),
    });

    const onSubmit = (values: FormValues) => {
      register.mutate(values);
    }
  
    return (
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
      >
        <FormProvider {...formMethods}>
          <div
            className="mb-4"
          >
            <TextfieldController
              name="email"
              labelProps={{
                label: "Email"
              }}
            />
          </div>
          <div
            className="mb-6"
          >
            <TextfieldController
              name="password"
              labelProps={{
                label: "Password"
              }}
              inputProps={{
                type: "password"
              }}
            />
          </div>
          <div
            className="flex items-center justify-center"
          >
            <Button label="Register" onClick={formMethods.handleSubmit(onSubmit)} />
          </div>
        </FormProvider>
      </form>
    );
  }