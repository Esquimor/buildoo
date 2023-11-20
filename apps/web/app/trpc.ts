"use client"

import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from '@trpc/next';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AppRouterType } from '@server/app/app.router'

export const trpc = createTRPCNext<AppRouterType>({
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