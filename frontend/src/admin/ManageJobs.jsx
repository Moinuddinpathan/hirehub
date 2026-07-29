    import { useEffect, useState } from "react";
    // import { getJobs, deleteJob } from "../services/adminService";
// import AdminNavbar from "../components/AdminNavbar";
// import { getJobs, updateJobStatus } from "../services/jobService";
import { useNavigate } from "react-router-dom";
import { getJobs, updateJobStatus, deleteJob } from "../services/adminService";
import "../styles/ManageJobs.css"

    function ManageJobs() {

        const navigate = useNavigate();

        const [jobs, setJobs] = useState([]);
        const [loading, setLoading] = useState(true);

        const [search, setSearch] = useState("");
        const [statusFilter, setStatusFilter] = useState("All");

         const [selectedJob, setSelectedJob] = useState(null);
  const [actionType, setActionType] = useState("");

  const [actionLoading, setActionLoading] = useState(false);


        useEffect(() => {
            fetchJobs()
        }, [])

        const fetchJobs = async () => {
            try {
            const response = await getJobs();

            console.log(response.data);

            setJobs(response.data.jobs || []);
            
        } catch (error) {
            console.log(error);
            
        }finally {
      setLoading(false);
    }
  };
        
  // ===============================
  // OPEN CONFIRMATION MODAL
  // ===============================

  const openActionModal = (job, action ) => {
    setSelectedJob(job);
    setActionType(action);

  }


  // ===============================
  // CLOSE MODAL
  // ===============================

  const closeModal = () => {
    if (actionLoading) return;

    setSelectedJob(null);
    setActionType("");
  };


  // ===============================
  // CHANGE JOB STATUS
  // ===============================

   const handleStatusChange = async () => {
  if (!selectedJob) return;

  try {
    setActionLoading(true);

    let newStatus;

    if (actionType === "close") {
      newStatus = "Closed";
    } else if (actionType === "reopen") {
      newStatus = "Active";
    } else if (actionType === "publish") {
      newStatus = "Active";
    } else {
      return;
    }

    // Update status in backend
    await updateJobStatus(
      selectedJob._id,
      newStatus
    );

    // Fetch updated jobs
    await fetchJobs();

    // Close confirmation modal
    setActionLoading(false);
    setSelectedJob(null);
    setActionType("");

  } catch (error) {
    console.error(
      "Failed to update job status:",
      error.response?.data || error
    );

    alert(
      error.response?.data?.message ||
      "Failed to update job status"
    );

  } finally {
    setActionLoading(false);
  }
};

  // ===============================
  // DELETE JOB
  // ===============================
        const handleDelete = async () => {
    if (!selectedJob) return;

    try {
      setActionLoading(true);

      await deleteJob(selectedJob._id);

      await fetchJobs();

      closeModal();

    } catch (error) {
      console.error(
        "Failed to delete job:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete job"
      );

    } finally {
      setActionLoading(false);
    }
  };


   // ===============================
  // FILTER JOBS
  // ===============================

  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      job.title?.toLowerCase().includes(searchText) ||
      job.company?.toLowerCase().includes(searchText) ||
      job.location?.toLowerCase().includes(searchText);

    const currentStatus = job.status || "Active";

    const matchesStatus =
      statusFilter === "All" ||
      currentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // ===============================
  // STATUS BADGE
  // ===============================
   const getStatusClass = (status) => {
    switch (status) {
      case "Active":
        return "job-status-active";

      case "Closed":
        return "job-status-closed";

      case "Draft":
        return "job-status-draft";

      default:
        return "job-status-active";
    }
  };


  // ===============================
  // MODAL TEXT
  // ===============================

  const getModalContent = () => {
    if (!selectedJob) {
      return {
        title: "",
        message: "",
        button: "",
      };
    }
     switch (actionType) {
      case "close":
        return {
          title: "Close this job?",
          message:
            "Candidates will no longer be able to apply for this position. Existing applications will remain available.",
          button: "Close Job",
        };

      case "reopen":
        return {
          title: "Reopen this job?",
          message:
            "The job will become active again and candidates will be able to apply.",
          button: "Reopen Job",
        };

      case "publish":
        return {
          title: "Publish this draft?",
          message:
            "This job will become visible and available for candidates.",
          button: "Publish Job",
        };

      case "delete":
        return {
          title: "Delete this job?",
          message:
            "This action permanently removes the job posting. This action cannot be undone.",
          button: "Delete Job",
        };

      default:
        return {
          title: "",
          message: "",
          button: "",
        };
    }
  };

  const modalContent = getModalContent();

   // ===============================
  // LOADING
  // ===============================
  if (loading) {
    return (
      <div className="manage-jobs-page">
        <div className="jobs-loading">
          <div className="jobs-spinner"></div>

          <p>Loading job postings...</p>
        </div>
      </div>
    );
  }


// const handleStatusChange = async (jobId, newStatus) => {
//   try {
//     const response = await updateJobStatus(jobId, newStatus);

//     if (response.success) {
//       setJobs((prevJobs) =>
//         prevJobs.map((job) =>
//           job._id === jobId
//             ? { ...job, status: newStatus }
//             : job
//         )
//       );
//     }
//   } catch (error) {
//     console.error("UPDATE STATUS ERROR:", error);
//   }
// };


    return(
       <div className="manage-jobs-page">

      {/* ============================
          HEADER
      ============================ */}

      <div className="manage-jobs-header">

        <div>
          <span className="manage-jobs-eyebrow">
            JOB MANAGEMENT
          </span>

          <h1>Manage Jobs</h1>

          <p>
            Manage job postings, monitor applications
            and control job availability.
          </p>
        </div>


        <button
          className="create-job-button"
          onClick={() =>
            navigate("/admin/jobs/create")
          }
        >
          <span>＋</span>
          Create Job
        </button>

      </div>


      {/* ============================
          STATS
      ============================ */}

      <div className="job-summary-grid">

        <div className="job-summary-card">
          <span>Total Jobs</span>

          <strong>
            {jobs.length}
          </strong>
        </div>


        <div className="job-summary-card">
          <span>Active Jobs</span>

          <strong>
            {
              jobs.filter(
                (job) =>
                  (job.status || "Active") ===
                  "Active"
              ).length
            }
          </strong>
        </div>


        <div className="job-summary-card">
          <span>Drafts</span>

          <strong>
            {
              jobs.filter(
                (job) =>
                  job.status === "Draft"
              ).length
            }
          </strong>
        </div>


        <div className="job-summary-card">
          <span>Closed Jobs</span>

          <strong>
            {
              jobs.filter(
                (job) =>
                  job.status === "Closed"
              ).length
            }
          </strong>
        </div>

      </div>


      {/* ============================
          TABLE CARD
      ============================ */}

      <div className="jobs-table-card">

        {/* SEARCH + FILTER */}

        <div className="jobs-toolbar">

          <div className="jobs-search">

            <span>⌕</span>

            <input
              type="text"
              placeholder="Search by job, company or location..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <select
            className="jobs-status-filter"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="All">
              All Statuses
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Draft">
              Draft
            </option>

            <option value="Closed">
              Closed
            </option>

          </select>

        </div>


        {/* TABLE */}

        <div className="jobs-table-wrapper">

          <table className="admin-jobs-table">

            <thead>
              <tr>
                <th>Job</th>
                <th>Type</th>
                <th>Workplace</th>
                <th>Status</th>
                <th>Applicants</th>
                <th>Deadline</th>
                <th>Actions</th>
              </tr>
            </thead>


            <tbody>

              {filteredJobs.length > 0 ? (

                filteredJobs.map((job) => {

                  const status =
                    job.status || "Active";

                  return (
                    <tr key={job._id}>

                      {/* JOB */}

                      <td>

                        <div className="job-table-info">

                          <div className="job-table-logo">

                            {job.logo ? (
                              <img
                                src={`http://localhost:5000/${job.logo.replace(
                                  /\\/g,
                                  "/"
                                )}`}
                                alt={`${job.company} logo`}
                              />
                            ) : (
                              <span>
                                {job.company
                                  ?.charAt(0)
                                  .toUpperCase()}
                              </span>
                            )}

                          </div>


                          <div>

                            <strong>
                              {job.title}
                            </strong>

                            <span>
                              {job.company}
                            </span>

                            <small>
                              {job.location}
                            </small>

                          </div>

                        </div>

                      </td>


                      {/* TYPE */}

                      <td>
                        {job.jobType || "—"}
                      </td>


                      {/* WORKPLACE */}

                      <td>
                        {job.workMode || "—"}
                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={`job-status-badge ${getStatusClass(
                            status
                          )}`}
                        >
                          <span className="status-dot"></span>

                          {status}
                        </span>

                      </td>


                      {/* APPLICANTS */}

                      <td>

                        <button
                          className="applicant-count-button"
                          onClick={() =>
                            navigate(
                              `/admin/applications?job=${job._id}`
                            )
                          }
                        >
                          {job.applicantCount || 0}
                        </button>

                      </td>


                      {/* DEADLINE */}

                      <td>

                        {job.lastDate
                          ? new Date(
                              job.lastDate
                            ).toLocaleDateString()
                          : "—"}

                      </td>


                      {/* ACTIONS */}

                      <td>

                        <div className="job-action-buttons">

                          <button
                            className="job-action edit"
                            title="Edit job"
                            onClick={() =>
                              navigate(
                                `/admin/jobs/${job._id}/edit`
                              )
                            }
                          >
                            Edit
                          </button>


                          {status === "Active" && (

                            <button
                              className="job-action close"
                              onClick={() =>
                                openActionModal(
                                  job,
                                  "close"
                                )
                              }
                            >
                              Close
                            </button>

                          )}


                          {status === "Closed" && (

                            <button
                              className="job-action reopen"
                              onClick={() =>
                                openActionModal(
                                  job,
                                  "reopen"
                                )
                              }
                            >
                              Reopen
                            </button>

                          )}


                          {status === "Draft" && (

                            <button
                              className="job-action publish"
                              onClick={() =>
                                openActionModal(
                                  job,
                                  "publish"
                                )
                              }
                            >
                              Publish
                            </button>

                          )}


                          <button
                            className="job-action delete"
                            onClick={() =>
                              openActionModal(
                                job,
                                "delete"
                              )
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>
                  );
                })

              ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="jobs-empty-state"
                  >
                    <div>
                      <h3>No jobs found</h3>

                      <p>
                        Try changing your search or
                        status filter.
                      </p>
                    </div>
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* ============================
          CONFIRMATION MODAL
      ============================ */}

      {selectedJob && (

        <div
          className="job-modal-overlay"
          onMouseDown={closeModal}
        >

          <div
            className="job-confirm-modal"
            onMouseDown={(e) =>
              e.stopPropagation()
            }
          >

            <div
              className={`confirmation-icon ${
                actionType === "delete"
                  ? "danger"
                  : "warning"
              }`}
            >
              {actionType === "delete"
                ? "!"
                : "?"}
            </div>


            <h2>
              {modalContent.title}
            </h2>


            <p>
              {modalContent.message}
            </p>


            <div className="modal-job-preview">

              <strong>
                {selectedJob.title}
              </strong>

              <span>
                {selectedJob.company}
              </span>

            </div>


            <div className="job-modal-actions">

              <button
                className="modal-cancel-button"
                onClick={closeModal}
                disabled={actionLoading}
              >
                Cancel
              </button>


              <button
                className={
                  actionType === "delete"
                    ? "modal-delete-button"
                    : "modal-confirm-button"
                }
                disabled={actionLoading}
                onClick={
                  actionType === "delete"
                    ? handleDelete
                    : handleStatusChange
                }
              >

                {actionLoading
                  ? "Processing..."
                  : modalContent.button}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

    )
    }

    export default ManageJobs;