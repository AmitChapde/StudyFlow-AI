"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import LogoutButton from "@/components/auth/LogoutButton";
import { Separator } from "@/components/ui/separator";

export default function MobileSidebar() {
  return (
    <div className="md:hidden flex items-center justify-between px-4 py-3 border-b bg-white">
      <h2 className="font-semibold">StudyFlow AI</h2>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu />
          </Button>
        </SheetTrigger>

        {/* FIX: open from LEFT */}
        <SheetContent side="left" className="w-64">
          <SheetHeader>
            <SheetTitle>StudyFlow AI</SheetTitle>
          </SheetHeader>

          <div className="mt-6 flex flex-col gap-4">
            <Link href="/dashboard">Dashboard</Link>

            <Separator />

            <LogoutButton />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}