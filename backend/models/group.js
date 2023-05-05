const { Schema, default: mongoose } = require("mongoose");

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  CreatedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  credentials: {
    type: Object,
  },
  
});

const Group = mongoose.model("Group",  groupSchema);
module.exports = Group;
