"use client"

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { TextfieldController } from '../_components/form/textfieldController';
import { Button } from '@shared-ui';
import { trpc } from '../trpc';
import { useRouter } from 'next/navigation';
import { useCookies } from 'next-client-cookies';

type FormValues = {
  email: string;
  password: string;
}

export default function Login() {

  const router = useRouter();
  const cookies = useCookies();

  const login =  trpc.auth.login.useMutation({
    onSuccess(data) {
      cookies.set('currentUser', JSON.stringify(data))
      localStorage.setItem("token", data.token)
      router.push("/home");
    }
  });

  const schema = z.object({
    email: z.string().min(1, { message: "Required" }),
    password: z.string().min(1, { message: "Required" })
  })

  const formMethods = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (values: FormValues) => {

    login.mutate(values);
  }
  
  return (
    <div
      className="w-full max-w-md">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
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
            <Button label="Sign In" onClick={formMethods.handleSubmit(onSubmit)} />
          </div>
        </FormProvider>
      </form>
    </div>
  );
}