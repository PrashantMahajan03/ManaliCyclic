const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    userId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const profileModel = mongoose.model("profiles", profileSchema);

module.exports = profileModel;
