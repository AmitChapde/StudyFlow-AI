import { IWorkspace, Role } from "@/types/workspace.types";
import { Card, CardContent } from "@/components/ui/card";

export default function WorkspaceCard({
  workspace,
  role,
}: {
  workspace: IWorkspace;
  role: Role;
}) {
  return (
    <Card className="hover:shadow-md transition">
      <CardContent className="p-4 space-y-1">
        <h2 className="font-medium text-lg">{workspace.name}</h2>

        <p className="text-sm text-gray-500">
          Role: <span className="font-medium">{role}</span>
        </p>

        <p className="text-xs text-gray-400">
          Owner:{" "}
          {typeof workspace.createdBy === "object" &&
          "name" in workspace.createdBy
            ? workspace.createdBy.name
            : "Unknown"}
        </p>
      </CardContent>
    </Card>
  );
}
