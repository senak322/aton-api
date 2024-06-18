import mongoose from "mongoose";
import { Client } from "../models/Client";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const connectDB = async () => {
  try {
    const connection = mongoose.connect(process.env.MONGO_URI!, {});
    console.log("MongoDB connected");
    return connection;
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

const generateRandomClients = async () => {
  const clients = [];
  const statuses = ["Не в работе", "В работе", "Отказ", "Сделка закрыта"];

  for (let i = 0; i < 50; i++) {
    const accountNumber = `ACC${1000 + i}`;
    const taxId = uuidv4(); // Generate unique taxId

    clients.push(
      new Client({
        accountNumber,
        lastName: `Фамилия${i}`,
        firstName: `Имя${i}`,
        middleName: `Отчество${i}`,
        birthDate: new Date(1980 + i, i % 12, i % 28),
        inn: `ИНН${1000000 + i}`, // make sure inn is unique
        responsiblePerson: `ФИО${i % 5}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        taxId,
      })
    );
  }

  await Client.insertMany(clients);
  console.log("Clients added");
};

const generateRandomUsers = async () => {
  const users = [];
  const passwords = [
    "password1",
    "password2",
    "password3",
    "password4",
    "password5",
  ];
  const hashedPasswords = await Promise.all(
    passwords.map(async (password) => await bcrypt.hash(password, 12))
  );

  for (let i = 0; i < 5; i++) {
    const login = `login${i}`;
    const existingUser = await User.findOne({ login });
    if (!existingUser) {
      users.push(
        new User({
          fullName: `ФИО${i}`,
          login,
          password: hashedPasswords[i],
        })
      );
    } else {
      console.log(`User with login ${login} already exists`);
    }
  }

  if (users.length > 0) {
    await User.insertMany(users);
    console.log("Users added");
  }
};

export const main = async () => {
  const connection = await connectDB();
  try {
    // await connection.connection.db.dropDatabase(); // Используйте connection для доступа к db
    // console.log("Database dropped");

    await generateRandomClients();
    await generateRandomUsers();
  } catch (error) {
    console.error("Error during data synthesis:", error);
    process.exit(1);
  } 
//   finally {
//     await mongoose.connection.close();
//     console.log("MongoDB connection closed");
//   }
};

// main().catch(console.error);
