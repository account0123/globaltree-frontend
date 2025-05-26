import type { User } from "../typings/app";
import Profile from "./Profile";

export default function PublicProfile({ user }: { user: User }) {
  const links = user.links?.filter((l) => l.enabled) || [];
  return (
    <div className="space-y-6">
      <Profile.Title name={user.slug} />
      {user.avatar && <Profile.Avatar avatar={user.avatar} />}
      <Profile.Description description={user.description} />
      <div className="mt-10 flex flex-col gap-6">
        {links.length ? (
          links.map((link) => <Profile.Link key={`${link.id}-${link.name}`} link={link} />)
        ) : (
          <p className="text-center text-lg font-bold">
            This user has no public links.
          </p>
        )}
      </div>
    </div>
  );
}
