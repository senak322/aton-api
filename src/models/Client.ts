import { Schema, model, Document } from "mongoose";

interface ClientDocument extends Document {
  accountNumber: string;
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: Date;
  inn: string;
  responsiblePerson: string;
  status: string;
}

const clientSchema = new Schema<ClientDocument>({
  accountNumber: { type: String, required: true },
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  inn: { type: String, required: true },
  responsiblePerson: { type: String, required: true },
  status: { type: String, default: "Не в работе" },
});

export const Client = model<ClientDocument>("Client", clientSchema);
