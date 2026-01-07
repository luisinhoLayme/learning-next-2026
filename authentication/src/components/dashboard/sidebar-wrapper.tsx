"use client";

import { useState } from "react";
import Sidebar from './sidebar';
import Header from './header';

export default function DashboardWrapper({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 text-slate-800">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`flex-1 flex flex-col ${collapsed ? 'ml-20' : 'ml-64'} transition-all duration-300`}>
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
