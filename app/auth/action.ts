"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/prisma/client";
import { z } from "zod";
import * as bcrypt from "bcrypt";

const signUpSchema = z
  .object({
    email: z.string().email("Please Provide a Valid Email Address."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
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
    return message;
  } else {
    try {
      await prisma.user.create({
        data: {
          email: signUpInfo.email!.toString(),
          password: await bcrypt.hash(signUpInfo.password!.toString(), 10),
        },
      });
    } catch (error) {
      message.status = "error";
      message.email = ["This email is already in use. Please use another."];
      return message;
    }
  }
  revalidatePath("/auth/signup");
  redirect("/auth/signup/confirmation");
  return message;
};

const logInSchema = z.object({
  email: z.string().email("Password or Email Address is incorrect."),
  password: z.string().min(6, "Password or Email Address is incorrect."),
});

export const handleLogIn = async (
  prevState: returnMessage,
  formData: FormData,
) => {
  const logInInfo = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = logInSchema.safeParse(logInInfo);
  if (!result.success) {
    const error = result.error.flatten().fieldErrors;
    message.status = "error";
    message.email = error?.email ? error.email : [];
    message.password = error?.password ? error.password : [];
    return message;
  } else {
    const user = await prisma.user.findUnique({
      where: {
        email: logInInfo.email!.toString(),
      },
    });
    if (!user) {
      message.status = "error";
      message.email = ["Password or Email Address is incorrect."];
      return message;
    } else if (!user.password) {
      message.status = "error";
      message.password = ["Password or Email Address is incorrect."];
      return message;
    }
    const match = await bcrypt.compare(
      logInInfo.password!.toString(),
      user.password!,
    );
    if (!match) {
      message.status = "error";
      message.password = ["Password or Email Address is incorrect."];
      return message;
    }
  }
  revalidatePath("/auth/login");
  redirect("/tickets");
  return message;
};
