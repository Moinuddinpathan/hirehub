import { getJobs } from "../services/jobService";
import { useEffect, useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import "./LatestJobs.css";



function LatestJobs(){

   const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchJobs();
  }, []);


  const fetchJobs = async () => {
    try {
      const response = await getJobs();

       // Take newest jobs first and show only 6
       const latestJobs = response.data.jobs
       .sort(
          (a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
          )
          .slice(0, 6);

          setJobs(latestJobs) ;
    } catch {
      console.log("Failed to fetch latest jobs:", error);
    } finally {
      setLoading(false);
    };
  }

  if (loading) {
    return (
      <section className="latest-jobs">
        <div className="container">
          <h2>Latest Jobs</h2>
          <p>Loading jobs...</p>
        </div>
      </section>
    );
  }


    return(
       <section className="latest-jobs">
        <div className="container">
              <h2>Latest Jobs</h2>
        <p>Explore the newest opportunities from top companies.</p>

            <div className="jobs-grid">
                {
                    jobs.map((job) => (
                        <div className="job-card" key={job._id}>
                           {job.logo && (
  <img src={job.logo} alt={job.company} />
)}

                             <h3>{job.title}</h3>

              <h5>{job.company}</h5>

              <p>📍 {job.location}</p>

              <p>💰 {job.salary}</p>

              <span>{job.type}</span>

              <button>Apply Now</button>

              </div>
                    ))
                }
            </div>
        </div>
       </section>
    )
}

export default LatestJobs;