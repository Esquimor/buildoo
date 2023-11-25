import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useCallback } from "react";

export default function useParamsQuery() {
  

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

   // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  );

  
  router.push(pathname + "?" + createQueryString("tab", `${indexTab}`))
}