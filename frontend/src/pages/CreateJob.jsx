import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addJob } from "../services/jobService";
import "../styles/CreateJob.css";

function CreateJob() {
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
  });

  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [loading, setLoading] = useState(false);

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
      setLoading(true);

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

      if (logo) {
        data.append("logo", logo);
      }

      console.log("JOB TYPE:", formData.jobType);
      console.log("WORK MODE:", formData.workMode);

      for (const [key, value] of data.entries()) {
        console.log(key, value);
      }

      const response = await addJob(data);

      alert(response.data.message || "Job published successfully");

      navigate("/admin/jobs");

    } catch (error) {
      console.error("Create job error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to publish job"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-job-page">

      {/* Page heading */}

      <div className="create-job-header">

        <div>
          <span className="create-job-eyebrow">
            JOB MANAGEMENT
          </span>

          <h1>Create Job Posting</h1>

          <p>
            Publish a new opportunity and start receiving
            applications from qualified candidates.
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

        {/* ===============================
            BASIC INFORMATION
        =============================== */}

        <section className="job-form-section">

          <div className="form-section-heading">

            <div className="section-number">
              01
            </div>

            <div>
              <h2>Basic Information</h2>

              <p>
                Enter the company and position details.
              </p>
            </div>

          </div>


          <div className="form-grid">

            <div className="form-group">

              <label htmlFor="company">
                Company Name
                <span>*</span>
              </label>

              <input
                id="company"
                type="text"
                name="company"
                placeholder="e.g. Google"
                value={formData.company}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label htmlFor="title">
                Job Title
                <span>*</span>
              </label>

              <input
                id="title"
                type="text"
                name="title"
                placeholder="e.g. Senior React Developer"
                value={formData.title}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          {/* Company Logo */}

          <div className="form-group">

            <label htmlFor="companyLogo">
              Company Logo
            </label>

            <div className="logo-upload-area">

              <div className="logo-preview">

                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Company logo preview"
                  />
                ) : (
                  <span>🏢</span>
                )}

              </div>


              <div className="logo-upload-content">

                <label
                  htmlFor="companyLogo"
                  className="upload-logo-btn"
                >
                  Upload Company Logo
                </label>

                <input
                  id="companyLogo"
                  className="logo-file-input"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleLogoChange}
                />

                <p>
                  PNG, JPG or WEBP. Recommended square
                  image.
                </p>

                {logo && (
                  <small>
                    Selected: {logo.name}
                  </small>
                )}

              </div>

            </div>

          </div>

        </section>


        {/* ===============================
            JOB DETAILS
        =============================== */}

        <section className="job-form-section">

          <div className="form-section-heading">

            <div className="section-number">
              02
            </div>

            <div>
              <h2>Job Details</h2>

              <p>
                Define the role, location and employment
                conditions.
              </p>
            </div>

          </div>


          <div className="form-grid">

            <div className="form-group">

              <label htmlFor="location">
                Location
                <span>*</span>
              </label>

              <input
                id="location"
                type="text"
                name="location"
                placeholder="e.g. Mumbai, Maharashtra"
                value={formData.location}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label htmlFor="salary">
                Salary
                <span>*</span>
              </label>

              <input
                id="salary"
                type="text"
                name="salary"
                placeholder="e.g. ₹8 - ₹12 LPA"
                value={formData.salary}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label htmlFor="experience">
                Experience
                <span>*</span>
              </label>

              <input
                id="experience"
                type="text"
                name="experience"
                placeholder="e.g. 2 - 4 Years"
                value={formData.experience}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label htmlFor="jobType">
                Employment Type
                <span>*</span>
              </label>

              <select
                id="jobType"
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select employment type
                </option>

                <option value="Full Time">
                  Full Time
                </option>

                <option value="Part Time">
                  Part Time
                </option>

                <option value="Internship">
                  Internship
                </option>

                <option value="Contract">
                  Contract
                </option>

                <option value="Freelance">
                  Freelance
                </option>
              </select>

            </div>


            <div className="form-group">

              <label htmlFor="workMode">
                Workplace Type
                <span>*</span>
              </label>

              <select
                id="workMode"
                name="workMode"
                value={formData.workMode}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select workplace type
                </option>

                <option value="On-site">
                  On-site
                </option>

                <option value="Remote">
                  Remote
                </option>

                <option value="Hybrid">
                  Hybrid
                </option>
              </select>

            </div>


            <div className="form-group">

              <label htmlFor="lastDate">
                Application Deadline
                <span>*</span>
              </label>

              <input
                id="lastDate"
                type="date"
                name="lastDate"
                value={formData.lastDate}
                onChange={handleChange}
                required
              />

              <small className="field-help">
                Last date candidates can apply for this
                position.
              </small>

            </div>

          </div>

        </section>


        {/* ===============================
            ROLE DESCRIPTION
        =============================== */}

        <section className="job-form-section">

          <div className="form-section-heading">

            <div className="section-number">
              03
            </div>

            <div>
              <h2>Role Description</h2>

              <p>
                Describe the required skills and
                responsibilities.
              </p>
            </div>

          </div>


          <div className="form-group">

            <label htmlFor="skills">
              Required Skills
              <span>*</span>
            </label>

            <input
              id="skills"
              type="text"
              name="skills"
              placeholder="e.g. React, JavaScript, Node.js, MongoDB"
              value={formData.skills}
              onChange={handleChange}
              required
            />

            <small className="field-help">
              Separate multiple skills using commas.
            </small>

          </div>


          <div className="form-group">

            <label htmlFor="description">
              Job Description
              <span>*</span>
            </label>

            <textarea
              id="description"
              name="description"
              rows="8"
              placeholder="Describe the role, responsibilities, requirements and what the candidate will work on..."
              value={formData.description}
              onChange={handleChange}
              required
            />

          </div>

          {/* Responsibilities */}

          <div className="form-group">

            <label htmlFor="responsibilities">
              Responsibilities
            </label>

            <textarea
              id="responsibilities"
              name="responsibilities"
              rows="6"
              placeholder={`Example:
Develop and maintain web applications
Work with frontend and backend developers
Fix bugs and improve performance
Participate in code reviews`}
              value={formData.responsibilities}
              onChange={handleChange}
            />

            <small className="field-help">
              Enter one responsibility per line.
            </small>

          </div>


          {/* Benefits */}

          <div className="form-group">

            <label htmlFor="benefits">
              Employee Benefits
            </label>

            <input
              id="benefits"
              type="text"
              name="benefits"
              placeholder="e.g. Health Insurance, Work From Home, Paid Leave"
              value={formData.benefits}
              onChange={handleChange}
            />

            <small className="field-help">
              Separate multiple benefits using commas.
            </small>

          </div>

        </section>


        {/* ===============================
            ACTIONS
        =============================== */}

        <div className="job-form-actions">

          <button
            type="button"
            className="cancel-job-btn"
            onClick={() => navigate("/admin/jobs")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="publish-job-btn"
            disabled={loading}
          >
            {loading
              ? "Publishing..."
              : "Publish Job"}
          </button>

        </div>

      </form>

    </div>
  );
}

export default CreateJob;