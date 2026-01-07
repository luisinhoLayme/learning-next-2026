
export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="flex items-center justify-between px-6 py-3">
        <h1 className="text-sm font-semibold">Dashboard</h1>
        <img src="https://i.pravatar.cc/40" className="w-8 h-8 rounded-full" />
      </div>
    </header>
  );
}
