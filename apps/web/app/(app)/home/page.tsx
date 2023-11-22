"use client"

import { Label } from "@shared-ui";
import { trpc } from "../../trpc";

export default function Home() {

  const projects = trpc.project.getAll.useQuery();

	return (
    <div
      className="flex flex-col justify-top items-center h-screen bg-zinc-100 pt-8"
    >
			{projects.data?.map(project => (
				<div
					className="w-full max-w-5xl"
					key={project.id}
				>
					<div
						className="flex justify-between bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
					>
						<Label
							label={project.name}
							size="text-2xl"
							weight="font-bold"
						/>
						<a
							href={`/project/${project.id}`}
						>
							Link
						</a>
					</div>
				</div>
			))}
		</div>
	)
}