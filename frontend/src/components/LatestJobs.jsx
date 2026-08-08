import { useEffect, useState } from "react";
import { getJobs } from "../services/jobService";
import JobCard from "./JobCard";
import "./LatestJobs.css";


function LatestJobs() {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchJobs();
  }, []);


  const fetchJobs = async () => {

    try {

      const response = await getJobs();

      // Get jobs from API
      const allJobs = response.data.jobs || [];

      // Newest jobs first and show only 6
      const latestJobs = allJobs
        .sort(
          (a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        )
        .slice(0, 6);

      setJobs(latestJobs);

    } catch (error) {

      console.log(
        "Failed to fetch latest jobs:",
        error
      );

    } finally {

      setLoading(false);

    }
  };


  /* Loading */
  if (loading) {

    return (
      <section className="latest-jobs-section">

        <div className="latest-jobs-container">

          <div className="latest-jobs-header">

            <h2>Latest Jobs</h2>

            <p>
              Explore the newest opportunities from top companies.
            </p>

          </div>

          <p className="loading-text">
            Loading jobs...
          </p>

        </div>

      </section>
    );
  }


  return (

    <section className="latest-jobs-section">

      <div className="latest-jobs-container">


        {/* Section Heading */}

        <div className="latest-jobs-header">

          <h2>Latest Jobs</h2>

          <p>
            Explore the newest opportunities from top companies.
          </p>

        </div>


        {/* Jobs Grid */}

        <div className="jobs-grid">

          {jobs.length > 0 ? (

            jobs.map((job) => (

              <JobCard
                key={job._id}
                job={job}
              />

            ))

          ) : (

            <p className="no-jobs">
              No jobs available.
            </p>

          )}

        </div>


      </div>

    </section>

  );
}


export default LatestJobs;