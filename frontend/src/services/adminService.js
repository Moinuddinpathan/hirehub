import api from "../api/axios";


// Dashboard
export const getDashboard = () => {
    return api.get("/admin/dashboard")
}

// Get All Users
export const getUsers = () => {
  return api.get("/admin/users");
};

// Get All Jobs
export const getJobs = () => {
  return api.get("/admin/jobs");
};

// Get All Applications
export const getApplications = () => {
  return api.get("/admin/applications");
};
// Delete User
export const deleteUser = (id) => {
  return api.delete(`/admin/users/${id}`);
};

// Delete Job
export const deleteJob = (id) => {
    return api.delete(`/admin/jobs/${id}`)
}

// Update Application
export const updateApplicationStatus = (id, status) => {
    return api.put(`/admin/application/${id}`, {
        status,
    });
} 

// Update Job Status
export const updateJobStatus = async (id, status) => {
  const response = await api.patch(`/admin/jobs/${id}/status`, {
    status,
  });

  return response.data;
};

// Update Job
export const updateJob = (id, formData) => {
  return api.put(`/admin/jobs/${id}`, formData);
};