import { useEffect, useState } from "react";
import JobCard from "../components/JobCard"
import { getJobs } from "../services/jobService";
import { useSearchParams } from "react-router-dom";

function Jobs(){


    const [jobs, setJobs]= useState([])
    const [loading, setLoading] = useState(true);

     // Search and filter states
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [workMode, setWorkMode] = useState("");


     // Read query parameters from URL
  const [searchParams] = useSearchParams();

  const company = searchParams.get("company");




    useEffect(()=>{
        fetchJobs();
    }, [])

    const fetchJobs = async () => {
        try {
            const response = await getJobs();

            setJobs(response.data.jobs)
        } catch(error) {
            console.log("Error fetching jobs:",error);
        } finally {
            setLoading(false);
        }
    };

 // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    // ---------------------------
    // Company filter
    // ---------------------------
    const matchesCompany =
      !company ||
      job.company?.toLowerCase() === company.toLowerCase();

    // ---------------------------
    // Search filter
    // Search title, company, skills
    // ---------------------------
    const searchText = search.toLowerCase().trim();

    const skillsText = Array.isArray(job.skills)
      ? job.skills.join(" ").toLowerCase()
      : String(job.skills || "").toLowerCase();

    const matchesSearch =
      !searchText ||
      job.title?.toLowerCase().includes(searchText) ||
      job.company?.toLowerCase().includes(searchText) ||
      skillsText.includes(searchText);

    // ---------------------------
    // Location filter
    // ---------------------------
    const matchesLocation =
      !location.trim() ||
      job.location
        ?.toLowerCase()
        .includes(location.toLowerCase().trim());

    // ---------------------------
    // Job type filter
    // ---------------------------
    const matchesJobType =
      !jobType || job.jobType === jobType;

    // ---------------------------
    // Work mode filter
    // ---------------------------
    const matchesWorkMode =
      !workMode || job.workMode === workMode;

    return (
      matchesCompany &&
      matchesSearch &&
      matchesLocation &&
      matchesJobType &&
      matchesWorkMode
    );
  });

  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setJobType("");
    setWorkMode("");
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <h3 className="text-center">
          Loading Jobs...
        </h3>
      </div>
    );
  }


    
    return(
     <div className="container mt-5">

      <h2 className="text-center mb-2">
        {company ? `${company} Jobs` : "Available Jobs"}
      </h2>

      {company && (
        <p className="text-center text-muted mb-4">
          {filteredJobs.length}{" "}
          {filteredJobs.length === 1 ? "job" : "jobs"} available
        </p>
      )}

      <div className="row">

        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div
              className="col-md-4 mb-4"
              key={job._id}
            >
              <JobCard job={job} />
            </div>
          ))
        ) : (
          <div className="text-center">
            <h4>
              {company
                ? `No jobs available at ${company}`
                : "No Jobs Available"}
            </h4>
          </div>
        )}

      </div>

    </div>
    );
}

export default Jobs