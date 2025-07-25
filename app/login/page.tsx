"use client";
import Input from "@/components/input";
import SocialLogin from "@/components/social-login";
import { login } from "./action";
import { useFormState } from "react-dom";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import Button from "@/components/button";

export default function LogIn() {
  const [state, action] = useFormState(
    login,
    null,
  ) as any;

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">
          Log in with email and password.
        </h2>
      </div>
      <form
        action={action}
        className="flex flex-col gap-3"
      >
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.password}
        />
        <Button text="Log in" />
      </form>
      <SocialLogin />
    </div>
  );
}
