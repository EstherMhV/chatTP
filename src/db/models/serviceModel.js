const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // order: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Order",
  //   },
  // ],
});

module.exports = mongoose.model("Service", serviceSchema);
