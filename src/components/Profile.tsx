import { useQueryClient } from "@tanstack/react-query"
import type { User } from "../typings/app";

export default function Profile() {
    const user: User | undefined = useQueryClient().getQueryData(["user"]);
    if (!user) {
        return (<div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6"></div>)
    }
    return (
        <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
            <p className="text-4xl text-slate-100 text-center">{user.name}</p>
            {user.avatar && <img src={user.avatar.url} className="max-w-[250px] mx-auto rounded-md" />}
            <p className="text-xl text-slate-100 text-center">{user.description}</p>
        </div>
    )
}