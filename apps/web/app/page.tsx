"use client"

import { Button } from '@shared-ui';
import { trpc } from "./trpc";

export default async function Index() {
  const greeting = await trpc.users.secretPlace.useQuery();

  return (
    <div>
      <Button />
      <span className="text-red-700">{greeting.data}</span>
    </div>
  )
}
