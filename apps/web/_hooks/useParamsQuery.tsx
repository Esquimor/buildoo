"use client"

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";

export default function useParamsQuery() {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

   // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())

      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
 
      return params.toString()
    },
    [searchParams]
  );

  const setParamsQuery = (name: string, value: string | null) => {
    router.push(pathname + "?" + createQueryString(name, value))
  }

  const getParamByName = (name: string): string => {
    // @ts-ignore: check if has tab before get it
    return searchParams.has(name) ? searchParams.get(name) : null;
  }
  
  return {
    setParamsQuery,
    getParamByName
  }
}