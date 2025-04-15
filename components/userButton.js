"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const UserButton = () => {
    const router = useRouter();
    const { data: session, status } = useSession();

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.push("/");
    };

    if (status === "loading") {
        return <Loader className="animate-spin size-5 sm:size-6" />;
    }

    const avatarFallback = session?.user?.name?.charAt(0).toUpperCase();

    return (
        <div className="flex items-center">
            {session ? (
                <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer">
                            <span className="hidden sm:block text-sm font-medium text-[#333] dark:text-white">
                                {session.user?.name}
                            </span>
                            <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                                <AvatarImage
                                    src={session.user?.image || undefined}
                                    className="rounded-full object-cover h-full w-full"
                                />
                                <AvatarFallback className="bg-gray-700 text-white rounded-full flex items-center justify-center h-full w-full text-sm sm:text-base">
                                    {avatarFallback}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        align="end"
                        className="bg-white dark:bg-zinc-900 text-sm rounded-xl shadow-lg py-2 w-40 z-50 border dark:border-zinc-700"
                    >
                        <DropdownMenuItem
                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer"
                            onClick={handleSignOut}
                        >
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto items-end sm:items-center">
                    <Link href="/sign-in" className="w-full sm:w-auto">
                        <Button
                            variant="outline"
                            className="w-full cursor-pointer sm:w-auto px-4 py-2 text-sm rounded-full"
                        >
                            Sign in
                        </Button>
                    </Link>
                    <Link href="/sign-up" className="w-full sm:w-auto">
                        <Button
                            className="w-full cursor-pointer sm:w-auto px-4 py-2 text-sm rounded-full bg-[#3f3b2d] text-white hover:bg-[#504b37]"
                        >
                            Sign up
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default UserButton;
