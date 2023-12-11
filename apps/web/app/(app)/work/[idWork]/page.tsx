"use client"

import { trpc } from "apps/web/app/trpc";
import { useState } from "react";

interface PageProps {
  params: {
    idWork: string;
  }
}

export default function Page({
  params
}: PageProps) {

  const work = trpc.work.get.useQuery({ ids: [params.idWork]});
  
  return (
    <div>
      {JSON.stringify(work.data)}
    </div>
  )
}