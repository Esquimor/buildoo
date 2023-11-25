"use client"

import { Card, Label, Tabs } from "@shared-ui";
import { trpc } from "apps/web/app/trpc";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { ListContractors } from "./_components/listContractors";

interface ProjectProps {
  params: {
    id: string;
  }
}

export default function Project({
  params
}: ProjectProps) {

  const project = trpc.project.getProjectWithContractors.useQuery({
    id: params.id
  });

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
  )

  const handleChangeTab = (indexTab: number) => {
    router.push(pathname + "?" + createQueryString("tab", `${indexTab}`))
  }

  const tabs = [
    {
      id: "dashboard",
      name: "Dashboard",
      component: (
        <div>
          Dashboard
        </div>
      )
    },
    {
      id: "contractors",
      name: "Contractors",
      component: <ListContractors
        contractors={project.data?.contractors || []}
        projectId={params.id}
      />
    }
  ]

  // @ts-ignore: check if has tab before get it
  const tab = searchParams.has("tab") ? +searchParams.get("tab") : 0;
  
  return (
    <div
      className="flex flex-col justify-top items-center h-screen bg-zinc-100 pt-8"
    >
      <div
        className="w-full max-w-5xl max-h-full"
      >
        <Card
          className="mb-4"
        >
          <Label label={project.data?.name} size="text-3xl" weight="font-bold" />
        </Card>

        <Card
          className="flex flex-col w-full max-h-full"
        >
          <Tabs
            tabs={tabs.map((tab, index) => ({label: tab.name, id: index}))}
            currentTab={tab}
            onClickTab={(idCurrentTab) => {
              handleChangeTab(+idCurrentTab)
            }}            
          />
          <div
            className="my-4 w-full"
          >
            {tabs[tab].component}
          </div>
        </Card>
      </div>
		</div>
  )
}