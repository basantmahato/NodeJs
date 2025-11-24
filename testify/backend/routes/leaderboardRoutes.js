const router = require("express").Router();
const { getLeaderboardBySubject, getGlobalLeaderboard } = require("../controllers/leaderboardController");

// PUBLIC LEADERBOARDS
router.get("/subject/:subject", getLeaderboardBySubject);
router.get("/global", getGlobalLeaderboard);

module.exports = router;
