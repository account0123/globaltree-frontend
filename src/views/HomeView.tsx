import Header from "../components/Header";
import HomeNav from "../components/nav/HomeNav";

export default function HomeView() {
  return (
    <>
      <Header>
        <HomeNav />
      </Header>
      <div className="bg-gray-100  min-h-screen py-10">
        <main className="mx-auto max-w-5xl p-10 md:p-0">
          <h1 className="text-4xl font-bold text-center text-slate-800">
            GlobalTree
          </h1>
          <p className="text-center text-lg text-slate-600">
            A global link tree for your community.
          </p>
        </main>
      </div>
    </>
  );
}
