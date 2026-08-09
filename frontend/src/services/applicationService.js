import api from "./api";

// export const applyJob = (jobData) => {
//   const token = localStorage.getItem("token");

//   return api.post("/applications", jobData, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

export const applyJob = (formData) => {
    return api.post("/applications", formData);
};




export const getMyApplications = () => {
  const token = localStorage.getItem("token");

  return api.get("/applications/my", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};