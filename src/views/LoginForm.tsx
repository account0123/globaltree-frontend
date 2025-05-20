import { useForm } from "react-hook-form";
import FormError from "../components/FormError";
import type { LoginCredentials } from "../typings/Form";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import localforage from "localforage";
import { useNavigate } from "react-router";
import { useClient } from "../lib/Client";

export default function LoginForm() {
  const navigate = useNavigate();
  const client = useClient();
  const defaultValues: LoginCredentials = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  async function onSubmit(fields: LoginCredentials) {
    try {
      await client.login(fields);
      toast.success("Authenticated successfully");
      reset();
      await localforage.setItem("session", client.session);
      navigate("/dashboard");
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
      noValidate
    >
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
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && <FormError error={errors.email} />}
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
            required: true,
          })}
        />
        {errors.password && <FormError error={errors.password} />}
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value="Iniciar Sesión"
      />
    </form>
  );
}
