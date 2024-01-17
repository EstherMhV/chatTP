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
    enum: ['admin', 'worker', 'employer', 'user'],
    default: 'user'
  },
  typeOfService: {
    type: String,
    required: false,
    enum: ['Traduction', 'Developpement', 'Design', 'Marketing', 'Video', 'Musique', 'Redaction', 'Other'],
    default: 'Other'
  },
  country: {
    type: String,
    required: false,
    enum: ['United-State', 'France', 'Canada', 'United-Kingdom', 'Germany', 'Spain', 'Italy', 'Other'],
    default: 'Other'
  },
  budget: {
    type: String,
    required: false,
    enum: ['100$', '500$', '1000$', '5000$', '10000$', '50000$', '100000$', 'undefined'],
    default: 'undefined'
  },
});

module.exports = mongoose.model("User", userSchema);
