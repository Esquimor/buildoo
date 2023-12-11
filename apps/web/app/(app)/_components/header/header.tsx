export function Header() {

	return (
		<header>
			<nav
				className="bg-white border-b-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 border-b-2"
			>
				<div
					className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl"
				>
					<a
						href="/home"
						className="flex items-center"
					>
						<span
							className="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
						>
								Buildoo
						</span>
					</a>
				</div>
			</nav>
		</header>
	)
}