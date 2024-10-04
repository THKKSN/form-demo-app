const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  department: { type: String, default: null },
  position: { type: String, default: null },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String },
  isAdmin: { type: Boolean, default: false }, 
  receivedEvaluations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] 
});

module.exports = mongoose.model("User", UserSchema);
