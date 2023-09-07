"use client";

import Button from "@/components/ui/button";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import Logo from "@/components/ui/logo";
import Link from "next/link";
import Image from "next/image";
import { Quicksand } from "next/font/google";
import { cn } from "@/lib/utils";
const font = Quicksand({ weight: "600", subsets: ["latin"] });

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function loginWithGoogle() {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      // display error message to user
      toast.error("Something went wrong with your login.");
    } finally {
      setIsLoading(false);
    }
  }
  // <div class="relative h-full w-full bg-white"><div class="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div></div>
  return (
    <div className="flex min-h-full w-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative ">
      <div className="flex items-center justify-center absolute h-full w-full bg-[radial-gradient(#ebebe5_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
        <div className="w-full flex flex-col items-center max-w-md space-y-8">
          <div className="flex flex-col items-center gap-8">
            <Link href="/" className="flex items-center">
              <div className="relative h-8 w-8 mr-4">
                <Image fill alt="Logo" src="/logo.svg" />
              </div>
              <h1
                className={cn(
                  "text-4xl font-bold text-[#2e0074]",
                  font.className
                )}
              >
                conversa.
              </h1>
            </Link>
            <div className="w-[70vw] lg:w-[100vw] md:w-[50vw] sm:w-[40vw] text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold text-center">
              <h1>Realtime messaging chat</h1>
            </div>
            <h2 className="mt-6 text-center text-lg font-xs tracking-tight">
              Sign in to your account
            </h2>
          </div>
          <Button
            isLoading={isLoading}
            type="button"
            className="max-w-sm mx-auto w-full"
            onClick={loginWithGoogle}
          >
            {isLoading ? null : (
              <svg
                className="mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="github"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
            )}
            Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
