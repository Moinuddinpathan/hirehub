import { Link } from "react-router-dom";
import "./JobCard.css";

function JobCard({ job }) {

  const logoUrl = job.logo
    ? `http://localhost:5000/${job.logo.replace(/\\/g, "/")}`
    : null;

  return (
    <div className="job-card">

      {/* Top Section */}
      <div className="job-card-top">

        {/* Company Logo */}
        <div className="company-logo">

          {logoUrl ? (
            <img
              src={logoUrl}
              alt={`${job.company} logo`}
              onError={(e) => {
                e.currentTarget.style.display = "none";

                e.currentTarget.parentElement.classList.add(
                  "logo-fallback"
                );

                e.currentTarget.parentElement.innerText =
                  job.company?.charAt(0).toUpperCase() || "C";
              }}
            />
          ) : (
            <div className="logo-fallback">
              {job.company?.charAt(0).toUpperCase() || "C"}
            </div>
          )}

        </div>


        {/* Job Title and Company */}
        <div className="job-title-section">

          <h3>{job.title}</h3>

          <p className="company-name">
            {job.company}
          </p>

        </div>

      </div>


      {/* Job Information */}
      <div className="job-info">

        <div className="job-info-item">
          <span>📍</span>
          <span>{job.location}</span>
        </div>

        <div className="job-info-item">
          <span>💰</span>
          <span>{job.salary}</span>
        </div>

      </div>


      {/* Job Tags */}
      <div className="job-tags">

        {job.jobType && (
          <span className="job-tag primary-tag">
            {job.jobType}
          </span>
        )}

        {job.workMode && (
          <span className="job-tag secondary-tag">
            {job.workMode}
          </span>
        )}

      </div>


      {/* View Details Button */}
      <Link
        to={`/jobs/${job._id}`}
        className="view-job-btn"
      >
        View Details
      </Link>

    </div>
  );
}

export default JobCard;