const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      // required: true,
    },
    lastname: {
      type: String,
      // required: true,
    },
    username: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      required: true,
    },

    isOauth: {
      type: Boolean,
      required: true,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: () => this.isOauth === true,
    },
    token: {
      type: String,
    },
    password: {
      type: String,
      required: () => this.isOauth === false,
    },
    role: {
      type: Number,
      enum: [0, 1, 2],
      // 0 => simple user
      // 1 => admin
      // 2 => super admin
      default: 0, // simple user
    },

    isAskingPromotion: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('users', UserSchema);
