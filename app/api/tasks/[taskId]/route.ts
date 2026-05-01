import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import {
  updateTaskStatus,
  updateTaskContent,
  deleteTaskById,
} from "@/services/task.service";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ taskId: string }> },
) {
  try {
    const { taskId } = await context.params;

    await connectDB();

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { status, title, description } = body;

    let updated;

    if (status) {
      updated = await updateTaskStatus(taskId, status);
    }

    if (title || description) {
      updated = await updateTaskContent(taskId, {
        title,
        description,
      });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Error updating task" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ taskId: string }> },
) {
  try {
    const { taskId } = await context.params;

    await connectDB();

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await deleteTaskById(taskId);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Error deleting task" },
      { status: 500 },
    );
  }
}
