import { type FC, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const DarkLayout:FC<Props> = ({ children }) => {
  return (
    <div style={{ display: 'flex', border: '1px solid black', marginTop: '20px' }}>
      {/* 🧭 Esta barra lateral solo aparece en las rutas del Dashboard */}
      <nav style={{ width: '200px', padding: '15px', backgroundColor: '#f0f0f0' }}>
        <h3>Menú del Dashboard</h3>
        <ul>
          <li>Perfil</li>
          <li>Ajustes</li>
        </ul>
      </nav>

      {/* 📄 El contenido de la ruta anidada (por ejemplo, settings/page.tsx) */}
      <section style={{ flex: 1, padding: '15px' }}>
        {children}
      </section>
    </div>
  )
}

export default DarkLayout
