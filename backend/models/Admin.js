const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  username: {
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
    minlength: 6,
  },
  role: {
    type: String,
    default: "admin",
  },
  permissions: {
    manageUsers: {
      type: Boolean,
      default: true,
    },
    manageFeedback: {
      type: Boolean,
      default: true,
    },
    manageNotices: {
      type: Boolean,
      default: true,
    },
  },
  lastLogin: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Admin", adminSchema);
