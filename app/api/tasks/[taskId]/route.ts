import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import {
  updateTaskStatus,
  updateTaskContent,
  deleteTaskById,
} from "@/services/task.service";

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

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
    const { status, title, description, dueDate, priority } = body;

    let updated;

    if (status) {
      updated = await updateTaskStatus(taskId, status);
    }

    if (
      title !== undefined ||
      description !== undefined ||
      dueDate !== undefined ||
      priority !== undefined
    ) {
      updated = await updateTaskContent(taskId, {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(dueDate !== undefined && {
          dueDate: dueDate ? new Date(dueDate) : null,
        }),
        ...(priority !== undefined && { priority }),
      });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (err: unknown) {
    return NextResponse.json(
      { message: getErrorMessage(err, "Error updating task") },
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
  } catch (err: unknown) {
    return NextResponse.json(
      { message: getErrorMessage(err, "Error deleting task") },
      { status: 500 },
    );
  }
}
