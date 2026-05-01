"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";

type Props = {
  workspaceId: string;
  onCreated?: () => void;
};

export default function CreateGoalForm({ workspaceId, onCreated }: Props) {
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!goal.trim()) return;

    setLoading(true);

    try {
      await apiFetch("/api/goals", {
        method: "POST",
        body: JSON.stringify({
          title: goal,
          workspaceId,
        }),
      });

      setGoal("");        
      onCreated?.();      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Enter your goal..."
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      <Button onClick={handleGenerate}>
        {loading ? "Generating..." : "Generate"}
      </Button>
    </div>
  );
}