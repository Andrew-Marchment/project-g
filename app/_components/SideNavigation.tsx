"use client";

import { SignOutButton } from "@clerk/nextjs";
import { BookMarked, House, LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <House className="h-5 w-5" />,
  },
  {
    name: "Profile",
    href: "/account/profile",
    icon: <User className="h-5 w-5" />,
  },
  {
    name: "Saved Items",
    href: "/account/saved",
    icon: <BookMarked className="h-5 w-5" />,
  },
];

function SideNavigation() {
  const pathname = usePathname();

  return (
    <nav className="border-r border-border">
      <ul className="flex h-full flex-col gap-2 pr-1 text-lg">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`flex items-center gap-4 rounded-md px-5 py-3 font-semibold transition-colors hover:bg-secondary hover:text-secondary-foreground ${
                pathname === link.href ? "bg-secondary" : ""
              }`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="mt-auto">
          <SignOutButton>
            <button className="flex w-full items-center gap-4 rounded-md px-5 py-3 font-semibold transition-colors hover:bg-secondary hover:text-secondary-foreground">
              <LogOut className="h-5 w-5" />
              <span>Sign out</span>
            </button>
          </SignOutButton>
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
