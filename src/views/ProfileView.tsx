import { useForm } from "react-hook-form";
import FormError from "../components/FormError";
import type { ProfileEditFields } from "../typings/Form";
import { useQueryClient } from "@tanstack/react-query";
import type { User } from "../typings/app";

export default function ProfileView() {

  const client = useQueryClient();
  const user: User | undefined = client.getQueryData(["user"]);

  const defaultValues: ProfileEditFields = {
    slug: user?.slug || "",
    description: user?.description || "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });
  function onSumbit(data: ProfileEditFields) {
    console.log(data);
  }
  return (
    <form
      className="bg-white text-black p-10 rounded-lg space-y-5"
      onSubmit={handleSubmit(onSumbit)}
    >
      <legend className="text-2xl text-slate-800 text-center">
        Edit Profile
      </legend>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="slug">Custom URL:</label>
        <div>
          <span className="text-xl px-1">{location.host}/</span>
          <input
            type="text"
            className="border-none bg-slate-100 rounded-lg"
            placeholder="username"
            {...register("slug", {required: true})}
          />
        </div>

        {errors.slug && <FormError error={errors.slug} />}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="description">Description:</label>
        <textarea
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Description"
          {...register("description")}
        />

        {errors.description && <FormError error={errors.description} />}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="image">Image:</label>
        <input
          id="image"
          type="file"
          name="image"
          className="border-none bg-slate-100 rounded-lg p-2"
          accept="image/*"
          onChange={() => {}}
        />
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value="Save changes"
      />
    </form>
  );
}
