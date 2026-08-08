const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
    },

     logo: {
    type: String,
    default: "",
  },


    location: {
      type: String,
      required: true,
    },

    salary: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },

    jobType: {
  type: String,
  enum: ["Full Time", "Part Time", "Internship", "Contract","Freelance"],
  required: true,
},

workMode: {
  type: String,
  enum: ["On-site", "Remote", "Hybrid"],
  required: true,
},

status: {
  type: String,
  enum: ["Draft", "Active", "Closed"],
  default: "Active",
},

    skills: [
      {
        type: String,
      },
    ],

     benefits: {
        type: [String],
        default: []
    },

    responsibilities: {
        type: [String],
        default: []
    },


    description: {
      type: String,
      required: true,
    },

    lastDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);