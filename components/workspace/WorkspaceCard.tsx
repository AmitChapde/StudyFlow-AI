"use client";

import Link from "next/link";
import { IWorkspace, Role } from "@/types/workspace.types";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function WorkspaceCard({
  workspace,
  role,
}: {
  workspace: IWorkspace;
  role: Role;
}) {
 const ownerName =
  workspace.createdBy &&
  typeof workspace.createdBy === "object" &&
  "name" in workspace.createdBy
    ? workspace.createdBy.name
    : "Unknown";

  return (
    <Link href={`/workspace/${workspace._id}`}>
      <Card className="hover:shadow-lg transition cursor-pointer group">
        <CardContent className="p-4 space-y-2">
        
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-lg">{workspace.name}</h2>

            <ArrowRight
              size={16}
              className="opacity-0 group-hover:opacity-100 transition"
            />
          </div>

       
          <p className="text-sm text-gray-500">
            Role: <span className="font-medium">{role}</span>
          </p>

       
          <p className="text-xs text-gray-400">Owner: {ownerName}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
