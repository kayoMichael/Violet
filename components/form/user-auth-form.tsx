"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { returnMessage } from "@/app/api/auth/action";
import { useFormState, useFormStatus } from "react-dom";

import { signIn } from "next-auth/react";

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
  const { pending } = useFormStatus();

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
              disabled={pending}
              required
            />
            <Input
              id="Password"
              name="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={pending}
              required
            />
            {type === "signup" && (
              <Input
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={pending}
                required
              />
            )}
          </div>
          <Button disabled={pending}>
            {pending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Sign Up with Credentials
          </Button>
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
      <Button
        variant="outline"
        type="button"
        disabled={pending}
        className="mb-0"
      >
        {pending ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
      <Button
        variant="outline"
        type="button"
        disabled={pending}
        className="mt-0"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        {pending ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  );
}
