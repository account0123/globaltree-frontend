import { Outlet } from "react-router";
import { Toaster } from "sonner";

export default function AuthLayout() {
  return (
    <main className="bg-slate-700 min-h-screen">
      <div className="max-w-lg mx-auto pt-10 px-5">
        <img src="/logo.svg" alt="GlobalTree Logo" />
        <Outlet />
      </div>
      <Toaster position="top-right" duration={6_000} />
    </main>
  );
}
