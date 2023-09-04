"use client";

import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
const font = Montserrat({ weight: "600", subsets: ["latin"] });

const Logo = () => {
  return (
    <Link href="/" className="flex items-center">
      <div className="relative h-8 w-8 mr-4">
        <Image fill alt="Logo" src="/logo.svg" />
      </div>
      <h1 className={cn("text-2xl font-bold text-white", font.className)}>
        Conversa
      </h1>
    </Link>
  );
};

export default Logo;
