const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'employee', 'employer', 'user'],
    default: 'user'
  },
});

module.exports = mongoose.model("User", userSchema);
