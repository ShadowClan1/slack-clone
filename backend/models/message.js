const { Schema, default: mongoose } = require("mongoose");

const messageSchema = new Schema({
  From: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  To: {
    type: Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
  ToGroup: {
    type: Schema.Types.ObjectId,
    ref: "Group",
    // required: true,
  },

  file: {
    type: Object,
  }, 
  time: {
    type: Date,
  },
  messageType: {
    type: Number,
  },
  messageText: {
    type: String,
  },

  metaData: {
    type: Object,
  },
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
