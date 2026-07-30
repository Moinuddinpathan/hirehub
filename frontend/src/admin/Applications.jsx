import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/Applications.css";
import {
  getApplications,
  updateApplicationStatus,
} from "../services/adminService";
// import AdminNavbar from "../components/AdminNavbar";

function Applications() {

  const [searchParams, setSearchParams] = useSearchParams();

const jobId = searchParams.get("job");

  const [applications, setApplications] = useState([]);

  const [selectedApplication, setSelectedApplication] = useState(null);


const [search, setSearch] = useState("");

const [statusUpdatingId, setStatusUpdatingId] = useState(null);
const [statusMessage, setStatusMessage] = useState("");
const [statusError, setStatusError] = useState("");


const [statusFilter, setStatusFilter] = useState("All");


  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {

      const response = await getApplications();

      setApplications(response.data.applications);

    } catch (error) {

      console.log(error);

    }
  };

  const changeStatus = async (id, status) => {

    try {
        await updateApplicationStatus(id, status);
        
        alert("Application Updated");

        fetchApplications();
    } catch (error) {
        // console.log(error);
         console.log("STATUS ERROR:", error);
  console.log("BACKEND RESPONSE:", error.response?.data);
  console.log("STATUS CODE:", error.response?.status);
        alert("Update Failed")
        
    }
  }


  const applicationStats = {
  total: applications.length,

  pending: applications.filter(
    (app) => app.status === "Pending"
  ).length,

  reviewed: applications.filter(
    (app) => app.status === "Reviewed"
  ).length,

  selected: applications.filter(
    (app) => app.status === "Selected"
  ).length,

  rejected: applications.filter(
    (app) => app.status === "Rejected"
  ).length,
};



  const filteredApplications = applications.filter((app) => {

     const searchText = search.toLowerCase().trim();


     const matchesSearch =
    app.user?.name
      ?.toLowerCase()
      .includes(searchText) ||
    app.user?.email
      ?.toLowerCase()
      .includes(searchText) ||
    app.job?.title
      ?.toLowerCase()
      .includes(searchText) ||
    app.skills
      ?.toLowerCase()
      .includes(searchText);

  const matchesJob =
    !jobId ||
    app.job?._id === jobId;


  const matchesStatus =
    statusFilter === "All" ||
    app.status === statusFilter;


  return(
     matchesSearch &&
    matchesJob &&
    matchesStatus
  );
  })


  const selectedJobTitle = jobId
  ? applications.find(
      (app) => app.job?._id === jobId
    )?.job?.title
  : null;

   return (
    <>
    {/* <AdminNavbar /> */}
    <div className="applications-page">


       {/* =========================
          PAGE HEADER
      ========================= */}
       <div className="applications-header">

  <div>
    <span className="applications-eyebrow">
      RECRUITMENT
    </span>

    <h1>Applications</h1>

    <p>
      Review candidates, manage application progress
      and make hiring decisions.
    </p>
  </div>

</div>

<div className="application-summary-grid">

  <div className="application-summary-card">
    <span>Total Applications</span>
    <strong>{applicationStats.total}</strong>
  </div>

  <div className="application-summary-card">
    <span>Pending Review</span>
    <strong>{applicationStats.pending}</strong>
  </div>

  <div className="application-summary-card">
    <span>Reviewed</span>
    <strong>{applicationStats.reviewed}</strong>
  </div>

  <div className="application-summary-card">
    <span>Selected</span>
    <strong>{applicationStats.selected}</strong>
  </div>

  <div className="application-summary-card">
    <span>Rejected</span>
    <strong>{applicationStats.rejected}</strong>
  </div>

</div>


       {/* JOB FILTER INFORMATION */}

      {jobId && (
        <div className="alert alert-primary d-flex justify-content-between align-items-center">

          <div>
            Showing applications for{" "}
            <strong>
              {selectedJobTitle || "Selected Job"}
            </strong>
          </div>

          <button
            type="button"
            className="btn btn-sm btn-outline-primary"
            onClick={() => setSearchParams({})}
          >
            View All Applications
          </button>

        </div>
      )}


      <div className="applications-toolbar">

  <div className="applications-search">
    <span>⌕</span>

    <input
      type="text"
      placeholder="Search candidates, email, jobs or skills..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
    />
  </div>

  <select
    className="applications-status-filter"
    value={statusFilter}
    onChange={(e) =>
      setStatusFilter(e.target.value)
    }
  >
    <option value="All">
      All Statuses
    </option>

    <option value="Pending">
      Pending
    </option>

    <option value="Reviewed">
      Reviewed
    </option>

    <option value="Selected">
      Selected
    </option>

    <option value="Rejected">
      Rejected
    </option>

  </select>

</div>

      <div className="applications-table-card">

  <div className="applications-table-wrapper">

    <table className="admin-applications-table">

         <thead>

          <tr>
  <th>Applicant</th>
  <th>Email</th>
  <th>Job</th>
  <th>Skills</th>
  <th>Experience</th>
  <th>Status</th>
  <th>Resume</th>
  <th>Details</th>
  <th>Change Status</th>
</tr>

        </thead>

            <tbody>
  {filteredApplications.map((app) => (
    <tr key={app._id}>
      <td>{app.user?.name}</td>

      <td>{app.user?.email}</td>

      <td>{app.job?.title}</td>

      <td>{app.skills}</td>

      <td>{app.experience}</td>

      <td>
        <span
  className={`application-status ${app.status?.toLowerCase()}`}
>
  {app.status}
</span>
      </td>

      <td>
        {app.resume ? (
          <a
            href={`http://localhost:5000/${app.resume.replace(/\\/g, "/")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="application-resume-button"
          >
            View Resume
          </a>
        ) : (
          <span>No Resume</span>
        )}
      </td>

      <td>
        <button className="application-view-button"
        data-bs-toggle="modal"
        data-bs-target="#applicationModal"
         onClick={() =>{
          console.log(app);
          setSelectedApplication(app)}}>
          View Details
        </button>
      </td>

      <td>
        <select
          className="application-status-select"
          value={app.status}
          onChange={(e) =>
            changeStatus(app._id, e.target.value)
          }
        >
          <option value="Pending">Pending</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Selected">Selected</option>
          <option value="Rejected">Rejected</option>
        </select>
      </td>
    </tr>
  ))}
</tbody>
      </table>
</div>
</div>
    </div>

{/* =====================================
    CANDIDATE DETAILS MODAL
===================================== */}

<div
  className="modal fade candidate-modal"
  id="applicationModal"
  tabIndex="-1"
  aria-hidden="true"
>
  <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">

    <div className="modal-content candidate-modal-content">

      {selectedApplication && (
        <>

          {/* HEADER */}

          <div className="candidate-modal-header">

            <div className="candidate-header-profile">

              <div className="candidate-avatar">
                {selectedApplication.user?.name
                  ?.charAt(0)
                  .toUpperCase() || "C"}
              </div>

              <div>
                <span className="candidate-label">
                  CANDIDATE PROFILE
                </span>

                <h2>
                  {selectedApplication.user?.name}
                </h2>

                <p>
                  Applied for{" "}
                  <strong>
                    {selectedApplication.job?.title}
                  </strong>
                </p>
              </div>

            </div>


            <div className="candidate-header-actions">

              <span
                className={`application-status ${selectedApplication.status?.toLowerCase()}`}
              >
                {selectedApplication.status}
              </span>

              <button
                type="button"
                className="candidate-modal-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                ×
              </button>

            </div>

          </div>


          {/* BODY */}

          <div className="candidate-modal-body">

            {/* LEFT SIDE */}

            <div className="candidate-main-column">


              {/* CONTACT */}

              <section className="candidate-section">

                <div className="candidate-section-header">
                  <h3>Contact Information</h3>

                  <p>
                    Candidate contact and professional
                    information.
                  </p>
                </div>


                <div className="candidate-info-grid">

                  <div className="candidate-info-item">
                    <span>Email</span>

                    <strong>
                      {selectedApplication.user?.email || "—"}
                    </strong>
                  </div>


                  <div className="candidate-info-item">
                    <span>Location</span>

                    <strong>
                      {selectedApplication.location || "—"}
                    </strong>
                  </div>


                  <div className="candidate-info-item">
                    <span>Experience</span>

                    <strong>
                      {selectedApplication.experience || "—"}
                    </strong>
                  </div>


                  <div className="candidate-info-item">
                    <span>Expected Salary</span>

                    <strong>
                      {selectedApplication.expectedSalary || "—"}
                    </strong>
                  </div>

                </div>

              </section>


              {/* APPLICATION */}

              <section className="candidate-section">

                <div className="candidate-section-header">
                  <h3>Application Details</h3>

                  <p>
                    Position and candidate qualifications.
                  </p>
                </div>


                <div className="candidate-job-card">

                  <span>Position</span>

                  <strong>
                    {selectedApplication.job?.title || "—"}
                  </strong>

                  <p>
                    {selectedApplication.job?.company || ""}
                  </p>

                </div>


                <div className="candidate-skills">

                  <span className="candidate-field-label">
                    Skills
                  </span>

                  <div className="candidate-skill-list">

                    {Array.isArray(selectedApplication.skills) ? (

                      selectedApplication.skills.map(
                        (skill, index) => (
                          <span
                            className="candidate-skill"
                            key={index}
                          >
                            {skill}
                          </span>
                        )
                      )

                    ) : (

                      selectedApplication.skills
                        ?.split(",")
                        .filter(Boolean)
                        .map((skill, index) => (
                          <span
                            className="candidate-skill"
                            key={index}
                          >
                            {skill.trim()}
                          </span>
                        ))

                    )}

                  </div>

                </div>

              </section>


              {/* COVER LETTER */}

              <section className="candidate-section">

                <div className="candidate-section-header">
                  <h3>Cover Letter</h3>

                  <p>
                    Message submitted with the application.
                  </p>
                </div>


                <div className="candidate-cover-letter">
                  {selectedApplication.coverLetter ||
                    "No cover letter was provided."}
                </div>

              </section>

            </div>


            {/* RIGHT SIDE */}

            <aside className="candidate-side-column">


              {/* APPLICATION STATUS */}

              <div className="candidate-side-card">

                <h3>Application Status</h3>

                <p>
                  Move this candidate through the hiring
                  process.
                </p>


                <label htmlFor="candidateStatus">
                  Current Status
                </label>

                <select
                  id="candidateStatus"
                  className="candidate-status-select"
                  value={selectedApplication.status}
                  onChange={async (e) => {
                    const newStatus = e.target.value;

                    await changeStatus(
                      selectedApplication._id,
                      newStatus
                    );

                    setSelectedApplication((prev) => ({
                      ...prev,
                      status: newStatus,
                    }));
                  }}
                >
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Reviewed">
                    Reviewed
                  </option>

                  <option value="Selected">
                    Selected
                  </option>

                  <option value="Rejected">
                    Rejected
                  </option>
                </select>

              </div>


              {/* DOCUMENTS */}

              <div className="candidate-side-card">

                <h3>Documents</h3>

                <p>
                  Review candidate documents.
                </p>


                {selectedApplication.resume ? (

                  <a
                    href={`http://localhost:5000/${selectedApplication.resume.replace(
                      /\\/g,
                      "/"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="candidate-primary-link"
                  >
                    View Resume
                    <span>↗</span>
                  </a>

                ) : (

                  <div className="candidate-unavailable">
                    No resume uploaded
                  </div>

                )}

              </div>


              {/* PROFESSIONAL LINKS */}

              <div className="candidate-side-card">

                <h3>Professional Links</h3>


                {selectedApplication.linkedIn ? (

                  <a
                    href={selectedApplication.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="candidate-secondary-link"
                  >
                    LinkedIn Profile
                    <span>↗</span>
                  </a>

                ) : (

                  <div className="candidate-unavailable">
                    LinkedIn not provided
                  </div>

                )}


                {selectedApplication.github ? (

                  <a
                    href={selectedApplication.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="candidate-secondary-link"
                  >
                    GitHub Profile
                    <span>↗</span>
                  </a>

                ) : (

                  <div className="candidate-unavailable">
                    GitHub not provided
                  </div>

                )}

              </div>


              {/* APPLICATION ID */}

              <div className="candidate-side-card candidate-meta-card">

                <span>Application ID</span>

                <strong>
                  {selectedApplication._id}
                </strong>

              </div>

            </aside>

          </div>


          {/* FOOTER */}

          <div className="candidate-modal-footer">

            <button
              type="button"
              className="candidate-close-button"
              data-bs-dismiss="modal"
            >
              Close
            </button>

          </div>

        </>
      )}

    </div>

  </div>
</div>

    </>
)
}

export default Applications;