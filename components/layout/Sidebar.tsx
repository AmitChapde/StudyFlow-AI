"use client";

import Link from "next/link";
import { LayoutDashboard, Sparkles } from "lucide-react";
import LogoutButton from "@/components/auth/LogoutButton";
import { Separator } from "@/components/ui/separator";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 h-screen border-r bg-white px-4 py-6">
      
    
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight">
          StudyFlow AI
        </h2>
        <p className="text-xs text-gray-500">AI Study Workspace</p>
      </div>

      <Separator />

    
      <nav className="flex flex-col gap-2 mt-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition cursor-pointer"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

       
        {/* <Link
          href="#"
          className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-400 cursor-not-allowed"
        >
          <Sparkles size={18} />
          AI Goals
        </Link> */}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto">
        <Separator className="mb-4" />

        <LogoutButton />
      </div>
    </aside>
  );
}