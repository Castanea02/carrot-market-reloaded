"use client";
import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="primary-btn h-10 disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-300"
    >
      {pending ? "loading..." : text}
    </button>
  );
}
