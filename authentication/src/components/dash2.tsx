import { useState } from "react";
import {
  PanelLeft,
  PanelLeftClose,
  Users,
  BarChart3,
  Settings,
  UserPlus,
  Activity,
  TrendingDown,
} from "lucide-react";

export default function DashboardPreview() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 text-slate-800">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`flex-1 flex flex-col ${collapsed ? "ml-20" : "ml-64"} transition-all duration-300`}>
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

function Sidebar({ collapsed, setCollapsed }) {
  return (
    <aside
      className={`${collapsed ? "w-20" : "w-64"} transition-all duration-300 bg-white border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 z-20`}
    >
      <div className="p-4 flex items-center justify-between">
        <span className="font-semibold">DB</span>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
          aria-label="Toggle sidebar"
        >
          {collapsed ? (
            <PanelLeft className="w-5 h-5" />
          ) : (
            <PanelLeftClose className="w-5 h-5" />
          )}
        </button>
      </div>

      <nav className="flex-1 px-2 space-y-1">
        <SidebarItem collapsed={collapsed} label="Usuarios" icon={Users} />
        <SidebarItem collapsed={collapsed} label="Analíticas" icon={BarChart3} />
        <SidebarItem collapsed={collapsed} label="Ajustes" icon={Settings} />
      </nav>
    </aside>
  );
}

function SidebarItem({ collapsed, label, icon: Icon }) {
  return (
    <a className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 text-sm">
      <Icon className="w-5 h-5 text-gray-600" />
      {!collapsed && <span>{label}</span>}
    </a>
  );
}

function Stats() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Stat title="Usuarios totales" value="12,342" hint="+5% este mes" icon={Users} />
      <Stat title="Usuarios activos" value="8,910" hint="Últimos 30 días" icon={Activity} />
      <Stat title="Nuevos usuarios" value="1,245" hint="Este mes" icon={UserPlus} />
      <Stat title="Churn" value="2.1%" hint="-0.3%" icon={TrendingDown} />
    </section>
  );
}

// ✅ FIXED: removed extra parenthesis causing syntax error
function Stat({ title, value, hint, icon: Icon }) {
  return (
    <article className="p-4 rounded-lg bg-white border border-gray-100 shadow-sm flex items-center gap-4">
      <div className="p-2 rounded-md bg-indigo-50 text-indigo-600">
        {Icon && <Icon className="w-5 h-5" />}
      </div>
      <div>
        <h4 className="text-xs text-gray-500">{title}</h4>
        <p className="text-xl font-semibold mt-1">{value}</p>
        <p className="text-xs text-indigo-600 mt-2">{hint}</p>
      </div>
    </article>
  );
}

function UserChart() {
  return (
    <div className="h-72 w-full">
      <svg viewBox="0 0 100 40" className="w-full h-full">
        {/* grid */}
        <g stroke="#e5e7eb" strokeWidth="0.3">
          <line x1="0" y1="10" x2="100" y2="10" />
          <line x1="0" y1="20" x2="100" y2="20" />
          <line x1="0" y1="30" x2="100" y2="30" />
        </g>

        {/* gradient */}
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#A5B4FC" />
          </linearGradient>
        </defs>

        {/* area */}
        <path
          d="M0 30 L10 28 L20 24 L30 20 L40 18 L50 14 L60 12 L70 10 L80 8 L90 6 L100 5 L100 40 L0 40 Z"
          fill="url(#lineGradient)"
          opacity="0.25"
        />

        {/* line */}
        <polyline
          fill="none"
          stroke="#6366F1"
          strokeWidth="2"
          points="0,30 10,28 20,24 30,20 40,18 50,14 60,12 70,10 80,8 90,6 100,5"
        />

        {/* dots */}
        {[30,28,24,20,18,14,12,10,8,6,5].map((y, i) => (
          <circle
            key={i}
            cx={i * 10}
            cy={y}
            r="1.2"
            fill="#4F46E5"
          />
        ))}
      </svg>

      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>Ene</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Abr</span>
        <span>May</span>
        <span>Jun</span>
        <span>Jul</span>
        <span>Ago</span>
        <span>Sep</span>
        <span>Oct</span>
        <span>Nov</span>
      </div>

      <p className="text-xs text-gray-400 mt-2">Usuarios activos por mes</p>
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
              <td className="px-4 py-3">
                <span className="px-2 py-1 text-xs rounded-full bg-green-50 text-green-600">
                  Activo
                </span>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">Carlos Ruiz</td>
              <td className="px-4 py-3 text-gray-500">carlos@example.com</td>
              <td className="px-4 py-3">
                <span className="px-2 py-1 text-xs rounded-full bg-yellow-50 text-yellow-600">
                  Pendiente
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
