export default function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-[#ECE6D7] bg-white px-8">

      <div>
        <h1 className="text-2xl font-bold">
          AI Workspace
        </h1>

        <p className="text-sm text-gray-500">
          Welcome back 👋
        </p>
      </div>

      <div className="rounded-full bg-[#FFF8ED] px-5 py-2 font-medium text-[#C89B2B]">
        Studio Owner
      </div>

    </header>
  );
}