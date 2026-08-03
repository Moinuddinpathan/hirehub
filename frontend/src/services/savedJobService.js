import api from "../api/axios";

// ==========================
// Save Job
// ==========================
export const saveJob = (jobId) => {
  return api.post("/saved-jobs", {
    jobId,
  });
};

// ==========================
// Get Saved Jobs
// ==========================
export const getSavedJobs = () => {
  return api.get("/saved-jobs");
};

// ==========================
// Remove Saved Job
// ==========================
export const removeSavedJob = (jobId) => {
  return api.delete(`/saved-jobs/${jobId}`);
};