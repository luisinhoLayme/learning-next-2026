export interface StatProps {
  title: string;
  value: string;
  hint: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export function Stat({ title, value, hint, icon: Icon }: StatProps) {
  return (
    <article className="p-4 rounded-lg bg-white border border-gray-100 shadow-sm flex items-center gap-4">
      <div className="p-2 rounded-md bg-indigo-50 text-indigo-600">
        {Icon && <Icon className="w-5 h-5" />}
      </div>
      <div>
        <h4 className="text-xs text-gray-500">{title}</h4>
        <p className="text-xl font-semibold mt-1">{value}</p>
        <p className="text-xs text-indigo-600 mt-2">{hint}</p>
      </div>
    </article>
  );
}
