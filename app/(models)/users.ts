import mongoose, { Schema } from "mongoose"
import { userSchema } from "../(schema)/user"

mongoose.connect(`${process.env.MONGODB_URI as string}`)
mongoose.Promise = global.Promise

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User