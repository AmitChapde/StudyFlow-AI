import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getWorkspaceById } from "@/services/workspace.service";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const workspace = await getWorkspaceById(params.id);

    return NextResponse.json({ success: true, data: workspace });
  } catch {
    return NextResponse.json(
      { message: "Error fetching workspace" },
      { status: 500 }
    );
  }
}