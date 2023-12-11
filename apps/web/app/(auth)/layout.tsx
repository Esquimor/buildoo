export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex justify-center items-center h-screen bg-zinc-100"
    >
      <div
        className="w-full max-w-md"
      >
        <div
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          {children}
        </div>
      </div>
    </div>
  );
}