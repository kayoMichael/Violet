"use client";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  handleClick?: () => void;
  className?: string;
  disabled?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}

const SubmitButton = ({
  children,
  handleClick,
  className,
  disabled,
  variant,
}: Props) => {
  const { pending } = useFormStatus();
  return (
    <Button
      className={cn(className)}
      disabled={pending || disabled}
      onClick={handleClick}
      type="submit"
      variant={variant}
    >
      {pending && (
        <div className="animate-spin h-6 w-6 mr-2 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      )}
      {children}
    </Button>
  );
};

export default SubmitButton;
