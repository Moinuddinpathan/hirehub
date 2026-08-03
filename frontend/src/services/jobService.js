import api from "./api"




export const getJobs = (search = "") => {

    return api.get("/jobs", {

        params: {

            search,

        },

    });

};

export const updateJobStatus = async (id, status) => {
  const response = await api.patch(`/admin/jobs/${id}/status`,{
    status,
  })
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


export const getSimilarJobs = (id) => {
  return api.get(`/jobs/${id}/similar`);
};
