import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { getJobs } from "../services/jobService";

import {
  useLocation as useRouterLocation,
  useSearchParams,
} from "react-router-dom";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const routerLocation = useRouterLocation();

  const [searchParams] = useSearchParams();

  // ==========================================
  // READ URL FILTERS
  // ==========================================

  const keyword =
    searchParams.get("keyword") || "";

  const location =
    searchParams.get("location") || "";

  const jobType =
    searchParams.get("jobType") || "";

  const workMode =
    searchParams.get("workMode") || "";

  const company =
    searchParams.get("company") || "";

  // ==========================================
  // FETCH JOBS
  // ==========================================

  useEffect(() => {
    fetchJobs();
  }, [
    keyword,
    location,
    jobType,
    workMode,
  ]);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const response = await getJobs({
        keyword,
        location,
        jobType,
        workMode,
      });

      setJobs(
        response.data.jobs || []
      );

    } catch (error) {
      console.error(
        "Error fetching jobs:",
        error
      );

      setJobs([]);

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // COMPANY FILTER
  // ==========================================

  const filteredJobs = jobs.filter((job) => {
    if (!company) {
      return true;
    }

    return (
      job.company
        ?.toLowerCase()
        .includes(
          company.toLowerCase()
        )
    );
  });

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="container mt-5">
        <h3 className="text-center">
          Finding the best jobs for you...
        </h3>
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-2">
        {company
          ? `${company} Jobs`
          : "Available Jobs"}
      </h2>

      {/* SEARCH SUMMARY */}

      {(keyword ||
        location ||
        jobType ||
        workMode) && (
        <p className="text-center text-muted mb-4">

          {filteredJobs.length}{" "}
          {filteredJobs.length === 1
            ? "job"
            : "jobs"}{" "}
          found

          {keyword && (
            <>
              {" "}for{" "}
              <strong>
                {keyword}
              </strong>
            </>
          )}

          {location && (
            <>
              {" "}in{" "}
              <strong>
                {location}
              </strong>
            </>
          )}

          {jobType && (
            <>
              {" "}·{" "}
              <strong>
                {jobType}
              </strong>
            </>
          )}

          {workMode && (
            <>
              {" "}·{" "}
              <strong>
                {workMode}
              </strong>
            </>
          )}

        </p>
      )}

      {/* JOB CARDS */}

      <div className="row g-4">

        {filteredJobs.length > 0 ? (

          filteredJobs.map((job) => (
            <div
              className="col-lg-6"
              key={job._id}
            >
              <JobCard
                job={job}
                returnPath={
                  routerLocation.pathname +
                  routerLocation.search
                }
              />
            </div>
          ))

        ) : (

          <div className="col-12 text-center py-5">

            <h4>
              No Jobs Found
            </h4>

            <p className="text-muted">
              Try a different keyword,
              location or filter.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default Jobs;