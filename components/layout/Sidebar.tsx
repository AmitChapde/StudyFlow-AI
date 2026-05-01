"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutDashboard, BarChart3, PanelLeft } from "lucide-react";
import LogoutButton from "@/components/auth/LogoutButton";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";

export default function Sidebar({ workspaceId }: { workspaceId?: string }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`hidden md:flex flex-col border-r bg-slate-900 text-white transition-all duration-300
      ${collapsed ? "w-16" : "w-64"}`}
    >
      <div className="flex items-center justify-between px-4 py-4">
        {!collapsed && <h2 className="text-lg font-bold">StudyFlow</h2>}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
        >
          <PanelLeft size={18} />
        </Button>
      </div>

      <Separator />

      <div className="flex-1 overflow-y-auto px-2 mt-4">
        <nav className="flex flex-col gap-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100"
          >
            <LayoutDashboard size={18} />
            {!collapsed && "Workspaces"}
          </Link>

          {workspaceId && (
            <Link
              href={`/workspace/${workspaceId}/dashboard`}
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100"
            >
              <BarChart3 size={18} />
              {!collapsed && "Insights"}
            </Link>
          )}
        </nav>
      </div>

      <div className="p-4">
        <Separator className="mb-4" />
        {!collapsed && <LogoutButton />}
      </div>
    </aside>
  );
}
