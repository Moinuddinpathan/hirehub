const express = require("express");

const router = express.Router();

const {
  saveJob,
  getSavedJobs,
  removeSavedJob,
} = require("../controllers/savedJobController");

const authMiddleware = require("../middleware/authMiddleware");

// Save Job
router.post(
  "/",
  authMiddleware,
  saveJob
);

// Get All Saved Jobs
router.get(
  "/",
  authMiddleware,
  getSavedJobs
);

// Remove Saved Job
router.delete(
  "/:jobId",
  authMiddleware,
  removeSavedJob
);

module.exports = router;