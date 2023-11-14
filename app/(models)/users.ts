import mongoose, { Schema } from "mongoose"

mongoose.connect(`${process.env.MONGODB_URI as string}`)
mongoose.Promise = global.Promise


const userSchema = new Schema({
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

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User