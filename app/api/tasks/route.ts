import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { Task } from "@/models/Task";
import { Goal } from "@/models/Goal";

export async function GET(req: Request) {
  try {
    await connectDB();

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId");

    if (!workspaceId) {
      return NextResponse.json(
        { message: "workspaceId required" },
        { status: 400 },
      );
    }

    const goals = await Goal.find({ workspaceId });

    const goalIds = goals.map((g) => g._id);

    const tasks = await Task.find({
      goalId: { $in: goalIds },
    }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: tasks.map((t) => ({
        _id: t._id.toString(),
        title: t.title,
        description: t.description, 
        status: t.status,
        goalId: t.goalId.toString(),
      })),
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error fetching tasks" },
      { status: 500 },
    );
  }
}
