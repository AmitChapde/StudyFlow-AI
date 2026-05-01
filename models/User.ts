import mongoose, { Schema, models } from "mongoose";
import { IUser } from "@/types/user.types";

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = models.User || mongoose.model("User", UserSchema);