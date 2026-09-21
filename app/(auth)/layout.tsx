export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Orb decorativo superior derecho */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 blur-3xl opacity-15"
      />
      {/* Orb decorativo inferior izquierdo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 blur-3xl opacity-15"
      />
      {/* Orb decorativo central tenue */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full bg-gradient-to-r from-pink-400 to-orange-300 blur-3xl opacity-10"
      />
      <div className="relative z-10 w-full flex items-center justify-center px-4 py-12">
        {children}
      </div>
    </div>
  );
}
