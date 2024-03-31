import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    max: [5, "Length should not be more than 5 letters"],
  },
  uniqueLink: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
