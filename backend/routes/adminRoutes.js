const express = require("express");

const {
  getDashboard,
  getUsers,
  getJobs,
  getApplications,
  updateApplicationStatus,
  updateJobStatus,
  deleteUser,
  deleteJob,
  
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Dashboard
router.get(
  "/dashboard",
  authMiddleware,
  adminMiddleware,
  getDashboard
);

// Users
router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getUsers
);

// Jobs
router.get(
  "/jobs",
  authMiddleware,
  adminMiddleware,
  getJobs
);

// Applications
router.get(
  "/applications",
  authMiddleware,
  adminMiddleware,
  getApplications
);

// Update Application Status
router.put(
  "/application/:id",
  authMiddleware,
  adminMiddleware,
  updateApplicationStatus
);

router.patch(
  "/jobs/:id/status",
  authMiddleware,
  adminMiddleware,
  updateJobStatus
)



// Delete Job
router.delete(
  "/jobs/:id",
  authMiddleware,
  adminMiddleware,
  deleteJob
);

router.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  deleteUser
);

module.exports = router;