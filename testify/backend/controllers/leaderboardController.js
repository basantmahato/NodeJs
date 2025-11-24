const TestAttempt = require("../models/testAttempt");
const User = require("../models/user");

// SUBJECT WISE LEADERBOARD
exports.getLeaderboardBySubject = async (req, res) => {
  const subject = req.params.subject;

  try {
    const topUsers = await TestAttempt
      .find({ subject })
      .populate("userId", "name email") // get user details
      .sort({ score: -1 }) // highest score first
      .limit(20); // top 20 users

    res.send(topUsers);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// OVERALL LEADERBOARD (All subjects)
exports.getGlobalLeaderboard = async (req, res) => {
  try {
    const topUsers = await TestAttempt
      .aggregate([
        {
          $group: {
            _id: "$userId",
            totalScore: { $sum: "$score" }, // sum of all tests
            testsGiven: { $sum: 1 },
            avgScore: { $avg: "$score" }
          }
        },
        { $sort: { totalScore: -1 } },
        { $limit: 20 }
      ]);

    // populate user data manually
    const populated = await Promise.all(
      topUsers.map(async (u) => {
        const user = await User.findById(u._id).select("name email");
        return { ...u, user };
      })
    );

    res.send(populated);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
