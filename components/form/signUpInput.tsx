import React from "react";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { returnMessage } from "@/app/auth/action";

interface Props {
  state: returnMessage;
}
const SignUpInput = ({ state }: Props) => {
  return (
    <>
      <Label className="sr-only" htmlFor="email">
        Email
      </Label>
      <Input
        id="email"
        name="email"
        placeholder="name@example.com"
        className={state?.email.length !== 0 ? "border-red-400" : ""}
      />
      <p className="text-red-400 text-sm">{state?.email}</p>
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
      <Input
        id="confirmPassword"
        name="confirmPassword"
        placeholder="Confirm Password"
        type="password"
        autoCapitalize="none"
        autoCorrect="off"
        className={state?.confirmPassword.length !== 0 ? "border-red-400" : ""}
      />
      <p className="text-red-400 text-sm">{state?.confirmPassword}</p>
    </>
  );
};

export default SignUpInput;
