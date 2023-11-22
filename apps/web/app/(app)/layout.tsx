import { Header } from "./_components/header/header";

export default function AppLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {

    return (
        <div
            className="flex flex-col"
        >
            <Header />
            <main
                className="grow"
            >
                {children}
            </main>
        </div>
    )
}