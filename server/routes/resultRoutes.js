const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


router.get("/users", authMiddleware, async (req, res) => {
  try {
    const evaluations = await Evaluation.find({ user_id: req.user._id }); 
    res.status(200).json(evaluations);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});


router.get("/users", [authMiddleware, adminMiddleware], async (req, res) => {
  try {
    const evaluations = await Evaluation.find();
    res.status(200).json(evaluations);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
