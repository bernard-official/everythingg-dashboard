import mongoose, { Schema } from "mongoose";

mongoose.connect(`${process.env.MONGO_URI as string}`);
mongoose.Promise;

const employeeSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  contact: {
    type: String,
  },
  address: {
    type: String,
  },
  position: {
    type: String,
  },
  department: {
    type: String,
  },
  hireDate: {
    type: Date,
    default: Date.now,
  },
  manager: {
    type: Boolean,
    default: false,
  },
  salary: {
    type: String,
  },
});

const Employee =
  mongoose.models.Employee || mongoose.model("Employee", employeeSchema);
export default Employee;