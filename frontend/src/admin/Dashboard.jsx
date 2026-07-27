  import { useEffect, useState } from "react";
  import { Link } from "react-router-dom"
  import { getDashboard } from "../services/adminService";
  // import AdminNavbar from "../components/AdminNavbar";
  import "./Dashboard.css";

  function Dashboard(){

      
  const [dashboard, setDashboard] = useState({
      totalUsers: 0,
    totalJobs: 0,
    totalApplications: 0,
  
  applicationStats: {
      pending: 0,
      reviewed: 0,
      selected: 0,
      rejected: 0,
    },

    recentApplications: [],
  }
);

  const [loading, setLoading] = useState(true);

   const [error, setError] = useState("");

  useEffect(()=>{
      fetchDashboard();
  }, [])

  const fetchDashboard = async () => {
      try {

        setLoading(true);
        setError("");


          const response = await getDashboard();

          console.log(response.data);

          setDashboard(response.data.dashboard);
  // setDashboard({
  //   totalUsers: response.data.dashboard.totalUsers,
  //   totalJobs: response.data.dashboard.totalJobs,
  //   totalApplications: response.data.dashboard.totalApplications,
  // });
      } catch (error) {
          console.log(error);
          alert("Failed to Load Dashboard")
          setError(
        error.response?.data?.message ||
          "Failed to load dashboard"
      );
      } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div
          className="spinner-border text-primary"
          role="status"
        ></div>

        <h5>Loading dashboard...</h5>
      </div>
    );
  }


  if (error) {
    return (
      <div className="dashboard-error">
        <div className="alert alert-danger">
          {error}
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={fetchDashboard}
        >
          Try Again
        </button>
      </div>
    );
  }
  

   const stats = dashboard.applicationStats || {
    pending: 0,
    reviewed: 0,
    selected: 0,
    rejected: 0,
  };

  const recentApplications =
    dashboard.recentApplications || [];





      return (
       <div className="admin-dashboard">

      {/* ================= HEADER ================= */}

      <div className="dashboard-header">

        <div>
          <p className="dashboard-label">
            OVERVIEW
          </p>

          <h1>Admin Dashboard</h1>

          <p className="dashboard-subtitle">
            Manage jobs, users, applications and recruitment
            activity from one place.
          </p>
        </div>

        <Link
          to="/admin/jobs/create"
          className="dashboard-add-job"
        >
          + Post New Job
        </Link>

      </div>


      {/* ================= MAIN STATS ================= */}

      <div className="dashboard-main-stats">

        {/* USERS */}

        <Link
          to="/admin/users"
          className="main-stat-card"
        >
          <div className="main-stat-icon users-icon">
            👥
          </div>

          <div className="main-stat-content">
            <p>Total Users</p>

            <h2>{dashboard.totalUsers}</h2>

            <span>Registered candidates</span>
          </div>
        </Link>


        {/* JOBS */}

        <Link
          to="/admin/jobs"
          className="main-stat-card"
        >
          <div className="main-stat-icon jobs-icon">
            💼
          </div>

          <div className="main-stat-content">
            <p>Total Jobs</p>

            <h2>{dashboard.totalJobs}</h2>

            <span>Jobs on the platform</span>
          </div>
        </Link>


        {/* APPLICATIONS */}

        <Link
          to="/admin/applications"
          className="main-stat-card"
        >
          <div className="main-stat-icon applications-icon">
            📄
          </div>

          <div className="main-stat-content">
            <p>Total Applications</p>

            <h2>{dashboard.totalApplications}</h2>

            <span>Candidate applications</span>
          </div>
        </Link>


        {/* PENDING */}

        <Link
          to="/admin/applications"
          className="main-stat-card"
        >
          <div className="main-stat-icon pending-icon">
            ⏳
          </div>

          <div className="main-stat-content">
            <p>Pending Review</p>

            <h2>{stats.pending}</h2>

            <span>Waiting for review</span>
          </div>
        </Link>

      </div>


      {/* ================= RECRUITMENT SECTION ================= */}

      <div className="dashboard-middle-grid">

        {/* APPLICATION OVERVIEW */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>
              <h3>Application Overview</h3>

              <p>
                Current candidate recruitment pipeline
              </p>
            </div>

            <Link to="/admin/applications">
              View All
            </Link>

          </div>


          <div className="application-overview">

            <div className="overview-row">

              <div className="overview-info">
                <span className="status-dot pending-dot"></span>

                <span>Pending</span>
              </div>

              <strong>{stats.pending}</strong>

            </div>


            <div className="overview-row">

              <div className="overview-info">
                <span className="status-dot reviewed-dot"></span>

                <span>Reviewed</span>
              </div>

              <strong>{stats.reviewed}</strong>

            </div>


            <div className="overview-row">

              <div className="overview-info">
                <span className="status-dot selected-dot"></span>

                <span>Selected</span>
              </div>

              <strong>{stats.selected}</strong>

            </div>


            <div className="overview-row">

              <div className="overview-info">
                <span className="status-dot rejected-dot"></span>

                <span>Rejected</span>
              </div>

              <strong>{stats.rejected}</strong>

            </div>

          </div>

        </div>


        {/* QUICK ACTIONS */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>
              <h3>Quick Actions</h3>

              <p>
                Common administration tasks
              </p>
            </div>

          </div>


          <div className="quick-actions">

            <Link
              to="/admin/jobs/create"
              className="quick-action"
            >
              <div className="quick-action-icon">
                ＋
              </div>

              <div>
                <strong>Post New Job</strong>

                <span>
                  Create a new job opportunity
                </span>
              </div>
            </Link>


            <Link
              to="/admin/applications"
              className="quick-action"
            >
              <div className="quick-action-icon">
                📄
              </div>

              <div>
                <strong>Review Applications</strong>

                <span>
                  Review candidate applications
                </span>
              </div>
            </Link>


            <Link
              to="/admin/jobs"
              className="quick-action"
            >
              <div className="quick-action-icon">
                💼
              </div>

              <div>
                <strong>Manage Jobs</strong>

                <span>
                  Edit or remove job listings
                </span>
              </div>
            </Link>


            <Link
              to="/admin/users"
              className="quick-action"
            >
              <div className="quick-action-icon">
                👥
              </div>

              <div>
                <strong>Manage Users</strong>

                <span>
                  View registered candidates
                </span>
              </div>
            </Link>

          </div>

        </div>

      </div>


      {/* ================= RECENT APPLICATIONS ================= */}

      <div className="dashboard-panel recent-panel">

        <div className="panel-header">

          <div>
            <h3>Recent Applications</h3>

            <p>
              Latest candidates applying to your job listings
            </p>
          </div>

          <Link to="/admin/applications">
            View All Applications →
          </Link>

        </div>


        {recentApplications.length > 0 ? (

          <div className="table-responsive">

            <table className="dashboard-table">

              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Position</th>
                  <th>Company</th>
                  <th>Applied On</th>
                  <th>Status</th>
                </tr>
              </thead>


              <tbody>

                {recentApplications.map((application) => {

                  const status =
                    application.status || "Pending";

                  return (
                    <tr key={application._id}>

                      {/* CANDIDATE */}

                      <td>

                        <div className="dashboard-candidate">

                          <div className="candidate-avatar">

                            {application.user?.name
                              ?.charAt(0)
                              .toUpperCase() || "U"}

                          </div>

                          <div>

                            <strong>
                              {application.user?.name ||
                                "Unknown User"}
                            </strong>

                            <span>
                              {application.user?.email ||
                                "No email"}
                            </span>

                          </div>

                        </div>

                      </td>


                      {/* JOB */}

                      <td>
                        <strong className="job-position">
                          {application.job?.title ||
                            "Job unavailable"}
                        </strong>
                      </td>


                      {/* COMPANY */}

                      <td>
                        {application.job?.company || "-"}
                      </td>


                      {/* DATE */}

                      <td>

                        {application.createdAt
                          ? new Date(
                              application.createdAt
                            ).toLocaleDateString(
                              "en-US",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "-"}

                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={`dashboard-status status-${status.toLowerCase()}`}
                        >
                          {status}
                        </span>

                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>

        ) : (

          <div className="dashboard-empty">

            <div className="empty-icon">
              📄
            </div>

            <h4>No applications yet</h4>

            <p>
              New candidate applications will appear here.
            </p>

          </div>

        )}

      </div>

    </div>
      )
  } 





  export default Dashboard;