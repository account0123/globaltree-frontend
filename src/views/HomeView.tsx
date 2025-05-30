import Header from "../components/Header";
import HomeNav from "../components/nav/HomeNav";
import SearchUserForm from "../components/SearchUserForm";

export default function HomeView() {
  return (
    <>
      <Header>
        <HomeNav />
      </Header>
      <main className="bg-gray-700 min-h-screen py-10 bg-right-top bg-no-repeat lg:bg-home bg-size-[50%]">
        <div className="mx-auto max-w-5xl mt-10">
          <article className="lg:w-1/2 lg:p-0 px-10 space-y-6">
            <h1 className="text-6xl font-black">
              Todas tus <span className="text-cyan-400">Redes Sociales</span> a
              un link de distancia
            </h1>
            <p className="text-xl text-slate-200">
              Únete a más de 100 mil personas compartiendo sus redes sociales.
              Comparte tu perfil de Facebook, Twitter, LinkedIn, Instagram,
              YouTube, y más.
            </p>
            <SearchUserForm />
          </article>
        </div>
      </main>
    </>
  );
}
