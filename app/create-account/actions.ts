"use server";
import { z } from "zod";

const checkUsername = (username: string) => {
  return !username.includes("admin");
};

const checkPassword = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => {
  return password === confirm_password;
};

const passwordRegex = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/,
);

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username is required",
        required_error: "Username is required",
      })
      .min(3, "너무 짧음 3글자 이상")
      .max(10, "너무 김 10글자 이하")
      .toLowerCase()
      .trim()
      .transform((username) => {
        return `🔥${username}`;
      })
      .refine(checkUsername, "No Admin"),
    email: z.string().email().toLowerCase().trim(),
    password: z
      .string()
      .min(10)
      .regex(
        passwordRegex,
        "Password must contain at least one letter, one number, and one special character",
      ),
    confirm_password: z.string().min(10),
  })
  .refine(checkPassword, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export async function createAccount(
  prevState: any,
  formData: FormData,
) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const result = formSchema.safeParse(data);

  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
