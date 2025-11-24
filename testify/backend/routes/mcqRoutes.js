const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  addMCQ,
  getSubjects,
  getMCQsBySubject,
  submitTest
} = require("../controllers/mcqController");

// ADMIN routes
router.post("/add", auth, admin, addMCQ);

// USER routes
router.get("/subjects", getSubjects);
router.get("/subject/:name", getMCQsBySubject);
router.post("/submit", auth, submitTest);

module.exports = router;
