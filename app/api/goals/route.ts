import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { Goal } from "@/models/Goal";
import { Task } from "@/models/Task";
import { generateTasksFromGoal } from "@/services/ai.service";

export async function POST(req: Request) {
  try {
    await connectDB();

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, workspaceId } = body;

      
    if (!title || !workspaceId) {
      return NextResponse.json(
        { message: "Title and workspaceId required" },
        { status: 400 }
      );
    }

    const goal = await Goal.create({
      title,
      workspaceId,
      createdBy: user.userId,
    });

   
    const aiResponse = await generateTasksFromGoal(title);

    console.log("AI RESPONSE:", aiResponse);

   
    const createdTasks = await Task.insertMany(
      aiResponse.tasks.map((t: any) => ({
        title: t.title,
        description: t.description,
        goalId: goal._id,
      }))
    );

    console.log("CREATED TASKS:", createdTasks.length);

  
    return NextResponse.json({
      success: true,
      data: {
        goal,
        tasks: createdTasks,
      },
    });
  } catch (err) {
    console.error("GOAL ERROR:", err);

    return NextResponse.json(
      { message: "Error generating tasks" },
      { status: 500 }
    );
  }
}