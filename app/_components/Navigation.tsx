"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/ModeToggle";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navigation() {
  const pathName = usePathname();

  return (
    <nav className="z-10 text-lg">
      <ul className="flex items-center gap-8">
        <SignedOut>
          <li>
            <SignInButton mode="modal">
              <Button variant="secondary">Sign in</Button>
            </SignInButton>
          </li>
          <li>
            <SignUpButton mode="modal">
              <Button>Sign up</Button>
            </SignUpButton>
          </li>
        </SignedOut>
        <SignedIn>
          <li>
            <Link
              href="/account"
              className={`${pathName === "/" ? "text-foreground-light" : "text-foreground"} transition-colors hover:text-primary`}
            >
              Account
            </Link>
          </li>
          <li>
            <SignOutButton>
              <Button variant="secondary" className="h-auto">
                Sign out
              </Button>
            </SignOutButton>
          </li>
        </SignedIn>
        <li>
          <ModeToggle />
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
