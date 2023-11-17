import { Button } from '@shared-ui';
import { trpc } from "./trpc";

export default async function Index() {
  const { greeting } = await trpc.hello.query({ name: `Tom` });

  return (
    <div>
      <Button />
      <span className="text-red-700">{greeting}</span>
    </div>
  )
}
