"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Palette, Sparkles } from "lucide-react";

const themes = [
  { name: "light", value: "blossom", icon: <Sun size={16} /> },
  { name: "dark", value: "midnightBlossom", icon: <Moon size={16} /> }
];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "blossom";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const changeTheme = (t: string) => {
    setTheme(t);
    localStorage.setItem("theme", t);
    document.documentElement.setAttribute("data-theme", t);
  };

  const currentIcon = themes.find((t) => t.name === theme)?.icon;

  return (
    <details className="">
      <summary className="btn btn-sm flex items-center gap-2">
        Theme
      </summary>

      <ul className="menu dropdown-content bg-base-200 rounded-box z-10 p-2 shadow min-w-32">
        {themes.map((t) => (
          <li key={t.name}>
            <button
              onClick={() => changeTheme(t.value)}
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
