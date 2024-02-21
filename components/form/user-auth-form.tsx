"use client";

import * as React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { returnMessage } from "@/app/auth/action";
import { useFormState } from "react-dom";

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
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
            />
            <Input
              id="Password"
              name="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
            />
            {type === "signup" && (
              <Input
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                autoCapitalize="none"
                autoCorrect="off"
              />
            )}
          </div>
          <SubmitButton>Sign Up with Credentials</SubmitButton>
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
        handleClick={() => signIn("google", { callbackUrl: "/tickets" })}
      >
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        Google
      </SubmitButton>
    </div>
  );
}
