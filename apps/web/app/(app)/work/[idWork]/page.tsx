"use client"

import { trpc } from "apps/web/app/trpc";
import { useEffect } from "react";
import { useWorkStore } from "./_store/workStore.store";

interface PageProps {
  params: {
    idWork: string;
  }
}

export default function Page({
  params
}: PageProps) {

  const work = trpc.work.get.useQuery({
    ids: [params.idWork],
  });

  const setWork = useWorkStore((state) => state.setWork)
  const workStore = useWorkStore((state) => state.work)


  useEffect(() => {
    if (work.data)
      // TODO: fix type
      // @ts-ignore: date not rightfull converted
      setWork(work.data[0])
  }, [work.data])
  
  return (
    <div>
      {JSON.stringify(workStore)}
    </div>
  )
}