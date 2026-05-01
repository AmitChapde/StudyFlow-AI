import mongoose, { Schema, models } from "mongoose";

const goalSchema = new Schema<IGoal>(
  {
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    title: { type: String, required: true },

    tasks: [
      {
        title: String,
        completed: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

export const Goal =
  models.Goal || mongoose.model("Goal", goalSchema);