'use client'
import { ChangeEvent, useEffect, useState } from "react";
import Cookie from 'js-cookie'

// ThemeRadios.jsx
// Componente React listo para pegar en tu proyecto (Tailwind recomendado).
// - 3 radios: light, dark, custom
// - state para atrapar value
// - persiste en localStorage
// - preview visual

// const themeLocal = localStorage.getItem("theme") || "light";
export default function ThemeRadios({themeC}: {themeC: string}) {
  const [theme, setTheme] = useState(themeC);

  const changeTheme = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setTheme(value)
    Cookie.set('theme', value)
    // localStorage.setItem("theme", value);
    document.documentElement.setAttribute("data-theme", value);
  }

  const onClick = async() => {
    const resp = await fetch('/api/hello')
    const data = await resp.json()
    console.log(data)
  }

  // useEffect(() => {
  //   // Aplica la "clase" o atributo en el root del documento para que puedas
  //   // condicionar estilos globales desde CSS (si lo necesitas).
  //   const themeLocal = localStorage.getItem("theme") || "light";
  //   const cookies = Cookie.get('theme') || 'light'
  //
  //   // document.documentElement.setAttribute("data-theme", cookies);
  //   setTheme(cookies)
  // }, []);

  const themeClasses: any = {
    light: "bg-white text-slate-900",
    dark: "bg-slate-900 text-white",
    custom:
      "bg-gradient-to-br from-purple-500 via-pink-500 to-amber-400 text-white",
  };

  return (
    <div className="max-w-xl mx-auto p-6 rounded-2xl shadow-lg ring-1 ring-slate-900/5">
      <header className="mb-4">
        <h2 className="text-xl font-semibold">Theme switcher</h2>
        <p className="text-sm text-slate-500">Elige uno de los 3 temas — capturo su value.</p>
      </header>

      <form className="flex gap-3 items-center">
        {[
          { id: "light", label: "Light" },
          { id: "dark", label: "Dark" },
          { id: "custom", label: "Custom" },
        ].map(({ id, label }) => (
          <label
            key={id}
            htmlFor={id}
            className={`flex items-center gap-2 cursor-pointer select-none p-2 rounded-lg transition-shadow hover:shadow-md ${
              theme === id ? "ring-2 ring-offset-2 ring-indigo-300" : ""
            }`}
          >
            <input
              id={id}
              name="theme"
              type="radio"
              value={id}
              checked={theme === id}
              onChange={changeTheme}
              className="peer sr-only"
              aria-checked={theme === id}
              aria-label={`Seleccionar tema ${label}`}
            />

            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium border-2 ${
                id === "light"
                  ? "border-slate-200 bg-white text-slate-900"
                  : id === "dark"
                  ? "border-slate-700 bg-slate-800 text-white"
                  : "border-transparent"
              }`}
              aria-hidden
            >
              {id === theme ? "✓" : ""}
            </span>

            <span className="min-w-16">{label}</span>
          </label>
        ))}
      </form>

      <section className="mt-6">
        <h3 className="text-sm font-medium text-slate-600 mb-2">Preview</h3>

        <div
          className={`rounded-xl p-6 transition-all duration-300 ${themeClasses[theme]}`}
          role="region"
          aria-live="polite"
        >
          <p className="text-lg font-semibold">Tema: {theme}</p>
          <p className="mt-2 text-sm opacity-90">
            Aquí tienes una tarjeta de ejemplo para ver cómo se aplica el tema. El valor
            seleccionado queda en <code className="bg-white/10 rounded px-1 py-0.5">localStorage</code>.
          </p>

          <div className="mt-4 flex gap-3">
            <button className="px-3 py-1 rounded-md bg-white/20 backdrop-blur-sm border border-white/10">
              Acción
            </button>
            <button onClick={onClick} className="px-3 py-1 rounded-md bg-white/10 border border-white/10">Request</button>
          </div>
        </div>
      </section>

      <footer className="mt-4 text-xs text-slate-500">
        Tip: si quieres que Tailwind cambie cosas globales, puedes leer el atributo
        <code className="mx-1">data-theme</code> en :root o documentElement y
        condicionar estilos con selectors CSS.
      </footer>
    </div>
  );
}

