"use client";

import { use, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { UIContext } from "@/context/ui";

const themes = [
  { name: "light", value: "blossom", icon: <Sun size={16} /> },
  { name: "dark", value: "midnightBlossom", icon: <Moon size={16} /> }
];

export const changeTheme = (t: string) => {
  localStorage.setItem("theme", t);
  document.documentElement.setAttribute("data-theme", t);
};

export default function ThemeSwitcher() {
  const { toggleTheme } = use(UIContext)

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "blossom";
    if (saved === 'blossom') {
      toggleTheme('light')
    } else {
      toggleTheme('dark')
    }
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  return (
    <details className="">
      <summary className="flex items-center gap-2">
        Theme
      </summary>

      <ul className="menu dropdown-content mt-0 bg-base-200 rounded-box z-10 shadow min-w-32">
        {themes.map((t) => (
          <li key={t.name}>
            <button
              onClick={() => {
                changeTheme(t.value)
                toggleTheme(t.name)
              }}
              className="flex items-center gap-2"
            >
              {t.icon} {t.name}
            </button>
          </li>
        ))}
      </ul>
    </details>
  );
}
