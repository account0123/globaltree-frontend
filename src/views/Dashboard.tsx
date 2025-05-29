import { Link, Outlet } from "react-router";
import { Toaster } from "sonner";
import NavigationTabs from "../components/NavigationTabs";
import type { User } from "../typings/app";
import Profile from "../components/Profile";
import Header from "../components/Header";
import DashboardNav from "../components/nav/DashboardNav";

export default function Dashboard({ user }: { user: User }) {
  return (
    <>
      <Header>
        <DashboardNav />
      </Header>
      <div className="bg-gray-100  min-h-screen py-10">
        <main className="mx-auto max-w-5xl p-10 md:p-0">
          <NavigationTabs />
          <div className="flex justify-end">
            <Link
              className="font-bold text-right text-slate-800 text-2xl"
              to={`/${user.slug}`}
              rel="noreferrer noopener"
            >
              My profile: /{user.slug}
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-10 mt-10">
            <div className="flex-1 ">
              <Outlet />
            </div>
            <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
              <Profile />
            </div>
          </div>
        </main>
      </div>
      <Toaster position="top-right" />
    </>
  );
}
