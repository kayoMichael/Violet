"use client";

import * as React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { returnMessage } from "@/app/auth/action";
import { useFormState } from "react-dom";
import { SignInResponse } from "next-auth/react";
import { signIn } from "next-auth/react";

import SubmitButton from "../button/submitButton";

interface Props {
  serverAction: (
    prevState: returnMessage,
    FormData: FormData
  ) => Promise<returnMessage>;
  type: "login" | "signup";
}

export function UserAuthForm({ serverAction, type }: Props) {
  const statusState = {
    status: "error",
    email: [],
    password: [],
    confirmPassword: [],
  } as returnMessage;

  const [state, formAction] = useFormState(serverAction, statusState);

  return (
    <div className="grid gap-4">
      <form action={formAction}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              className={state?.email.length !== 0 ? "border-red-400" : ""}
            />
            <p className="text-red-400 text-sm">
              {type === "signup" && state?.email}
            </p>
            <Input
              id="Password"
              name="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              className={state?.password.length !== 0 ? "border-red-400" : ""}
            />
            <p className="text-red-400 text-sm">{state?.password}</p>
            {type === "signup" && (
              <Input
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                autoCapitalize="none"
                autoCorrect="off"
                className={
                  state?.confirmPassword.length !== 0 ? "border-red-400" : ""
                }
              />
            )}
            <p className="text-red-400 text-sm">{state?.confirmPassword}</p>
          </div>
          <SubmitButton>
            {type === "signup"
              ? "Sign Up with Credentials"
              : "Log In with Credentials"}
          </SubmitButton>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <SubmitButton variant="outline" className="mb-0">
        <Icons.gitHub className="mr-2 h-4 w-4" />
        GitHub
      </SubmitButton>
      <SubmitButton
        variant="outline"
        className="mt-0"
        handleClick={(): Promise<SignInResponse | undefined> =>
          signIn("google", { callbackUrl: "/tickets" })
        }
      >
        <Icons.google className="mr-2 h-4 w-4" />
        Google
      </SubmitButton>
    </div>
  );
}
