import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getSavedJobs,
    removeSavedJob
} from "../services/savedJobService";
import "../styles/SavedJobs.css";
import {
    MapPin,
    IndianRupee,
    BriefcaseBusiness,
    Clock3,
    House,
    Heart,
    Eye,
    Trash2
} from "lucide-react";

function SavedJobs() {

    const navigate = useNavigate();

    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {
        fetchSavedJobs();
    }, []);

    const fetchSavedJobs = async () => {

    try {

        const response = await getSavedJobs();

        const jobs = response.data.savedJobs || [];

        // Remove saved-job records whose job no longer exists
        const validSavedJobs = jobs.filter(
            (item) => item.job
        );

        setSavedJobs(validSavedJobs);

    } catch (error) {

        console.log("Get saved jobs error:", error);

        setSavedJobs([]);

    }

};

    const handleRemove = async (jobId) => {

    try {

        await removeSavedJob(jobId);

        setSavedJobs((prev) =>
            prev.filter((item) => item.job?._id !== jobId)
        );

    } catch (error) {

        console.log("Remove saved job error:", error);

        alert(
            error.response?.data?.message ||
            "Failed to remove saved job."
        );

    }

};

    const getPostedTime = (date) => {

  const createdDate = new Date(date);

  const today = new Date();

  const difference =
    Math.floor(
      (today - createdDate) /
      (1000 * 60 * 60 * 24)
    );

  if (difference === 0)
    return "Today";

  if (difference === 1)
    return "1 day ago";

  if (difference < 30)
    return `${difference} days ago`;

  const months = Math.floor(
    difference / 30
  );

  if (months === 1)
    return "1 month ago";

  if (months < 12)
    return `${months} months ago`;

  const years = Math.floor(
    months / 12
  );

  return `${years} years ago`;

};

    return (


 <div className="saved-jobs-page">

            <div className="saved-jobs-container">

                {/* ===============================
                    HEADER
                =============================== */}

                <div className="saved-jobs-header">

                    <div>

                        <span className="saved-jobs-eyebrow">
                            CAREER DASHBOARD
                        </span>

                        <h1>
                            My Saved Jobs
                        </h1>

                        <p>
                            Manage all your bookmarked opportunities in one place.
                        </p>

                    </div>

                </div>


                {/* ===============================
                    EMPTY STATE
                =============================== */}

                {savedJobs.length === 0 ? (

                    <div className="saved-empty">

                        <div className="saved-empty-icon">
                            ♡
                        </div>

                        <h2>
                            No Saved Jobs
                        </h2>

                        <p>
                            You haven't saved any jobs yet.
                        </p>

                        <button
                            className="browse-saved-jobs-button"
                            onClick={() => navigate("/jobs")}
                        >
                            Browse Jobs
                        </button>

                    </div>

                ) : (

                    /* ===============================
                       SAVED JOBS GRID
                    =============================== */

                    <div className="saved-jobs-grid">

                        {savedJobs.map((item) => {

                           
                            return (

                                <div
                                    className="saved-job-card"
                                    key={item._id}
                                >

                                    {/* ===============================
                                        CARD HEADER
                                    =============================== */}

                                    <div className="saved-card-header">

                                        <div className="saved-company">

                                            <div className="saved-logo">

                                                {item.job.logo ? (

                                                    <img
                                                        src={`http://localhost:5000/${item.job.logo.replace(
                                                            /\\/g,
                                                            "/"
                                                        )}`}
                                                        alt={item.job.company}
                                                    />

                                                ) : (

                                                    <span>
                                                        {item.job.company?.charAt(0)}
                                                    </span>

                                                )}

                                            </div>

                                            <div>

                                                <h3>
                                                    {item.job.title}
                                                </h3>

                                                <p className="saved-company-name">
                                                    {item.job.company}
                                                </p>

                                            </div>

                                        </div>


                                        <span className="saved-job-badge">
                                            Saved
                                        </span>

                                    </div>


                                    {/* ===============================
                                        JOB INFORMATION
                                    =============================== */}

                                    <div className="saved-job-info">

    <p>
        <MapPin size={17} strokeWidth={2} />
        {item.job.location}
    </p>

    <p>
        <IndianRupee size={17} strokeWidth={2} />
        {item.job.salary}
    </p>

    <p>
        <BriefcaseBusiness size={17} strokeWidth={2} />
        {item.job.experience}
    </p>

    <p>
        <Clock3 size={17} strokeWidth={2} />
        {getPostedTime(item.job.createdAt)}
    </p>

    <span className="job-type-pill">
        {item.job.jobType}
    </span>

    <p>
        <House size={17} strokeWidth={2} />
        {item.job.workMode}
    </p>

</div>


                                    {/* ===============================
                                        ACTIONS
                                    =============================== */}

                                    <div className="saved-job-actions">

                                        <button
    className="saved-view-button"
    onClick={() =>
        navigate(
            `/jobs/${item.job._id}`,
            {
                state: {
                    from: "/saved-jobs"
                }
            }
        )
    }
>
    <Eye size={17} strokeWidth={2} />
    View Details
</button>

                                        <button
    className="saved-remove-button"
    onClick={() =>
        handleRemove(item.job._id)
    }
>
    <Trash2 size={17} strokeWidth={2} />
    Remove
</button>

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                )}

            </div>

        </div>

    );
}

export default SavedJobs;