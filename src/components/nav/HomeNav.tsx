import { Link } from "react-router";

export default function HomeNav() {
  return (
    <nav className="md:w-1/3 md:flex md:justify-end">
      <Link className="text-white p-2 uppercase font-black text-xs cursor-pointer" to="/auth/login">Sign in</Link>
      <Link className="bg-lime-500 text-slate-800 p-2 uppercase font-black text-xs rounded-lg cursor-pointer" to="/auth/create">Sign up</Link>
    </nav>
  );
}