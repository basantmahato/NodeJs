const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); // Your existing middleware
const adminMiddleware = require("../middleware/adminMiddleware"); // The new middleware
const { getBlogs, createBlog , updateBlog, deleteBlog} = require("../controllers/blogController");
const { createAlert, getAlerts , updateAlert, deleteAlert} = require("../controllers/alertController");
const { getAdminStats } = require("../controllers/dashboardController");

module.exports = (io) => {
  // --- BLOG ROUTES ---
  // Public: Anyone can read blogs
  router.get("/blogs", getBlogs);
  
  // Admin Only: Post blogs
  router.post("/blogs", authMiddleware, adminMiddleware, createBlog);


  router.put("/blogs/:id", authMiddleware, adminMiddleware, updateBlog);
  router.delete("/blogs/:id", authMiddleware, adminMiddleware, deleteBlog);


  // --- ALERT ROUTES ---
  // User/Admin: Get alert history
  router.get("/alerts", authMiddleware, getAlerts);
  
  // Admin Only: Trigger alert
  router.post("/alerts", authMiddleware, adminMiddleware, (req, res) => {
    createAlert(req, res, io);
  });

  router.put("/alerts/:id", authMiddleware, adminMiddleware, updateAlert);
  router.delete("/alerts/:id", authMiddleware, adminMiddleware, deleteAlert);



  // --- ADMIN DASHBOARD ROUTES ---
  router.get("/admin/stats", authMiddleware, adminMiddleware, getAdminStats);

  return router;
};