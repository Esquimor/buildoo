"use client"

import { Button, Label } from "@shared-ui";
import { trpc } from "../../trpc";
import { Sites } from "./_components/sites";
import { TrpcStatus } from "apps/web/_components/trpcStatus";
import { useRouter } from 'next/navigation';

export default function Home() {

  const sites = trpc.site.get.useQuery();

	const router = useRouter()

	return (
    <div
      className="flex flex-col justify-top items-center max-w-screen-xl mx-auto"
    >
			<div
				className="flex justify-between items-center w-full border-b-2 border-gray-400 pb-2"
			>
				<Label
					label="Sites"
					weight="font-bold"
					size="text-4xl"
				/>
				<Button
					label="Add a site"
					onClick={() => router.push('/site/create')}
				/>
			</div>
			<TrpcStatus
				status={sites.status}
			>
				{sites.data?.length === 0 ? (
					<div
						className="flex items-center"
					>
						<Label
							label="No site found. Add one."
						/>
					</div>
				) : (
					<div
						className="mt-4 w-full"
					>
						<Sites
							sites={sites.data || []}
						/>
					</div>
				)}
			</TrpcStatus>
		</div>
	)
}