import { Schema } from "mongoose";

export const userSchema = new Schema({
  name: String,
  email: String,
  contact: String,
  address: String,
  position: String,
  department: String,
  birthDate: Date,
  hireDate: Date,
  manager: Boolean,
  password: String,
  salary: String,
});