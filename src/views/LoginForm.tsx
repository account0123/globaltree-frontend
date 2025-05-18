import { useForm } from "react-hook-form";
import FormError from "../components/FormError";
import type { LoginCredentials } from "../typings/Form";
import { api } from "../lib/Client";
import { toast } from "sonner";
import { isAxiosError } from "axios";

export default function LoginForm() {
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
      const response = await api.post(`${import.meta.env.VITE_API_URL}/auth/login`, fields);
      toast.success(response.data);
      reset();
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
