"use client"

import { trpc } from "apps/web/app/trpc";
import { useEffect } from "react";
import { useWorkStore } from "./_store/workStore.store";
import { Label, TabsVertical } from "@shared-ui";
import useParamsQuery from "apps/web/_hooks/useParamsQuery";
import { TrpcStatus } from "apps/web/_components/trpcStatus";
import { General } from "./_components/general";

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
  }, [work.data]);

  const {
    setParamsQuery,
    getParamByName
  } = useParamsQuery();

  const handleChangeTab = (indexTab: number) => {
    setParamsQuery("tab", `${indexTab}`)
  }

  const tab = +getParamByName("tab") || 0;;

  const tabs = [
    {
      id: 0,
      label: "General",
      components: workStore ? <General work={workStore} /> : <div/>
    },
    {
      id: 0,
      label: "Interventions",
      components: <div>Interventions</div>
    },
    {
      id: 0,
      label: "Contractors",
      components: <div>Contractors</div>
    },
  ]
  
  return (
    <div
      className="flex max-w-screen-xl mx-auto"
    >
      <TrpcStatus
        status={work.status}
      >
        <div>
          <Label
            label={workStore?.name}
            size="text-3xl"
            weight="font-bold"
            className="mb-4"
          />
          <TabsVertical
            tabs={tabs}
            currentTab={tab}
            onClickTab={handleChangeTab}
            className="w-56"
          />
        </div>
        <div
          className="ml-4 grow min-h-screen"
        >
          {tabs[tab].components}
        </div>
      </TrpcStatus>
    </div>
  )
}