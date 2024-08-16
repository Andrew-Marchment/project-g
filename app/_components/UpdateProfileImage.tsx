"use client";

import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import SpinnerMini from "./SpinnerMini";
import { useRouter } from "next/navigation";

function UpdateProfileImage() {
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function getFile(e: React.ChangeEvent<HTMLInputElement>) {
    setLoading(true);
    const files = e.target.files;
    if (!files) return;

    const file = files[0];

    user
      ?.setProfileImage({ file })
      .then(() => {
        setLoading(false);
        router.refresh();
      })
      .catch((error) => console.log("An error occurred:", error));
  }

  function handleImage(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!inputRef || !inputRef.current) return;
    inputRef.current.click();
  }

  return (
    <form className="flex">
      <Input
        className="invisible"
        ref={inputRef}
        type="file"
        onChange={getFile}
      />
      <Button
        disabled={loading}
        className="min-w-[125px]"
        onClick={handleImage}
      >
        {loading ? <SpinnerMini /> : "Upload image"}
      </Button>
    </form>
  );
}

export default UpdateProfileImage;
