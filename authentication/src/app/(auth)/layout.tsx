
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {//bg-linear-60 from-purple-300 to-lime-200
  return (
    <section className="h-screen w-screen relative">
      <div className="w-30 h-30 sm:w-60 sm:h-60 rounded-full bg-[url('/ellipsexd.svg')] bg-cover bg-no-repeat absolute left-1/4 sm:left-5/12 -translate-x-3/6 -translate-y-3/6"></div>

      <div className="w-24 h-24 sm:w-40 sm:h-40 rounded-full bg-[url('/ellipseorange.svg')] bg-cover bg-no-repeat absolute left-9/12 -translate-x-3/6 -translate-y-3/5"></div>

      <div className="w-28 h-28 sm:w-36 sm:h-36 bg-[url('/polygon.svg')] bg-contain bg-no-repeat absolute left-1/4 sm:left-5/12 top-1/2 -translate-x-3/6 -translate-y-3/5"></div>

      <div className="w-24 h-24 bg-[url('/polygonblue.svg')] bg-contain bg-no-repeat absolute left-28 top-10/12 -translate-x-3/6 -translate-y-3/5"></div>

      <div className="w-24 h-24 sm:w-30 sm:h-30 bg-[url('/rectangleone.svg')] bg-contain bg-no-repeat absolute -right-10 lg:right-0 top-5/12 -translate-x-3/6 -translate-y-3/5"></div>

      <div className="hidden lg:block sm:w-30 sm:h-30 bg-[url('/rectangletwo.svg')] bg-contain bg-no-repeat absolute right-40 top-10/12 -translate-x-3/6 -translate-y-3/5"></div>

      <div className="hidden absolute left-6/12 top-4/12 lg:grid gap-4">
        <h2 className="font-mochiy-pop-one lg:text-4xl xl:text-5xl">Welcome back</h2>
        <p className="font-mochiy-pop-one lg:text-2xl xl:text-3xl">Please login to your account.</p>
      </div>

      <main className="h-screen w-screen lg:w-5/12 bg-white/30 backdrop-blur-sm pt-10 overflow-auto px-3 lg:px-10">
        {children}
      </main>
    </section>
  );
}
