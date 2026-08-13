import { useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";
import { getMyApplications } from "../services/applicationService";
import "../styles/MyApplication.css";

function MyApplications() {

    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedApplication, setSelectedApplication] = useState(null);


    useEffect(()=>{
        fetchApplications()
    }, [])
  

 const fetchApplications = async () => {

    try {

        setLoading(true);

        const response = await getMyApplications();

        console.log("My Applications Response:", response.data);

        setApplications(response.data.application || []);

    } catch (error) {

        console.log("Fetch Applications Error:", error);

        alert(
            error.response?.data?.message ||
            "Failed to load applications"
        );

    } finally {

        setLoading(false);

    }

};

    const formatDate = (date) => {

    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

};

  const getStatusClass = (status) => {
        return status?.toLowerCase() || "pending";
    };
    

    if (loading) {
    return (
        <div className="my-applications-page">
            <div className="my-applications-container">
                <div className="my-applications-empty">
                    <div className="loading-spinner"></div>

                    <h2>Loading Applications...</h2>

                    <p>
                        Please wait while we load your applications.
                    </p>
                </div>
            </div>
        </div>
    );
}

 return (
        <div className="my-applications-page">

            <div className="my-applications-container">

                {/* =========================
                    PAGE HEADER
                ========================= */}

                <div className="my-applications-header">

                    <span className="my-applications-eyebrow">
                        CAREER DASHBOARD
                    </span>

                    <h1>
                        My Applications
                    </h1>

                    <p>
                        Track your applications and stay updated on your job search.
                    </p>

                </div>


                {/* =========================
                    APPLICATIONS CARD
                ========================= */}

                {applications.length === 0 ? (

                    <div className="my-applications-empty">

                        <div className="empty-icon">
                            ✓
                        </div>

                        <h2>
                            No Applications Yet
                        </h2>

                        <p>
                            You haven't applied for any jobs yet.
                        </p>

                        <button
    className="browse-jobs-button"
    onClick={() => navigate("/jobs")}
>
    Browse Jobs
</button>

                    </div>

                ) : (

                    <div className="my-applications-card">

                        <div className="applications-table-wrapper">

                            <table className="my-applications-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Job
                                        </th>

                                        <th>
                                            Company
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Applied On
                                        </th>

                                        <th className="actions-column">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {applications.map((app) => (

                                        <tr key={app._id}>

                                            {/* JOB */}

                                            <td>

                                                <div className="application-job">

                                                    <strong>
                                                        {app.job?.title || "—"}
                                                    </strong>

                                                </div>

                                            </td>


                                            {/* COMPANY */}

                                            <td>

                                                <span className="application-company">
                                                    {app.job?.company || "—"}
                                                </span>

                                            </td>


                                            {/* STATUS */}

                                            <td>

                                                <span
                                                    className={`my-application-status ${getStatusClass(
                                                        app.status
                                                    )}`}
                                                >
                                                    {app.status || "Pending"}
                                                </span>

                                            </td>


                                            {/* DATE */}

                                            <td>

                                                <span className="application-date">
                                                    {formatDate(app.createdAt)}
                                                </span>

                                            </td>


                                            {/* ACTION */}

                                            <td className="application-actions">

                                                <button
                                                    className="view-application-button"
                                                    onClick={() =>
                                                        setSelectedApplication(app)
                                                    }
                                                >
                                                    View Details
                                                </button>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                )}

            </div>


            {/* =========================
                APPLICATION DETAILS MODAL
            ========================= */}

            {selectedApplication && (

                <div
                    className="application-modal-overlay"
                    onClick={() => setSelectedApplication(null)}
                >

                    <div
                        className="application-modal"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className="application-modal-header">

                            <div>

                                <span className="modal-eyebrow">
                                    APPLICATION DETAILS
                                </span>

                                <h2>
                                    {selectedApplication.job?.title || "Job Application"}
                                </h2>

                                <p>
                                    {selectedApplication.job?.company || "—"}
                                </p>

                            </div>


                            <button
                                className="modal-close-button"
                                onClick={() => setSelectedApplication(null)}
                            >
                                ×
                            </button>

                        </div>


                        <div className="application-modal-body">

                            {/* STATUS */}

                            <div className="modal-status-section">

                                <span className="modal-label">
                                    Application Status
                                </span>

                                <span
                                    className={`my-application-status ${getStatusClass(
                                        selectedApplication.status
                                    )}`}
                                >
                                    {selectedApplication.status || "Pending"}
                                </span>

                            </div>


                            {/* DETAILS */}

                            <div className="application-details-grid">

                                <div className="application-detail-item">

                                    <span>
                                        Applied On
                                    </span>

                                    <strong>
                                        {formatDate(
                                            selectedApplication.createdAt
                                        )}
                                    </strong>

                                </div>


                                <div className="application-detail-item">

                                    <span>
                                        Experience
                                    </span>

                                    <strong>
                                        {selectedApplication.experience || "—"}
                                    </strong>

                                </div>


                                <div className="application-detail-item">

                                    <span>
                                        Location
                                    </span>

                                    <strong>
                                        {selectedApplication.location || "—"}
                                    </strong>

                                </div>


                                <div className="application-detail-item">

                                    <span>
                                        Expected Salary
                                    </span>

                                    <strong>
                                        {selectedApplication.expectedSalary || "—"}
                                    </strong>

                                </div>

                            </div>


                            {/* SKILLS */}

                            {selectedApplication.skills && (

                                <div className="modal-section">

                                    <span className="modal-label">
                                        Skills
                                    </span>

                                    <div className="skills-list">

                                        {Array.isArray(
                                            selectedApplication.skills
                                        )
                                            ? selectedApplication.skills.map(
                                                (skill, index) => (
                                                    <span
                                                        className="skill-tag"
                                                        key={index}
                                                    >
                                                        {skill}
                                                    </span>
                                                )
                                            )
                                            : selectedApplication.skills
                                                .split(",")
                                                .filter(Boolean)
                                                .map((skill, index) => (
                                                    <span
                                                        className="skill-tag"
                                                        key={index}
                                                    >
                                                        {skill.trim()}
                                                    </span>
                                                ))}

                                    </div>

                                </div>

                            )}


                            {/* COVER LETTER */}

                            {selectedApplication.coverLetter && (

                                <div className="modal-section">

                                    <span className="modal-label">
                                        Cover Letter
                                    </span>

                                    <div className="cover-letter">
                                        {selectedApplication.coverLetter}
                                    </div>

                                </div>

                            )}

                        </div>


                        {/* FOOTER */}

                        <div className="application-modal-footer">

                            {selectedApplication.resume ? (

                                <a
    href={`http://localhost:5000/${selectedApplication.resume.replace(/\\/g, "/")}`}
    target="_blank"
    rel="noopener noreferrer"
    className="resume-button"
>
    View Resume
</a>

                            ) : (

                                <span className="no-resume">
                                    No resume uploaded
                                </span>

                            )}


                            <button
                                className="modal-close-footer-button"
                                onClick={() => setSelectedApplication(null)}
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default MyApplications;