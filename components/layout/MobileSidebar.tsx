"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, LayoutDashboard, BarChart3 } from "lucide-react";
import Link from "next/link";
import LogoutButton from "@/components/auth/LogoutButton";
import { Separator } from "@/components/ui/separator";

export default function MobileSidebar({
  workspaceId,
}: {
  workspaceId?: string;
}) {
  return (
    <div className="md:hidden flex items-center justify-between px-4 py-3 border-b bg-slate-900 text-white transition-all duration-300">
      <h2 className="font-semibold">AI Workspace</h2>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-64">
          <SheetHeader>
            <SheetTitle>AI Workspace</SheetTitle>
          </SheetHeader>

          <div className="mt-6 flex flex-col gap-2">
            
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100"
            >
              <LayoutDashboard size={18} />
              Workspaces
            </Link>

            {workspaceId && (
              <Link
                href={`/workspace/${workspaceId}/dashboard`}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100"
              >
                <BarChart3 size={18} />
                Insights
              </Link>
            )}

            <Separator className="my-4" />

            <LogoutButton />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}