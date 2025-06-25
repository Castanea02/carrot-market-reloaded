import { InputHTMLAttributes } from "react";

interface InputProps {
  name: string;
  errors?: string[];
}

export default function Input({
  name,
  errors = [],
  ...rest
}: InputProps &
  InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        className="h-10 w-full rounded-md border-none bg-transparent ring-1 ring-neutral-200 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
        {...rest}
      />
      {Array.isArray(errors) &&
        errors.map((error, index) => (
          <span
            key={index}
            className="font-medium text-red-500"
          >
            {error}
          </span>
        ))}
    </div>
  );
}
