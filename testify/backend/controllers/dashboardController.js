const User = require("../models/user");

// Admin Only: Get Stats
const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const latestUsers = await User.find().sort({ _id: -1 }).limit(5).select("-password");
    
    // Note: "Active Users" is usually handled in memory via Sockets (see server.js)
    // This endpoint returns stored database stats.
    res.send({
      totalRegisteredUsers: totalUsers,
      recentRegistrations: latestUsers
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = { getAdminStats };