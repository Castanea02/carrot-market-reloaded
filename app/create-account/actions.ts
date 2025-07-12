"use server";
import { z } from "zod";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
} from "@/lib/constants";
import db from "@/lib/db";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { redirect } from "next/navigation";

const checkUsername = (username: string) =>
  !username.includes("admin");

const checkUniqueUsername = async (
  username: string,
) => {
  //유저이름 중복
  const user = await db.user.findUnique({
    where: { username },
    select: { id: true },
  });
  return !Boolean(user);
};

const checkUniqueEmail = async (email: string) => {
  //이메일 중복
  const user = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });
  return !Boolean(user);
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
      // .transform((username) => {
      //   return `🔥${username}`;
      // })
      .refine(checkUsername, "No Admin")
      .refine(
        checkUniqueUsername,
        "Username already exists",
      ),
    email: z
      .string()
      .email()
      .toLowerCase()
      .trim()
      .refine(
        checkUniqueEmail,
        "Email already exists",
      ),
    password: z.string().min(PASSWORD_MIN_LENGTH),
    // .regex(
    //   PASSWORD_REGEX,
    //   "Password must contain at least one letter, one number, and one special character",
    // ),
    confirm_password: z
      .string()
      .min(PASSWORD_MIN_LENGTH),
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

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    //비밀번호 해싱
    const hashedPassword = await bcrypt.hash(
      result.data.password,
      12,
    );
    console.log("Hashed Password:", hashedPassword);
    //유저 저장
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    const cookie = await getIronSession(cookies(), {
      cookieName: "carrot-session",
      password: process.env.COOKIE_PASSWORD!,
    });

    //@ts-ignore
    cookie.id = user.id;
    await cookie.save();

    redirect("/profile");
  }
}
