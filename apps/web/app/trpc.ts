"use client"

import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from '@trpc/next';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AppRouter } from '@server/app/trpc/trpc.router'

export const trpc = createTRPCNext<AppRouter>({
  config(opts) {
    return {
      links: [
        httpBatchLink({
          url: "http://localhost:3000/trpc", // you should update this to use env variables
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.K0OWH-3snu0W1C2mf6tJF5-zo6liDq_6tNdqL5dDOso"
          }
        }),
      ],
    }
  },
  ssr: true,
});