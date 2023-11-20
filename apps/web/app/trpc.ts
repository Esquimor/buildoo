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
          async headers() {
            const token = localStorage.getItem("token")

            return {
              Authorization: token ? `Bearer ${localStorage.getItem("token")}` : ""
            }
          }
        }),
      ],
    }
  },
  ssr: true,
});