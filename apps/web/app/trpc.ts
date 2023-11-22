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
  responseMeta(opts) {
    const { clientErrors } = opts;
    if (clientErrors.length) {
      // propagate first http error from API calls
      return {
        status: clientErrors[0].data?.httpStatus ?? 500,
      };
    }
    // cache full page for 1 day + revalidate once every second
    const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
    return {
      'Cache-Control': `s-maxage=10, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
    };
  },
});