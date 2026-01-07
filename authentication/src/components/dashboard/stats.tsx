import { Users, Activity, UserPlus, TrendingDown } from "lucide-react";
import { Stat } from "./stat";

export default function Stats() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Stat title="Usuarios totales" value="12,342" hint="+5% este mes" icon={Users} />
      <Stat title="Usuarios activos" value="8,910" hint="Últimos 30 días" icon={Activity} />
      <Stat title="Nuevos usuarios" value="1,245" hint="Este mes" icon={UserPlus} />
      <Stat title="Churn" value="2.1%" hint="-0.3%" icon={TrendingDown} />
    </section>
  );
}
