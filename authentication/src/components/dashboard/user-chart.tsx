
export default function UserChart() {
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
