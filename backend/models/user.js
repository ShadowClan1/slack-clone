const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  credentials: {
    type: Object,
  },
  email: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  Groups: [
    {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
  metaData: {
    type: Object,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
