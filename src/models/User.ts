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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<UserDocument>("User", userSchema);
