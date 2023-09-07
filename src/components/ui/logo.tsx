"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Quicksand } from "next/font/google";
const font = Quicksand({ weight: "600", subsets: ["latin"] });

const Logo = () => {
  return (
    <Link href="/" className="flex items-center">
      <div className="relative h-8 w-8 mr-4">
        <Image fill alt="Logo" src="/logo.svg" />
      </div>
      <h1 className={cn("text-2xl font-bold text-[#2e0074]", font.className)}>
        conversa.
      </h1>
    </Link>
  );
};

export default Logo;
