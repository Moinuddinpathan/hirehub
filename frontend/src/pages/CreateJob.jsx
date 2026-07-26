import { useState } from "react";
import "../styles/CreateJob.css";
import { addJob } from "../services/jobService";
import { useNavigate } from "react-router-dom";


function CreateJob () {


    const navigate = useNavigate();

       const [formData, setFormData] = useState({
  company: "",
  title: "",
  location: "",
  salary: "",
  experience: "",
  jobType: "",
  workMode: "",
  skills: "",
  description: "",
  lastDate: "",
});
    
         const [logo, setLogo] = useState(null);


         const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
         };


         const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();

    data.append("company", formData.company);
    data.append("title", formData.title);
    data.append("location", formData.location);
    data.append("salary", formData.salary);
    data.append("experience", formData.experience);
data.append("jobType", formData.jobType);
data.append("workMode", formData.workMode);
data.append("skills", formData.skills);
    data.append("description", formData.description);
    data.append("lastDate", formData.lastDate);

    if (logo) {
      data.append("logo", logo);
    }

    const response = await addJob(data);

    alert(response.data.message);

    navigate("/admin/dashboard");
  } catch (error) {
    alert(error.response?.data?.message || "Failed to add job");
  }
};


    return(
         <div className="create-job-page">
      <div className="create-job-card">

        <h2>Add New Job</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="experience"
            placeholder="Experience"
            value={formData.experience}
            onChange={handleChange}
            required
          />

          <select
  name="jobType"
  value={formData.jobType}
  onChange={handleChange}
  required
>
  <option value="">Select Job Type</option>
  <option value="Full Time">Full Time</option>
  <option value="Part Time">Part Time</option>
  <option value="Internship">Internship</option>
  <option value="Contract">Contract</option>
</select>

<select
  name="workMode"
  value={formData.workMode}
  onChange={handleChange}
  required
>
  <option value="">Select Work Mode</option>
  <option value="On-site">On-site</option>
  <option value="Remote">Remote</option>
  <option value="Hybrid">Hybrid</option>
</select>

          <input
            type="text"
            name="skills"
            placeholder="Skills (React, Node, MongoDB)"
            value={formData.skills}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Job Description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="lastDate"
            value={formData.lastDate}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Add Job
          </button>

        </form>

      </div>
    </div>
    )
}

export default CreateJob;