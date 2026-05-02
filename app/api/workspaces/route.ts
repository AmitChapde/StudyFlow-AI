import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import {
  createWorkspace,
  getUserWorkspaces,
} from "@/services/workspace.service";

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    if (!body.name || body.name.trim() === "") {
      return NextResponse.json(
        { message: "Workspace name required" },
        { status: 400 },
      );
    }

    const data = await createWorkspace({
      name: body.name,
      userId: user.userId,
    });

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json(
      { message: "Error creating workspace" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const workspaces = await getUserWorkspaces(user.userId);

    return NextResponse.json({ success: true, data: workspaces });
  } catch (err: unknown) {
    return NextResponse.json(
      { message: getErrorMessage(err, "Error fetching workspaces") },
      { status: 500 },
    );
  }
}

