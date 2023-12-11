"use client"

import { Card, Spinner } from "@shared-ui";
import { TrpcStatus } from "apps/web/_components/trpcStatus";
import { trpc } from "apps/web/app/trpc";
import { Header } from "./_component/header";
import { Works } from "./_component/works";
import { useState } from "react";
import { SidebarAddWork } from "./_component/sidebarAddWork";

interface PageProps {
  params: {
    idSite: string;
  }
}

export default function Page({
  params
}: PageProps) {

  const sites = trpc.site.get.useQuery({ ids: [params.idSite]});
  const works = trpc.work.get.useQuery({ site_ids: [params.idSite]});

  const [addWork, setAddWork] = useState(false);
  
  return (
    <>
      <div
        className="flex flex-col justify-top items-center h-screen bg-zinc-100 pt-8"
      >
        <div
          className="w-full max-w-5xl max-h-full"
        >
          <TrpcStatus
            status={sites.status}
            loading={(
              <Header label="Loading..." />
            )}
          >
            <Header label={sites.data?.[0].name} />
          </TrpcStatus>
          
          <Card
            className="mb-4"
          >
            <TrpcStatus
              status={works.status}
              loading={(
                <div
                  className="w-full flex justify-center"
                >
                  <Spinner size={8} />
                </div>
              )}
            >
              <Works
                onAdd={() => setAddWork(true)}
                works={works.data || []}
              />
            </TrpcStatus>
          </Card>
        </div>
      </div>
      <SidebarAddWork
        open={addWork}
        onClose={() => setAddWork(false)}
        siteId={params.idSite}
      />
    </>
  )
}