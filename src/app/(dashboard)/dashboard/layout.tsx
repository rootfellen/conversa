import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FC, ReactNode } from "react";

import { fetchRedis } from "@/helpers/redis";
import { getFriendsByUserId } from "@/helpers/get-friends-by-user-id";

import SidebarChatList from "@/components/sidebar-chatlist";
import FriendRequestSidebarOptions from "@/components/friend-request-sidebar-options";
import SignOutButton from "@/components/sign-out-button";
import MobileChatLayout from "@/components/mobile-chat-layout";
import Logo from "@/components/ui/logo";
import { PlusIcon } from "lucide-react";

// Done after the video and optional: add page metadata
export const metadata = {
  title: "Conversa | Dashboard",
  description: "Your dashboard",
};

const sidebarOptions: SidebarOption[] = [
  {
    id: 1,
    name: "Add friend",
    href: "/dashboard/add",
  },
];

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { chatId: string };
}) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const friends = await getFriendsByUserId(session.user.id);

  const unseenRequestCount = (
    (await fetchRedis(
      "smembers",
      `user:${session.user.id}:incoming_friend_requests`
    )) as User[]
  ).length;

  return (
    <div className="w-full flex h-screen">
      <div className="md:hidden">
        <MobileChatLayout
          friends={friends}
          session={session}
          sidebarOptions={sidebarOptions}
          unseenRequestCount={unseenRequestCount}
        />
      </div>

      <div className="hidden md:flex h-full w-full max-w-sm grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 p-8">
        <div className="flex h-16 shrink-0 items-center">
          <Logo />
        </div>
        {friends.length > 0 ? (
          <div className="text-md font-semibold leading-6 text-orange-900">
            Your chats
          </div>
        ) : null}
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <SidebarChatList sessionId={session.user.id} friends={friends} />
            </li>
            <hr />
            <li>
              <div className="text-md font-semibold leading-6 text-purple-900">
                Overview
              </div>

              <ul role="list" className="-mx-2 mt-6 space-y-4">
                {sidebarOptions.map((option) => {
                  return (
                    <li key={option.id}>
                      <Link
                        href={option.href}
                        className=" hover:text-[#2a6355] hover:bg-[#9fe4d3c2] transition duration-300 ease-in-out group flex gap-3 rounded-md p-4 text-sm leading-6 font-semibold"
                      >
                        <span className=" border-gray-200 group-hover:border-[#9fe4d3] group-hover:text-[#2a6355] transition duration-300 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-[#fef9f8]">
                          {" "}
                          <PlusIcon />
                        </span>

                        <span className="truncate">{option.name}</span>
                      </Link>
                    </li>
                  );
                })}

                <li>
                  <FriendRequestSidebarOptions
                    sessionId={session.user.id}
                    initialUnseenRequestCount={unseenRequestCount}
                  />
                </li>
              </ul>
            </li>

            <li className="-mx-6 mt-auto flex items-center">
              <div className="flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
                <div className="relative h-8 w-8 bg-gray-50">
                  <Image
                    fill
                    referrerPolicy="no-referrer"
                    className="rounded-full"
                    src={session.user.image || ""}
                    alt="Your profile picture"
                  />
                </div>

                <span className="sr-only">Your profile</span>
                <div className="flex flex-col">
                  <span aria-hidden="true">{session.user.name}</span>
                  <span className="text-xs text-zinc-400" aria-hidden="true">
                    {session.user.email}
                  </span>
                </div>
              </div>

              <SignOutButton className="h-full aspect-square" />
            </li>
          </ul>
        </nav>
      </div>

      <aside className="max-h-screen container py-16 md:py-12 w-full">
        {children}
      </aside>
    </div>
  );
};

export default Layout;
