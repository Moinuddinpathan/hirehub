const SavedJob = require("../models/SavedJob")


// ===============================
// Save Job
// ===============================
const saveJob = async (req, res) => {
  try {

    const { jobId } = req.body;

    const savedJob = await SavedJob.create({
      user: req.user._id,
      job: jobId,
    });

    res.status(201).json({
      success: true,
      message: "Job saved successfully.",
      savedJob,
    });

  } catch (error) {

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Job already saved.",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ===============================
// Get Saved Jobs
// ===============================
const getSavedJobs = async (req, res) => {
  try {

    const savedJobs = await SavedJob.find({
      user: req.user._id,
    }).populate("job");

    res.json({
      success: true,
      savedJobs,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ===============================
// Remove Saved Job
// ===============================
const removeSavedJob = async (req, res) => {
  try {

    await SavedJob.findOneAndDelete({
      user: req.user._id,
      job: req.params.jobId,
    });

    res.json({
      success: true,
      message: "Saved job removed.",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  saveJob,
  getSavedJobs,
  removeSavedJob,
};