import { useForm } from "react-hook-form";
import FormError from "../components/FormError";
import type { SignupFields } from "../typings/Form";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { useClient } from "../lib/Client";
import { useLocation, useNavigate } from "react-router";

export default function SignupForm() {

  const navigate = useNavigate();
  const client = useClient();
  const { state } = useLocation();
  const defaultValues: SignupFields = {
    name: "",
    email: "",
    slug: state?.username || "",
    password: "",
    password2: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  async function onSubmit(fields: SignupFields) {
    try {
      await client.createAccount(fields);
      toast.success("Account created successfully");
      reset();
      state.username = undefined;
      navigate("/auth/login");
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        console.error(error.response.data);
        toast.error(error.response.data.message);
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="py-6 space-y-10"
    >
      <div className="grid grid-cols-1 space-y-3">
        <label htmlFor="name" className="text-2xl text-slate-500">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Your name"
          className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
          {...register("name", { required: true })}
        />
        {errors.name && <FormError error={errors.name} />}
      </div>
      <div className="grid grid-cols-1 space-y-3">
        <label htmlFor="email" className="text-2xl text-slate-500">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          placeholder="user@example.com"
          className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
          {...register("email", {
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && <FormError error={errors.email} />}
      </div>
      <div className="grid grid-cols-1 space-y-3">
        <label htmlFor="slug" className="text-2xl text-slate-500">
          Username
        </label>
        <input
          id="slug"
          type="text"
          placeholder="your_username"
          className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
          {...register("slug")}
        />
        {errors.slug && <FormError error={errors.slug} />}
      </div>
      <div className="grid grid-cols-1 space-y-3">
        <label htmlFor="password" className="text-2xl text-slate-500">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Secure password"
          className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
          {...register("password", {
            minLength: {
              value: 8,
              message: "Minimum 8 characters",
            },
          })}
        />
        {errors.password && <FormError error={errors.password} />}
      </div>

      <div className="grid grid-cols-1 space-y-3">
        <label
          htmlFor="password_confirmation"
          className="text-2xl text-slate-500"
        >
          Repeat password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Repeat secure password"
          className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
          {...register("password2", {
            validate: (value, { password }) => value == password || "Passwords should match",
          })}
        />
        {errors.password2 && <FormError error={errors.password2} />}
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value="Create account"
      />
    </form>
  );
}
