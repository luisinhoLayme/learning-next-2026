
import { useState } from "react";

export default function DashboardPreview() {
  return (
    <div className="flex min-h-screen bg-gray-50 text-slate-800">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6">
          <Stats />
          <section className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 mb-6">
            <h3 className="text-sm font-semibold mb-4">Crecimiento de usuarios</h3>
            <UserChart />
          </section>
          <UsersTable />
        </main>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="flex items-center justify-between px-6 py-3">
        <h1 className="text-sm font-semibold">Dashboard</h1>
        <img src="https://i.pravatar.cc/40" className="w-8 h-8 rounded-full" />
      </div>
    </header>
  );
}

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside className={`${collapsed ? "w-20" : "w-64"} transition-all duration-300 bg-white border-r border-gray-200 flex flex-col`}>
      <div className="p-4 flex items-center justify-between">
        <span className="font-semibold">DB</span>
        <button onClick={() => setCollapsed(!collapsed)} className="text-xs px-2 py-1 rounded-md bg-gray-100">
          {collapsed ? ">" : "<"}
        </button>
      </div>
      <nav className="flex-1 px-2 space-y-1">
        <a className="block p-2 rounded-md hover:bg-gray-50 text-sm">Usuarios</a>
        <a className="block p-2 rounded-md hover:bg-gray-50 text-sm">Analíticas</a>
        <a className="block p-2 rounded-md hover:bg-gray-50 text-sm">Ajustes</a>
      </nav>
    </aside>
  );
}

function Stats() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Stat title="Usuarios totales" value="12,342" hint="+5% este mes" />
      <Stat title="Usuarios activos" value="8,910" hint="Últimos 30 días" />
      <Stat title="Nuevos usuarios" value="1,245" hint="Este mes" />
      <Stat title="Churn" value="2.1%" hint="-0.3%" />
    </section>
  );
}

function Stat({ title, value, hint }) {
  return (
    <article className="p-4 rounded-lg bg-white border border-gray-100 shadow-sm">
      <h4 className="text-xs text-gray-500">{title}</h4>
      <p className="text-xl font-semibold mt-1">{value}</p>
      <p className="text-xs text-indigo-600 mt-2">{hint}</p>
    </article>
  );
}

function UserChart() {
  return (
    <div className="h-64 w-full">
      <svg viewBox="0 0 100 40" className="w-full h-full">
        <polyline fill="none" stroke="#6366F1" strokeWidth="2" points="0,30 10,28 20,24 30,20 40,18 50,14 60,12 70,10 80,8 90,6 100,5" />
      </svg>
      <p className="text-xs text-gray-500 mt-2">Usuarios activos por mes</p>
    </div>
  );
}

function UsersTable() {
  return (
    <section className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
      <h3 className="text-sm font-semibold mb-4">Usuarios recientes</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="px-4 py-3">Ana Gómez</td>
              <td className="px-4 py-3 text-gray-500">ana@example.com</td>
              <td className="px-4 py-3"><span className="px-2 py-1 text-xs rounded-full bg-green-50 text-green-600">Activo</span></td>
            </tr>
            <tr>
              <td className="px-4 py-3">Carlos Ruiz</td>
              <td className="px-4 py-3 text-gray-500">carlos@example.com</td>
              <td className="px-4 py-3"><span className="px-2 py-1 text-xs rounded-full bg-yellow-50 text-yellow-600">Pendiente</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
