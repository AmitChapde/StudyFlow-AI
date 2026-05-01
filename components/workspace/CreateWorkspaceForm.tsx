"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

export default function CreateWorkspaceForm({
  onCreated,
}: {
  onCreated: () => void;
}) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.error("Workspace name required");
      return;
    }

    setLoading(true);
    try {
      await apiFetch("/api/workspaces", {
        method: "POST",
        body: JSON.stringify({ name }),
      });

      toast.success("Workspace created");
      setName("");
      onCreated();
    } catch {
      toast.error("Failed to create workspace");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="flex gap-3 p-4">
        <Input
          placeholder="Enter workspace name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={handleCreate} disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </Button>
      </CardContent>
    </Card>
  );
}