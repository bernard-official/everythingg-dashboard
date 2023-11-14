import mongoose, { Schema } from "mongoose";

mongoose.connect(`${process.env.MONGO_URI as string}`);
mongoose.Promise;

const employeeSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  contact: String,
  address: String,
  position: String,
  department: String,
  hireDate: Date,
  manager: Boolean,
  salary: String
});

const Employee =
  mongoose.models.Employee || mongoose.model("Employee", employeeSchema);
export default Employee;