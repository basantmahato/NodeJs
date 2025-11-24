const mongoose = require("mongoose");

const testAttemptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  subject: String,
  score: Number,
  totalQuestions: Number,
  answers: Array,  // user answers
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("TestAttempt", testAttemptSchema);
