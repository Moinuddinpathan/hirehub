import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJobById } from "../services/jobService";

function JobDetails() {

    const { id } = useParams();

    const [job, setJob] = useState(null);

    useEffect(()=>{
        fetchJob();
    }, [id])

    const fetchJob = async () => {
        try {
            const response = await getJobById(id);

            setJob(response.data.job);
        } catch (error) {
            console.log(error);
        }
    };

    if(!job){
        return <h2 className="text-center mt-5">Loading...</h2>;
    }

    const logoUrl = job.logo
  ? `http://localhost:5000/${job.logo.replace(/\\/g, "/")}`
  : null;


    return (


        <div className="container mt-5 mb-5">

      <div className="card shadow">

        {/* Header */}
        <div className="card-header bg-primary text-white">

          <div className="d-flex align-items-center gap-3">

            {/* Company Logo */}
            {logoUrl ? (
              <div
                className="bg-white rounded p-2"
                style={{
                  width: "80px",
                  height: "80px",
                }}
              >
                <img
                  src={logoUrl}
                  alt={`${job.company} logo`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            ) : (
              <div
                className="bg-white text-primary rounded d-flex align-items-center justify-content-center"
                style={{
                  width: "80px",
                  height: "80px",
                  fontSize: "30px",
                  fontWeight: "bold",
                }}
              >
                {job.company?.charAt(0).toUpperCase()}
              </div>
            )}

            {/* Job + Company */}
            <div>
              <h2 className="mb-1">
                {job.title}
              </h2>

              <h5 className="mb-0">
                {job.company}
              </h5>
            </div>

          </div>

        </div>

        {/* Body */}
        <div className="card-body">

          <p>
            <strong>Location: </strong>
            {job.location}
          </p>

          <p>
            <strong>Salary: </strong>
            {job.salary}
          </p>

          <p>
            <strong>Experience: </strong>
            {job.experience}
          </p>

          <p>
            <strong>Skills: </strong>
            {Array.isArray(job.skills)
              ? job.skills.join(", ")
              : job.skills}
          </p>

          <hr />

          <h5>Job Description</h5>

          <p>
            {job.description}
          </p>

          {job.lastDate && (
            <p>
              <strong>Last Date to Apply: </strong>

              {new Date(job.lastDate).toLocaleDateString()}
            </p>
          )}

          <Link
            to={`/apply/${job._id}`}
            className="btn btn-success mt-3"
          >
            Apply Now
          </Link>

        </div>

      </div>

    </div>


    )
}




export default JobDetails