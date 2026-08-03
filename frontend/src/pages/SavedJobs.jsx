import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSavedJobs } from "../services/savedJobService";
import "../styles/SavedJobs.css";

function SavedJobs() {

    const navigate = useNavigate();

    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {
        fetchSavedJobs();
    }, []);

    const fetchSavedJobs = async () => {

        try {

            const response = await getSavedJobs();

            setSavedJobs(response.data.savedJobs);

        } catch (error) {

            console.log(error);

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

<div className="saved-header">

    {/* <h1>My Saved Jobs</h1> */}

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

{savedJobs.length === 0 ? (

<div className="saved-empty">

<h2>No Saved Jobs</h2>

<p>

You haven't saved any jobs yet.

</p>

</div>

) : (

<div className="saved-jobs-grid">

{savedJobs.map((item) => (

<div
    className="saved-job-card"
    key={item._id}
>

    <div className="saved-card-header">

        <div className="saved-company">

            <div className="saved-logo">

                {item.job.logo ? (

                    <img
                        src={`http://localhost:5000/${item.job.logo.replace(/\\/g, "/")}`}
                        alt={item.job.company}
                    />

                ) : (

                    <span>
                        {item.job.company.charAt(0)}
                    </span>

                )}

            </div>

           <div>

<h3>{item.job.title}</h3>

<p className="saved-company-name">

{item.job.company}

</p>
</div>  

        </div>

        <span className="saved-job-badge">

            Saved

        </span>

    </div>


    <div className="saved-job-info">

        <p>📍 {item.job.location}</p>

        <p>💰 {item.job.salary}</p>

        <p>💼 {item.job.experience}</p>

        <p>🕒 {getPostedTime(item.job.createdAt)} </p>

        <span className="job-type-pill">

{item.job.jobType}

</span>

        <p>🏠 {item.job.workMode}</p>

       

    </div>


    <div className="saved-job-actions">

        <button
            className="saved-view-button"
            onClick={() =>
                navigate(`/jobs/${item.job._id}`)
            }
        >
            View Details
        </button>

        <button
            className="saved-remove-button"
        >
            Remove
        </button>

    </div>

</div>

))}

</div>

)}

</div>

</div>

);


}

export default SavedJobs;