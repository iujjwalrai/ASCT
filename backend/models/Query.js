const mongoose = require("mongoose");
const QuerySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title:{
    type: String,
    requied: true
  },
  ticketId: {
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  status: { type: String, default: "open" },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Query", QuerySchema);
