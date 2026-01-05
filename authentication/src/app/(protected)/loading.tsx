
export default function Loading() {
  return (
    <div className="p-6 space-y-6 animate-pulse xl:h-screen flex flex-col justify-between">
      {/* "Título" del dashboard */}
      <div className="h-8 w-48 bg-gray-200 rounded-md dark:bg-gray-700" />

      {/* Grid de tarjetas (Stats) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-100 rounded-xl dark:bg-gray-800" />
        ))}
      </div>

      {/* Sección principal de contenido */}
      <div className="space-y-4">
        <div className="h-4 w-full bg-gray-200 rounded-md dark:bg-gray-700" />
        <div className="h-4 w-3/4 bg-gray-200 rounded-md dark:bg-gray-700" />
        <div className="h-4 w-1/2 bg-gray-200 rounded-md dark:bg-gray-700" />
      </div>

      {/* Una tabla falsa o lista */}
      <div className="mt-8 border border-gray-100 rounded-lg p-4 dark:border-gray-800">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center space-x-4 mb-4 last:mb-0">
            <div className="h-10 w-10 bg-gray-200 rounded-full dark:bg-gray-700" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/4 bg-gray-200 rounded-md dark:bg-gray-700" />
              <div className="h-3 w-1/6 bg-gray-100 rounded-md dark:bg-gray-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
