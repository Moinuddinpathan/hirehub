const express = require("express");
const { updateJob } = require("../controllers/jobController");

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

const uploadLogo = require("../middleware/uploadLogo");

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

router.put(
  "/jobs/:id",
  authMiddleware,
  adminMiddleware,
  uploadLogo.single("logo"),

  (req, res, next) => {
    console.log("AFTER MULTER BODY:", req.body);
    console.log("AFTER MULTER FILE:", req.file);
    next();
  },

  updateJob
);


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


// router.put(
//   "/jobs/:id",
//   authMiddleware,
//   adminMiddleware,
//   uploadLogo.single("logo"),
//   updateJob
// );

module.exports = router;