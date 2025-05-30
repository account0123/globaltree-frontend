import { useQueryClient } from "@tanstack/react-query";
import localforage from "localforage";
import { useNavigate } from "react-router";

export default function DashboardNav() {
  const navigate = useNavigate();
  const qClient = useQueryClient();
  function signOut() {
    localforage.removeItem("session");
    qClient.invalidateQueries({ queryKey: ["user"] });
    navigate("/auth/login");
  }
  return (
    <nav className="md:w-1/3 md:flex md:justify-end">
      <button
        className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
        onClick={signOut}
      >
        Sign out
      </button>
    </nav>
  );
}
