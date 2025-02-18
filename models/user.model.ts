// models/user.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface UserType extends Document {
  email: string;
  password: string;
  githubId: string;
  username: string;
}

const userSchema = new Schema<UserType>(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    githubId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models?.User || mongoose.model<UserType>('User', userSchema);

