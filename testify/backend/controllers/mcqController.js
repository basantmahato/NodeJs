const MCQ = require("../models/mcq");
const TestAttempt = require("../models/testAttempt");

// ADMIN: Add MCQ
exports.addMCQ = async (req, res) => {
  const mcq = await MCQ.create(req.body);
  res.send({ message: "MCQ Added", mcq });
};

// Get all subjects
exports.getSubjects = async (req, res) => {
  const subjects = await MCQ.distinct("subject");
  res.send(subjects);
};

// Get MCQs by subject
exports.getMCQsBySubject = async (req, res) => {
  const mcqs = await MCQ.find({ subject: req.params.name });
  res.send(mcqs);
};

// Submit test
exports.submitTest = async (req, res) => {
  const { userId, subject, answers } = req.body;

  const mcqs = await MCQ.find({ subject });

  let score = 0;
  mcqs.forEach((q, i) => {
    if (answers[i] == q.answer) score++;
  });

  const attempt = await TestAttempt.create({
    userId,
    subject,
    score,
    totalQuestions: mcqs.length,
    answers
  });

  res.send({ message: "Test submitted", score, attempt });
};
