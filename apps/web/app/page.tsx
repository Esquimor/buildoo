"use client"        

import { Button } from '@shared-ui';
import { trpc } from "./trpc";

export default function Index() {
  const greeting = trpc.user.secretPlace.useQuery(undefined, {
    onError(err) {
      console.log(err)
    }
  });

  return (
    <div>
      <Button />
      {greeting.isSuccess && <span className="text-red-700">{greeting.data}</span>}
    </div>
  )
}
