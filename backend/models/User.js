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

    googleId : {
      type: String,
      unique: true,
      sparse : true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },


     // =========================
    // PROFESSIONAL INFORMATION
    // =========================

    headline: {
      type: String,
      default: "",
      trim: true,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    bio: {
      type: String,
      default: "",
      trim: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    education: {
      type: String,
      default: "",
      trim: true,
    },

    experience: {
      type: String,
      default: "",
      trim: true,
    },

    linkedin: {
      type: String,
      default: "",
      trim: true,
    },

    github: {
      type: String,
      default: "",
      trim: true,
    },

     

    // =========================
    // ROLE
    // =========================


    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // =========================
    // RESUME
    // =========================

    resume: {
      type: String,
      default: "",
    },


    // =========================
    // AUTHENTICATION
    // =========================

    refreshToken: {
      type: String,
      default: "",
    },

       // =========================
    // PASSWORD RESET
    // =========================

    resetPasswordOtp: {
  type: String,
  default: null,
},

resetPasswordOtpExpiry: {
  type: Date,
  default: null,
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