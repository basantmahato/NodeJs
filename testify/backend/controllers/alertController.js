const Alert = require("../models/alert");

// Admin Only: Create Alert & Trigger Notification
// Note: We pass 'io' (Socket.io instance) to this function logic in the route
const createAlert = async (req, res, io) => {
  try {
    const { message, type } = req.body;
    
    const alert = new Alert({
      message,
      type,
      createdBy: req.user.id
    });
    const savedAlert = await alert.save();

    // Real-time Push: Emit event to all connected clients
    io.emit("new-alert", savedAlert);

    res.send({ message: "Alert sent to all users", alert: savedAlert });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Authenticated Users: Get past alerts
const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ createdAt: -1 }).limit(20);
    res.send(alerts);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// UPDATE ALERT
const updateAlert = async (req, res) => {
  try {
    const updated = await Alert.findByIdAndUpdate(
      req.params.id,
      {
        message: req.body.message,
        type: req.body.type,
      },
      { new: true }
    );

    res.send({ message: "Alert updated", alert: updated });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// DELETE ALERT
const deleteAlert = async (req, res) => {
  try {
    await Alert.findByIdAndDelete(req.params.id);
    res.send({ message: "Alert deleted" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


module.exports = {
  createAlert,
  getAlerts,
  updateAlert,
  deleteAlert
};
