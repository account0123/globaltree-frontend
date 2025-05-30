import { useForm } from "react-hook-form";
import FormError from "./FormError";
import type { UserSearchFields } from "../typings/Form";
import { useMutation } from "@tanstack/react-query";
import { useAnonymousClient } from "../lib/Client";
import slugify from "slugify";
import { Link } from "react-router";

export default function SearchUserForm() {
  const client = useAnonymousClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSearchFields>({
    defaultValues: {
      username: "",
    },
  });
  const mutation = useMutation({
    mutationFn: (data: UserSearchFields) =>
      client.checkSlugAvailability(data.username),
  });
  function onSubmit(data: UserSearchFields) {
    mutation.mutate(data);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="relative flex items-center bg-slate-800 px-2">
        <label htmlFor="username">{location.host}/</label>
        <input
          type="text"
          className="border-none bg-transparent p-2 focus:ring-0 flex-1"
          placeholder="elonmusk, zuck, jeffbezos"
          {...register("username", {
            required: true,
            setValueAs: (v) =>
              slugify(v, { lower: true, replacement: "_", trim: true }),
          })}
        />
      </div>
      {errors.username && <FormError error={errors.username} />}

      <div className="mt-10">
        {mutation.isPending && (
          <p className="text-center">
            Searching for {mutation.variables?.username}...
          </p>
        )}
        {mutation.error && (
          <p className="text-center text-red-500 font-black">
            {mutation.error.message}
          </p>
        )}
        {mutation.data && (
          <p className="text-center text-cyan-500">
            <span className="font-black">{mutation.data}</span> is available!{" "}
            <Link
              className="hover:underline"
              to="/auth/create"
              state={{ username: mutation.data }}
            >
              Create your account before someone else!
            </Link>
          </p>
        )}
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value="Get my Link tree"
      />
    </form>
  );
}
