export default function Home() {
  return (
    <main className="grid gap-2 sm:grid-cols-3 p-2">
      <div className="card card-border bg-base-100 h-[calc(100vh-80px)] shadow-sm dark:shadow-gray-50/20">
        <span className="badge badge-xl badge-soft badge-warning ml-2 mt-2">Pendientes</span>
        <div className="card-body">
          {/* <h2 className="card-title">Pendientes</h2> */}

        </div>
      </div>
      <div className="card card-border bg-base-100 h-[calc(100vh-80px)] shadow-sm dark:shadow-gray-50/20">
        <span className="badge badge-xl badge-soft badge-info ml-2 mt-2">En Progreso</span>
        <div className="card-body">
          {/* <h2 className="card-title">En Progreso</h2> */}

        </div>
      </div>
      <div className="card card-border bg-base-100 h-[calc(100vh-80px)] shadow-sm dark:shadow-gray-50/20">
        <span className="badge badge-xl badge-soft badge-success ml-2 mt-2">Completados</span>
        <div className="card-body">
          {/* <h2 className="card-title">Completados</h2> */}

        </div>
      </div>
    </main>
  )
}
