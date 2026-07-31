const Application = require("../models/Application");
const Job = require("../models/Job");
const sendApplicationReceivedEmail = require("../utils/sendApplicationReceivedEmail")

const applyJob = async (req, res) => {
    try {
        const { job,
  skills,
  experience,
  location,
  expectedSalary,
  linkedIn,
  github,
  coverLetter, } = req.body;

        const alreadyApplied = await Application.findOne({
      user: req.user._id,
      job,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

        const application = await Application.create({
            user: req.user._id,
            job,
            resume: req.file
  ? `uploads/resumes/${req.file.filename}`
  : "",
            skills,

  experience,

  location,

  expectedSalary,

  linkedIn,

  github,

  coverLetter,
        });

        const jobData = await Job.findById(job);

        console.log("Job Data:", jobData);
console.log("Job Title:", jobData?.title);



if (!jobData) {
  return res.status(404).json({
    success: false,
    message: "Job not found",
  });
}

await sendApplicationReceivedEmail(
  req.user.email,
  req.user.name,
  jobData.title
);

        res.status(201).json({
            success: true,
            message:"Application Submitted Successfully",
            application,
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};


const myApplication = async (req, res) => {
    try {
        const application = await Application.find({
            user: req.user._id,
        })
        .populate("job")
        .populate("user", "-password");

        res.json({
            success: true,
            application,
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};


module.exports = {
    applyJob,
    myApplication,
}