"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/prisma/client";
import { z } from "zod";
import * as bcrypt from "bcrypt";

const signUpSchema = z
  .object({
    email: z.string().email("メールアドレスが無効です。"),
    password: z.string().min(6, "パスワードは6文字以上で入力してください。"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません。",
    path: ["confirmPassword"],
  });

export type returnMessage = {
  status: "error" | "success";
  email: string[];
  password: string[];
  confirmPassword: string[];
};

const message = {
  status: "success",
  email: [],
  password: [],
  confirmPassword: [],
} as returnMessage;

export const handleSignup = async (
  prevState: returnMessage,
  formData: FormData,
) => {
  const signUpInfo = {
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const result = signUpSchema.safeParse(signUpInfo);
  if (!result.success) {
    const error = result.error.flatten().fieldErrors;
    message.status = "error";
    message.email = error?.email ? error.email : [];
    message.password = error?.password ? error.password : [];
    message.confirmPassword = error?.confirmPassword
      ? error.confirmPassword
      : [];
  } else {
    try {
      await prisma.user.create({
        data: {
          email: signUpInfo.email!.toString(),
          password: await bcrypt.hash(signUpInfo.password!.toString(), 10),
        },
      });
      revalidatePath("/auth/signin");
      redirect("/auth/signin");
    } catch (error) {
      message.status = "error";
      message.email = ["このメールアドレスは既に登録されています。"];
    }
  }
  return message;
};
