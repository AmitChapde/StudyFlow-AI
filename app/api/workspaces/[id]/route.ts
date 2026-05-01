import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getWorkspaceById } from "@/services/workspace.service";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    await connectDB();
    
   
    const { id } = await params; 
    
    console.log("Searching for Workspace ID:", id);
    const workspace = await getWorkspaceById(id);
    
    if (!workspace) {
       return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: workspace });
  } catch (err) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}