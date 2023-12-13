import { Header } from "./_components/header/header";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div
      className="flex flex-col min-h-screen"
    >
      <Header />
      <main
        className="grow bg-zinc-100 py-8"
      >
          {children}
      </main>
    </div>
  )
}