import type { FieldError } from "react-hook-form";

export default function FormError({ error }: { error: Partial<FieldError> }) {
  console.log(error)
  return (
    <p className="bg-red-50 text-red-700 uppercase p-3 text-sm font-bold text-center">
      {error.message || (error.type == "required" ? "Required field" : "")}
    </p>
  );
}
