"use client";

import { Berkshire_Swash } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const berkshireSwash = Berkshire_Swash({ subsets: ["latin"], weight: ["400"] });

function Logo() {
  const pathName = usePathname();

  return (
    <Link href="/" className="z-10 flex items-center gap-4">
      <Image
        src="/icon.png"
        alt="gift guide"
        width={50}
        height={50}
        quality={100}
      />
      <span
        className={`${berkshireSwash.className} ${pathName === "/" ? "text-foreground-light" : "text-foreground"} text-xl tracking-wide`}
      >
        Gift Guide
      </span>
    </Link>
  );
}

export default Logo;
