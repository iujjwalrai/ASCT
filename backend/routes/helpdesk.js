const express = require("express");
const router = express.Router();
const Query = require("../models/Query");
const Message = require("../models/Message");

// Raise query
router.post("/raise", async (req, res) => {
  const { userId, title, description } = req.body;
  const query = await Query.create({ userId, title, description });
  res.status(200).json(query);
});

// Get user queries
router.get("/myqueries/:userId", async (req, res) => {
  const queries = await Query.find({ userId: req.params.userId });
  res.json(queries);
});

router.get("/users", async (req, res) => {
  const distinctUsers = await Message.distinct("from", { from: { $ne: "admin" } });
  res.json(distinctUsers);
});

// Get chat messages
router.get("/messages/:userId", async (req, res) => {
  const messages = await Message.find({ 
    $or: [{ from: req.params.userId }, { to: req.params.userId }]
  });
  res.json(messages);
});

module.exports = router;
