
export default function UsersTable() {
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
