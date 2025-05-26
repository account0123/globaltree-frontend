import { APP_NAME } from "../lib/config";

export default function NotFoundView() {
  return <section className="text-center space-y-5">
    <h1 className="text-5xl font-bold">404 Not Found</h1>
    <p className="text-xl font-bold">The page you are looking for does not exist.</p>
    <p>Want this to be your username? <a href="/auth/create" className="underline">Create your {APP_NAME} now.</a></p>
  </section>;
}