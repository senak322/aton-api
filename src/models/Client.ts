import { Schema, model } from "mongoose";

const clientSchema = new Schema({
  accountNumber: { type: String, required: true, unique: true },
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  taxId: { type: String, required: true, unique: true },
  responsiblePerson: { type: String, required: true },
  status: { type: String, default: "Не в работе" },
});

export const Client = model("Client", clientSchema);
