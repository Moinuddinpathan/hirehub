import { useEffect, useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { getJobs } from "../services/jobService";
import "./FeaturedCompanies.css";


function FeaturedCompanies() {

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await getJobs();

      const jobs = response.data.jobs || [];

      // Group jobs by company
      const companyMap = {};

      jobs.forEach((job) => {
        const companyName = job.company?.trim();

        if (!companyName) {
          return;
        }

         // Use lowercase as key so Google and google
        // are treated as the same company.
        const key = companyName.toLowerCase();

        if(!companyMap[key]) {
          companyMap[key] = {
            name: companyName,
            logo: job.logo || "",
            jobCount: 1,
          };
        } else {
          companyMap[key].jobCount += 1;

          // If the first job had no logo,
          // use a logo from another job.
          if (!companyMap[key].logo && job.logo) {
            companyMap[key].logo = job.logo;
          }
        }
      });

       const companyList = Object.values(companyMap);

      // Companies with more jobs appear first
      companyList.sort((a, b) => b.jobCount - a.jobCount);

      // Show maximum 4 featured companies
      setCompanies(companyList.slice(0, 4));

    } catch (error) {
      console.log("Failed to load companies:", error);
    } finally {
      setLoading(false);
    }
  };
    

   const handleViewJobs = (companyName) => {
    navigate(
      `/jobs?company=${encodeURIComponent(companyName)}`
    );
  };

  

  return (
    <section className="companies-section">
      <div className="container">

        <h2>Featured Companies</h2>

        <p>Top companies hiring through HireHub</p>

        {loading ? (
          <p>Loading companies...</p>
        ) : (
          <div className="company-grid">

            {companies.map((company) => {

              const logoUrl = company.logo
                ? `http://localhost:5000/${company.logo.replace(/\\/g, "/")}`
                : null;

              return (
                <div
                  className="company-card"
                  key={company.name}
                >

                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt={`${company.name} logo`}
                    />
                  ) : (
                    <div className="company-logo-placeholder">
                      {company.name.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <h4>{company.name}</h4>

                  <span>
                    {company.jobCount}{" "}
                    {company.jobCount === 1
                      ? "Open Job"
                      : "Open Jobs"}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      handleViewJobs(company.name)
                    }
                  >
                    View Jobs
                  </button>

                </div>
              );
            })}

          </div>
        )}

        {!loading && companies.length === 0 && (
          <p>No companies are hiring right now.</p>
        )}

      </div>
    </section>
  );
}

export default FeaturedCompanies;