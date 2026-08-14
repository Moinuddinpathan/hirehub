const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: function () {
        return !this.googleId;    
      }
    },

    GoogleId : {
      type: String,
      unique: true,
      sparse : true,
    },

    // phone: {
    //   type: String,
    //   required: true,
    // },

    resetPasswordOtp: {
  type: String,
  default: null,
},

resetPasswordOtpExpiry: {
  type: Date,
  default: null,
},

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    resume: {
      type: String,
      default: "",
    },

    refreshToken: {
      type: String,
      default: "",
    },

    resetOtp: {
      type: String,
      default: "",
    },

    resetOtpExpire: {
      type: Date,
      
    },
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);