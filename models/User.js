const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      minLength: 11,
      maxLength: 11,
      unique: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
