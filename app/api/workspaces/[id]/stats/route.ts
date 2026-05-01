import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Task } from "@/models/Task";

export async function GET(
  req: Request,
  { params }: { params: { id: string } } 
) {
  try {
    await connectDB();

    const { id } = params;

    const totalTasks = await Task.countDocuments({ workspaceId: id });

    const completedTasks = await Task.countDocuments({
      workspaceId: id,
      status: "DONE", 
    });

    const pendingTasks = totalTasks - completedTasks;

    const completionRate =
      totalTasks === 0
        ? 0
        : Math.round((completedTasks / totalTasks) * 100);

    return NextResponse.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      completionRate,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Error fetching stats" },
      { status: 500 }
    );
  }
}