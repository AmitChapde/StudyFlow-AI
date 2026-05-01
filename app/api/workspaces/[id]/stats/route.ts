import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Task } from "@/models/Task";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;
    const workspaceId = id;
    if (!workspaceId) {
      return NextResponse.json(
        { message: "Invalid workspace id" },
        { status: 400 },
      );
    }

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const workspaceObjectId = new mongoose.Types.ObjectId(workspaceId);
    const userObjectId = new mongoose.Types.ObjectId(user.userId);

    const result = await Task.aggregate([
      {
        $lookup: {
          from: "goals",
          localField: "goalId",
          foreignField: "_id",
          as: "goal",
        },
      },
      { $unwind: "$goal" },

      {
        $match: {
          "goal.workspaceId": workspaceObjectId,
          $or: [{ createdBy: userObjectId }, { createdBy: { $exists: false } }],
        },
      },

      {
        $group: {
          _id: null,
          totalTasks: { $sum: 1 },
          completedTasks: {
            $sum: {
              $cond: [{ $eq: ["$status", "DONE"] }, 1, 0],
            },
          },
        },
      },
    ]);

    const stats = result[0] || {
      totalTasks: 0,
      completedTasks: 0,
    };

    const totalTasks = stats.totalTasks;
    const completedTasks = stats.completedTasks;
    const pendingTasks = totalTasks - completedTasks;

    const completionRate =
      totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    return NextResponse.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      completionRate,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Error fetching stats" },
      { status: 500 },
    );
  }
}
