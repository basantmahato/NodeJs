const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); // Your existing middleware
const adminMiddleware = require("../middleware/adminMiddleware"); // The new middleware
const { getBlogs, createBlog } = require("../controllers/blogController");
const { createAlert, getAlerts } = require("../controllers/alertController");
const { getAdminStats } = require("../controllers/dashboardController");

module.exports = (io) => {
  // --- BLOG ROUTES ---
  // Public: Anyone can read blogs
  router.get("/blogs", getBlogs);
  
  // Admin Only: Post blogs
  router.post("/blogs", authMiddleware, adminMiddleware, createBlog);


  // --- ALERT ROUTES ---
  // User/Admin: Get alert history
  router.get("/alerts", authMiddleware, getAlerts);
  
  // Admin Only: Trigger alert
  router.post("/alerts", authMiddleware, adminMiddleware, (req, res) => {
    createAlert(req, res, io);
  });


  // --- ADMIN DASHBOARD ROUTES ---
  router.get("/admin/stats", authMiddleware, adminMiddleware, getAdminStats);

  return router;
};