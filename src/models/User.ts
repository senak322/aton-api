import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

interface UserDocument extends Document {
  fullName: string;
  login: string;
  password: string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const userSchema = new Schema<UserDocument>({
  fullName: { type: String, required: true },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  if (!candidatePassword || !this.password) {
    throw new Error("Missing candidatePassword or password");
  }

  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

export const User = model<UserDocument>("User", userSchema);
