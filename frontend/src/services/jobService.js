import api from "./api"

export const getJobs = ()=>{
    return api.get("/jobs")
}

export const getJobById = (id)=>{
    return api.get(`/jobs/${id}`);
}

export const addJob = (formData) => {
  return api.post("/jobs", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};