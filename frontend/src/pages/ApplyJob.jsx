import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { applyJob } from "../services/applicationService";
import { useEffect } from "react";
import "../styles/ApplyJob.css";
import { getJobById } from "../services/jobService";

function ApplyJob(){

    const [formData, setFormData] = useState({
  resume: "",
  skills: "",
  experience: "",
  location: "",
  expectedSalary: "",
  linkedIn: "",
  github: "",
  coverLetter: "",
});

const [job, setJob] = useState(null);

    const navigate = useNavigate();
    const { id } = useParams();

    const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};




const handleSubmit =async (e)=>{
    e.preventDefault();

      const data = new FormData();

  data.append("job", id);
  data.append("resume", formData.resume);
  data.append("skills", formData.skills);
  data.append("experience", formData.experience);
  data.append("location", formData.location);
  data.append("expectedSalary", formData.expectedSalary);
  data.append("linkedIn", formData.linkedIn);
  data.append("github", formData.github);
  data.append("coverLetter", formData.coverLetter);


   try {
    await applyJob(data);

     alert("Application Submitted Successfully");

      navigate("/my-applications");

   } catch (error) {
  console.log(error.response);
  alert(error.response?.data?.message || error.message);
}
        
};

const fetchJob = async () => {
  try {
    const response = await getJobById(id);
    setJob(response.data.job);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchJob();
}, [id]);


    return (

      <>
         <div className="apply-topbar">

      <button
        className="back-button"
        onClick={() =>
          navigate(`/jobs/${id}`)
        }
      >
        ← Back to Job Details
      </button>

    </div>

       
        <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card shadow">


            <div className="card-header bg-primary text-white text-center">
                <h3>Apply Job</h3>
            </div>

            <div className="card-body">
                {job && (
  <div className="card mb-4 border-0 shadow-sm">
    <div className="card-body">
      <h3 className="text-primary">{job.title}</h3>

      <h5>{job.company}</h5>

      <p className="mb-1">
        <strong>Location:</strong> {job.location}
      </p>

      <p className="mb-1">
        <strong>Salary:</strong> {job.salary}
      </p>

      <p className="mb-0">
        <strong>Experience:</strong> {job.experience}
      </p>
    </div>
  </div>
)}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
  <label className="form-label fw-bold">
    Upload Resume (PDF)
  </label>

  <input
    type="file"
    className="form-control"
    accept=".pdf"
    onChange={(e) =>
      setFormData({
        ...formData,
        resume: e.target.files[0],
      })
    }
  />
</div>

<div className="mb-3">
  <label className="form-label fw-bold">
    Skills
  </label>

  <input
    type="text"
    className="form-control"
    placeholder="React, Node.js, MongoDB"
    name="skills"
    value={formData.skills}
    onChange={handleChange}
  />
</div>

<div className="mb-3">
  <label className="form-label fw-bold">
    Experience
  </label>

  <select
    className="form-select"
    name="experience"
    value={formData.experience}
    onChange={handleChange}
  >
    <option value="">Select Experience</option>
    <option>Fresher</option>
    <option>0-1 Year</option>
    <option>1-2 Years</option>
    <option>2-5 Years</option>
    <option>5+ Years</option>
  </select>
</div>

<div className="mb-3">
  <label className="form-label fw-bold">
    Current Location
  </label>

  <input
    type="text"
    className="form-control"
    placeholder="Mumbai"
    name="location"
    value={formData.location}
    onChange={handleChange}
  />
</div>

<div className="mb-3">
  <label className="form-label fw-bold">
    Expected Salary
  </label>

  <input
    type="text"
    className="form-control"
    placeholder="500000"
    name="expectedSalary"
    value={formData.expectedSalary}
    onChange={handleChange}
  />
</div>

<div className="mb-3">
  <label className="form-label fw-bold">
    LinkedIn
  </label>

  <input
    type="url"
    className="form-control"
    placeholder="https://linkedin.com/in/username"
    name="linkedIn"
    value={formData.linkedIn}
    onChange={handleChange}
  />
</div>

<div className="mb-3">
  <label className="form-label fw-bold">
    GitHub
  </label>

  <input
    type="url"
    className="form-control"
    placeholder="https://github.com/username"
    name="github"
    value={formData.github}
    onChange={handleChange}
  />
</div>

<div className="mb-4">
  <label className="form-label fw-bold">
    Cover Letter
  </label>

  <textarea
    className="form-control"
    rows="5"
    placeholder="Tell us why you are a good fit for this role..."
    name="coverLetter"
    value={formData.coverLetter}
    onChange={handleChange}
  ></textarea>
</div>

<button className="btn btn-success btn-lg w-100">
  Apply Now
</button>
                </form>
            </div>

                </div>
            </div>
        </div>
        </div>

         </>
    )
}



export default ApplyJob