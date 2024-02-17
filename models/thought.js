const mongoose = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const { Schema } = mongoose;

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reaction", // Reference the Reaction model
    },
  ],
});

// Create a virtual property `reactionCount` that retrieves the length of the thought's reactions array
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;
