"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";

export default function SubmitButton({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className="min-w-[125px]">
      {pending ? <SpinnerMini /> : children}
    </Button>
  );
}
