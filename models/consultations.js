const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const consultationSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.ObjectId,
      ref: "userModel",
    },
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    timings: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: false,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const consultationModel = mongoose.model("consultations", consultationSchema);

module.exports = consultationModel;
