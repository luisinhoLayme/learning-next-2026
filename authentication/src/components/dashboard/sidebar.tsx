"use client"

import { BarChart3, PanelLeft, PanelLeftClose, Settings, Users } from "lucide-react";
import { type Dispatch, type SetStateAction } from "react";
export interface SidebarProps {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
}

export interface SidebarItemProps {
  collapsed: boolean;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
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

function SidebarItem({ collapsed, label, icon: Icon }: SidebarItemProps) {
  return (
    <a className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 text-sm">
      <Icon className="w-5 h-5 text-gray-600" />
      {!collapsed && <span>{label}</span>}
    </a>
  );
}
