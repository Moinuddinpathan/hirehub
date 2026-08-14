const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");
const mongoose = require("mongoose");
const sendStatusEmail = require("../utils/sendEmailStatus");


// ===============================
// Dashboard Statistics
// ===============================

const getDashboard = async (req, res) => {
  try {
    // Run independent database queries together
    const [
      totalUsers,
      totalJobs,
      totalApplications,
      pendingApplications,
      reviewedApplications,
      selectedApplications,
      rejectedApplications,
      recentApplications,
    ] = await Promise.all([
      User.countDocuments(),

      Job.countDocuments(),

      Application.countDocuments(),

      Application.countDocuments({
        status: "Pending",
      }),

      Application.countDocuments({
        status: "Reviewed",
      }),

      Application.countDocuments({
        status: "Selected",
      }),

      Application.countDocuments({
        status: "Rejected",
      }),

      Application.find()
        .populate("user", "name email")
        .populate("job", "title company")
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    res.status(200).json({
      success: true,

      dashboard: {
        totalUsers,
        totalJobs,
        totalApplications,

        applicationStats: {
          pending: pendingApplications,
          reviewed: reviewedApplications,
          selected: selectedApplications,
          rejected: rejectedApplications,
        },

        recentApplications,
      },
    });

  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard",
    });
  }
};

const getWebsiteStats = async (req, res) => {
    try {

        const jobsAvailable = await Job.countDocuments();

        const companies = await Job.distinct("company");

        const candidates = await User.countDocuments({
            role: "user"
        });

        const totalApplications = await Application.countDocuments();

        const successfulApplications = await Application.countDocuments({
            status: "accepted"
        });

        const successRate =
            totalApplications > 0
                ? Math.round(
                    (successfulApplications / totalApplications) * 100
                )
                : 0;

        res.status(200).json({
            success: true,
            stats: {
                jobsAvailable,
                companies: companies.length,
                candidates,
                successRate
            }
        });

    } catch (error) {

        console.log("Get website stats error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch website statistics"
        });

    }
};


// Get All Users
const getUsers = async (req, res) => {
  try {

    const users = await User.find().select("-password");

    res.json({
      success: true,
      users,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// Get All Jobs
const getJobs = async (req, res) => {

  try {

    const jobs = await Job.find().sort({ createdAt : -1}).lean();

    const jobsWithApplicants = await Promise.all(
      jobs.map(async (job) => {
         const applicantCount = await Application.countDocuments({
          job: job._id,
      });
      return {
        ...job,

          // Handles old jobs created before status was added
          status: job.status || "Active",
                                                    
          applicantCount,
        };
      })
    );
    res.status(200).json({
      success: true,
      jobs: jobsWithApplicants,
    });

  } catch (error) {
    console.error("GET ADMIN JOBS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
    });
  }
};

//     res.json({
//       success: true,
//       jobs,
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });

//   }

// };


// Get All Applications
const getApplications = async (req, res) => {

  try {

    const applications = await Application.find()
      .populate("user", "-password")
      .populate("job");

    res.json({
      success: true,
      applications,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


// Update Application Status
const updateApplicationStatus = async (req, res) => {

  try {

    const { status } = req.body;

     // Allowed application statuses
    const allowedStatuses = [
      "Pending",
      "Reviewed",
      "Selected",
      "Rejected",
    ];

     // Validate status
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status",
      });
    }

    // Find application
    const application = await Application.findById(req.params.id)
    .populate("user")
    .populate("job");


    if (!application) {

      return res.status(404).json({
        success: false,
        message: "Application not found",
      });

    }


     // Don't perform unnecessary update
    if (application.status === status) {
      return res.status(200).json({
        success: true,
        message: `Application is already ${status}`,
        application,
      });
    }


    application.status = status;

    await application.save();

    try{
    await sendStatusEmail(
      application.user.email,
      application.user.name,
      application.job.title,
      status
    )
   } catch (emailError) {
      console.error(
        "Status email failed:",
        emailError.message
      );
    }

    return res.status(200).json({
      success: true,
      message: `Application status changed to ${status}`,
      application,
    });

  } catch (error) {
    console.error(
      "Update application status error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update application status",
    });
  }
};


// Delete Job
const deleteJob = async (req, res) => {

  try {

    const job = await Job.findById(req.params.id);

    if (!job) {

      return res.status(404).json({
        success: false,
        message: "Job not found",
      });

    }

    await job.deleteOne();

    res.json({
      success: true,
      message: "Job deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


  // Delete User
const deleteUser = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await user.deleteOne();

    res.json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


const updateJobStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    job.status = status;
    await job.save();

    return res.status(200).json({
      success: true,
      message: "Job status updated successfully",
      job,
    });

  } catch (error) {
    console.error("UPDATE JOB STATUS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update job status",
    });
  }
};

module.exports = {
  getDashboard,
  getUsers,
  getJobs,
  getApplications,
  updateApplicationStatus,
  updateJobStatus,
  deleteJob,
  deleteUser,
  getWebsiteStats,
};