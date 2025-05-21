import { Link, Outlet } from "react-router";
import { Toaster } from "sonner";
import NavigationTabs from "../components/NavigationTabs";
import type { User } from "../typings/app";
import Profile from "../components/Profile";

export default function Dashboard({ user }: { user: User }) {
    return (<>
        <header className="bg-slate-800 py-5">
          <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
            <div className="w-full p-5 lg:p-0 md:w-1/3">
              <img src="/logo.svg" className="w-full block" />
            </div>
            <div className="md:w-1/3 md:flex md:justify-end">
              <button
                className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
                onClick={() => {}}
              >
                Sign out
              </button>
            </div>
          </div>
        </header>
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
              <Profile />
            </div>
          </main>
        </div>
        <Toaster position="top-right" />
      </>)
}