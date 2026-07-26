import { Link } from "react-router-dom";

function JobCard({job}) {

    const logoUrl = job.logo
    ? `http://localhost:5000/${job.logo.replace(/\\/g, "/")}`
    : null;


    return(
        <div className="card shadow h-100">
      <div className="card-body">

        {/* Company Logo */}
        <div className="text-center mb-3">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={`${job.company} logo`}
              style={{
                width: "70px",
                height: "70px",
                objectFit: "contain",
              }}
            />
          ) : (
            <div
              className="bg-light rounded d-flex align-items-center justify-content-center mx-auto"
              style={{
                width: "70px",
                height: "70px",
                fontWeight: "bold",
              }}
            >
              {job.company?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <h4>{job.title}</h4>

        <h5 className="text-primary">
          {job.company}
        </h5>

        <p>
          <strong>Location: </strong>
          {job.location}
        </p>

        <p>
          <strong>Salary: </strong>
          {job.salary}
        </p>

        <div className="mb-3">

  {job.jobType && (
    <span className="badge bg-primary me-2">
      {job.jobType}
    </span>
  )}

  {job.workMode && (
    <span className="badge bg-secondary">
      {job.workMode}
    </span>
  )}

</div>

        <Link
          to={`/jobs/${job._id}`}   
          className="btn btn-primary w-100"
        >
          View Details
        </Link>

      </div>
    </div>
    )
}

export default JobCard