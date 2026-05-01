import { NextResponse } from "next/server";
import { expandTaskWithAI } from "@/services/ai.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { task } = body;

    if (!task) {
      return NextResponse.json(
        { message: "Task required" },
        { status: 400 }
      );
    }

    const result = await expandTaskWithAI(task);

    return NextResponse.json({
      success: true,    
      data: result,
    });
  } catch (err) {
    console.error("EXPAND ERROR:", err);

    return NextResponse.json(
      { message: "Error expanding task" },
      { status: 500 }
    );
  }
}