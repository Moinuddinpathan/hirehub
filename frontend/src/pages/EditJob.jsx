import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getJobById,
} from "../services/jobService";

import { updateJob } from "../services/adminService";


import "../styles/CreateJob.css";


function EditJob() {
  const { id } = useParams();
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
    benefits: "",
    responsibilities: "",
    description: "",
    lastDate: "",
    status: "Active",
  });

  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);


  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJobById(id);

        const job = response.data.job;

        setFormData({
          company: job.company || "",
          title: job.title || "",
          location: job.location || "",
          salary: job.salary || "",
          experience: job.experience || "",
          jobType: job.jobType || "",
          workMode: job.workMode || "",
          skills: Array.isArray(job.skills)
            ? job.skills.join(", ")
            : job.skills || "",
            benefits: Array.isArray(job.benefits)
    ? job.benefits.join(", ")
    : job.benefits || "",

  responsibilities: Array.isArray(job.responsibilities)
    ? job.responsibilities.join("\n")
    : job.responsibilities || "",

          description: job.description || "",

          // HTML date input needs YYYY-MM-DD
          lastDate: job.lastDate
            ? job.lastDate.split("T")[0]
            : "",

          status: job.status || "Active",
        });

        if (job.logo) {
          setLogoPreview(
            `http://localhost:5000/${job.logo.replace(
              /\\/g,
              "/"
            )}`
          );
        }

      } catch (error) {
        console.error("FETCH JOB ERROR:", error);

        alert("Failed to load job");

        navigate("/admin/jobs");

      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, navigate]);


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setLogo(file);

    setLogoPreview(URL.createObjectURL(file));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const data = new FormData();

      data.append("company", formData.company);
      data.append("title", formData.title);
      data.append("location", formData.location);
      data.append("salary", formData.salary);
      data.append("experience", formData.experience);
      data.append("jobType", formData.jobType);
      data.append("workMode", formData.workMode);
      data.append("skills", formData.skills);
      data.append("benefits", formData.benefits);

data.append(
  "responsibilities",
  formData.responsibilities
);
      data.append("description", formData.description);
      data.append("lastDate", formData.lastDate);
      data.append("status", formData.status);

      if (logo) {
        data.append("logo", logo);
      }

      const response = await updateJob(id, data);

      alert(
        response.data.message ||
        "Job updated successfully"
      );

      navigate("/admin/jobs");

    } catch (error) {
      console.error("UPDATE JOB ERROR:", error);

      alert(
        error.response?.data?.message ||
        "Failed to update job"
      );

    } finally {
      setSaving(false);
    }
  };


  if (loading) {
    return (
      <div className="create-job-page">
        <div className="jobs-loading">
          <div className="jobs-spinner"></div>
          <p>Loading job details...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="create-job-page">

      <div className="create-job-header">

        <div>
          <span className="create-job-eyebrow">
            JOB MANAGEMENT
          </span>

          <h1>Edit Job Posting</h1>

          <p>
            Update the position details and publishing
            settings.
          </p>
        </div>

        <button
          type="button"
          className="back-jobs-btn"
          onClick={() => navigate("/admin/jobs")}
        >
          ← Back to Jobs
        </button>

      </div>


      <form
        className="create-job-form"
        onSubmit={handleSubmit}
      >

        <section className="job-form-section">

          <div className="form-section-heading">
            <div className="section-number">01</div>

            <div>
              <h2>Basic Information</h2>
              <p>Update the company and position details.</p>
            </div>
          </div>


          <div className="form-grid">

            <div className="form-group">
              <label>
                Company Name <span>*</span>
              </label>

              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>


            <div className="form-group">
              <label>
                Job Title <span>*</span>
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

          </div>


          <div className="form-group">
            <label>Company Logo</label>

            <div className="logo-upload-area">

              <div className="logo-preview">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Company logo"
                  />
                ) : (
                  <span>🏢</span>
                )}
              </div>


              <div className="logo-upload-content">

                <label
                  htmlFor="editCompanyLogo"
                  className="upload-logo-btn"
                >
                  Replace Logo
                </label>

                <input
                  id="editCompanyLogo"
                  className="logo-file-input"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleLogoChange}
                />

                <p>
                  Leave unchanged to keep the current logo.
                </p>

              </div>

            </div>
          </div>

        </section>


        <section className="job-form-section">

          <div className="form-section-heading">
            <div className="section-number">02</div>

            <div>
              <h2>Job Details</h2>
              <p>
                Update employment and workplace details.
              </p>
            </div>
          </div>


          <div className="form-grid">

            <div className="form-group">
              <label>
                Location <span>*</span>
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>


            <div className="form-group">
              <label>
                Salary <span>*</span>
              </label>

              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
              />
            </div>


            <div className="form-group">
              <label>
                Experience <span>*</span>
              </label>

              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
              />
            </div>


            <div className="form-group">
              <label>
                Employment Type <span>*</span>
              </label>

              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                required
              >
                <option value="">Select employment type</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>


            <div className="form-group">
              <label>
                Workplace Type <span>*</span>
              </label>

              <select
                name="workMode"
                value={formData.workMode}
                onChange={handleChange}
                required
              >
                <option value="">Select workplace type</option>
                <option value="On-site">On-site</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>


            <div className="form-group">
              <label>
                Application Deadline <span>*</span>
              </label>

              <input
                type="date"
                name="lastDate"
                value={formData.lastDate}
                onChange={handleChange}
                required
              />
            </div>


            <div className="form-group">
              <label>
                Job Status <span>*</span>
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="Draft">Draft</option>
                <option value="Active">Active</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

          </div>

        </section>


        <section className="job-form-section">

          <div className="form-section-heading">
            <div className="section-number">03</div>

            <div>
              <h2>Role Description</h2>
              <p>
                Update skills, responsibilities and
                requirements.
              </p>
            </div>
          </div>


          <div className="form-group">
            <label>
              Required Skills <span>*</span>
            </label>

            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
              required
            />

            <small className="field-help">
              Separate skills using commas.
            </small>
          </div>


          <div className="form-group">
            <label>
              Job Description <span>*</span>
            </label>

            <textarea
              name="description"
              rows="8"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
  <label>
    Responsibilities <span>*</span>
  </label>

  <textarea
    name="responsibilities"
    rows="7"
    value={formData.responsibilities}
    onChange={handleChange}
    placeholder={`Develop and maintain web applications.
Collaborate with designers and developers.
Write clean and reusable code.
Fix bugs and improve performance.`}
    required
  />

  <small className="field-help">
    Enter one responsibility per line.
  </small>
</div>

<div className="form-group">
  <label>
    Employee Benefits
  </label>

  <textarea
    name="benefits"
    rows="5"
    value={formData.benefits}
    onChange={handleChange}
    placeholder="Health Insurance, Work From Home, Flexible Working Hours, Paid Leave"
  />

  <small className="field-help">
    Separate benefits using commas.
  </small>
</div>

        </section>


        <div className="job-form-actions">

          <button
            type="button"
            className="cancel-job-btn"
            onClick={() => navigate("/admin/jobs")}
            disabled={saving}
          >
            Cancel
          </button>


          <button
            type="submit"
            className="publish-job-btn"
            disabled={saving}
          >
            {saving
              ? "Saving Changes..."
              : "Save Changes"}
          </button>

        </div>

      </form>

    </div>
  );
}

export default EditJob;