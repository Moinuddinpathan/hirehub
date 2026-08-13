import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/JobDetails.css";
import { getJobById, getSimilarJobs } from "../services/jobService";
import { saveJob, removeSavedJob, getSavedJobs, } from "../services/savedJobService";

import {
    ArrowLeft,
    MapPin,
    IndianRupee,
    BriefcaseBusiness,
    Building2,
    House,
    CheckCircle2,
    CalendarDays,
    Clock3,
    Heart,
    Share2,
    Bookmark
} from "lucide-react";

function JobDetails() {

    
const navigate = useNavigate();

const location = useLocation();

    const { id } = useParams()

    // const { id } = useParams();
  

    const [job, setJob] = useState(null);

    const [similarJobs, setSimilarJobs] = useState([]);

    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetchJob();

        fetchSimilarJobs();

        checkSavedJob();
    }, [id])

    const fetchJob = async () => {
        try {
            const response = await getJobById(id);

            setJob(response.data.job);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchSimilarJobs = async () => {
        try {
            const response = await getSimilarJobs(id);

            const filteredJobs = response.data.jobs.filter(
                (item) => item._id !== id
            );

            setSimilarJobs(filteredJobs);

        } catch (error) {
            console.log("Failed to fetch similar jobs:", error);
        }
    };


    const checkSavedJob = async () => {

        try {

            const response = await getSavedJobs();

            const savedJobs = response.data.savedJobs || [];

            const alreadySaved = savedJobs.some(
                (savedJob) => savedJob?.job?._id === id
            );

            setSaved(alreadySaved);

        } catch (error) {

            console.log(error);

        }

    };



    const handleSaveJob = async () => {

        try {

            if (!saved) {

                await saveJob(job._id);

                setSaved(true);

                alert("Job saved successfully.");

            } else {

                await removeSavedJob(job._id);

                setSaved(false);

                alert("Job removed from saved jobs.");

            }

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Something went wrong."
            );

        }

    };



    if (!job) {
        return <h2 className="text-center mt-5">Loading...</h2>;
    }

    const logoUrl = job.logo
        ? `http://localhost:5000/${job.logo.replace(/\\/g, "/")}`
        : null;

    const handleShare = async () => {

        const shareData = {

            title: job.title,

            text: `Check out this job at ${job.company}`,

            url: window.location.href,

        };

        try {

            if (navigator.share) {

                await navigator.share(shareData);

            } else {

                await navigator.clipboard.writeText(
                    window.location.href
                );

                alert("Job link copied to clipboard.");

            }

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <>

            <div className="job-details-page">

                <div className="job-details-container">

                    <button
    className="back-to-jobs-btn"
    onClick={() => {
        if (location.state?.from) {
            navigate(location.state.from);
        } else {
            navigate("/jobs");
        }
    }}
>
    <ArrowLeft size={17} strokeWidth={2} />
    <span>Back to Jobs</span>
</button>


                    <div className="job-hero">






                        <div className="job-hero-card">

                            <div className="job-company-logo">

                                {logoUrl ? (

                                    <img
                                        src={logoUrl}
                                        alt={job.company}
                                    />

                                ) : (

                                    <span>
                                        {job.company?.charAt(0)}
                                    </span>

                                )}

                            </div>


                            <div className="job-hero-content">

                                <span className="company-name">

                                    {job.company}

                                </span>

                                <h1>

                                    {job.title}

                                </h1>


                               <div className="verified-company">

    <CheckCircle2
        size={18}
        strokeWidth={2}
    />

    <span>Verified Employer</span>

</div>


                                <div className="job-meta">

    <span>
        <MapPin size={17} strokeWidth={2} />
        {job.location}
    </span>

    <span>
        <IndianRupee size={17} strokeWidth={2} />
        {job.salary}
    </span>

    <span>
        <BriefcaseBusiness size={17} strokeWidth={2} />
        {job.experience}
    </span>

</div>


                                <div className="job-badges">

                                    <span className="badge-blue">

                                        {job.jobType}

                                    </span>

                                    <span className="badge-green">

                                        {job.workMode}

                                    </span>

                                </div>


                                <div className="job-footer-info">

    <span>
        <Clock3 size={16} strokeWidth={2} />
        Posted Recently
    </span>

    <span className="job-footer-separator">
        •
    </span>

    <span>
        <CalendarDays size={16} strokeWidth={2} />

        Apply before
        {" "}

        {job.lastDate
            ? new Date(
                job.lastDate
            ).toLocaleDateString()
            : "N/A"}
    </span>

</div>

                            </div>

                        </div>

                    </div>


                    <div className="job-details-grid">

                        {/* ==============================
        LEFT SIDE - MAIN CONTENT
    ============================== */}

                        <div className="job-main-content">

                            {/* About this Job */}
                            <section className="job-section">

                                <h2>About this Job</h2>

                                <p>
                                    {job.description}
                                </p>

                            </section>


                            {/* Responsibilities */}
                            {job.responsibilities &&
                                (Array.isArray(job.responsibilities)
                                    ? job.responsibilities.length > 0
                                    : job.responsibilities.trim()
                                ) && (

                                    <section className="job-section">

                                        <h2>Responsibilities</h2>

                                        <ul className="job-list">

                                            {Array.isArray(job.responsibilities)
                                                ? job.responsibilities
                                                    .filter(
                                                        (item) =>
                                                            item &&
                                                            item.trim()
                                                    )
                                                    .map((item, index) => (

                                                        <li key={index}>
                                                            {item}
                                                        </li>

                                                    ))

                                                : job.responsibilities
                                                    .split("\n")
                                                    .filter(
                                                        (item) =>
                                                            item.trim()
                                                    )
                                                    .map((item, index) => (

                                                        <li key={index}>
                                                            {item.trim()}
                                                        </li>

                                                    ))
                                            }

                                        </ul>

                                    </section>
                                )
                            }


                            {/* Required Skills */}
                            {Array.isArray(job.skills) &&
                                job.skills.length > 0 && (

                                    <section className="job-section">

                                        <h2>Required Skills</h2>

                                        <div className="skills-list">

                                            {job.skills
                                                .filter(
                                                    (skill) =>
                                                        skill &&
                                                        skill.trim()
                                                )
                                                .map((skill, index) => (

                                                    <span
                                                        key={index}
                                                        className="skill-chip"
                                                    >
                                                        {skill}
                                                    </span>

                                                ))
                                            }

                                        </div>

                                    </section>
                                )
                            }


                            {/* Employee Benefits */}
                            {Array.isArray(job.benefits) &&
                                job.benefits.filter(
                                    (benefit) =>
                                        benefit &&
                                        benefit.trim()
                                ).length > 0 && (

                                    <section className="job-section">

                                        <h2>Employee Benefits</h2>

                                        <div className="benefits-grid">

                                            {job.benefits
                                                .filter(
                                                    (benefit) =>
                                                        benefit &&
                                                        benefit.trim()
                                                )
                                                .map((benefit, index) => (

                                                    <div
    className="benefit-item"
    key={index}
>
    <CheckCircle2
        size={18}
        strokeWidth={2}
    />

    <span>
        {benefit}
    </span>
</div>

                                                ))
                                            }

                                        </div>

                                    </section>
                                )
                            }


                            {/* Application Deadline */}
                            {job.lastDate && (

                                <section className="job-section application-deadline-section">

                                    <h2>Application Deadline</h2>

                                    <p>
                                        {new Date(
                                            job.lastDate
                                        ).toLocaleDateString()}
                                    </p>

                                </section>

                            )}


                            {/* ===========================
    SIMILAR JOBS
=========================== */}

                            {similarJobs.length > 0 && (

                                <section className="similar-jobs">

                                    <h2>Similar Jobs</h2>

                                    <div className="similar-jobs-grid">

                                        {similarJobs.map((item) => (

                                            <div
                                                key={item._id}
                                                className="similar-job-card"
                                            >

                                                <h3>{item.title}</h3>

                                                <p>{item.company}</p>

                                                <span className="similar-job-location">
    <MapPin size={16} strokeWidth={2} />
    {item.location}
</span>

                                                <button
                                                    onClick={() =>
                                                        navigate(`/jobs/${item._id}`)
                                                    }
                                                >
                                                    View Details
                                                </button>

                                            </div>

                                        ))}

                                    </div>

                                </section>

                            )}

                        </div>


                        {/* ==============================
        RIGHT SIDE - SIDEBAR
    ============================== */}

                        <aside className="job-sidebar">

                            {/* Apply Card */}
                            <div className="apply-card">

                                <h3>
                                    {job.company}
                                </h3>

                                <h2>
                                    {job.title}
                                </h2>

                                <div className="apply-info">

    <p>
        <MapPin size={17} strokeWidth={2} />
        {job.location}
    </p>

    <p>
        <IndianRupee size={17} strokeWidth={2} />
        {job.salary}
    </p>

    <p>
        <BriefcaseBusiness size={17} strokeWidth={2} />
        {job.experience}
    </p>

    <p>
        <Building2 size={17} strokeWidth={2} />
        {job.jobType}
    </p>

    <p>
        <House size={17} strokeWidth={2} />
        {job.workMode}
    </p>

</div>

                                <button
                                    className="apply-button"
                                    onClick={() =>
                                        navigate(`/apply/${job._id}`)
                                    }
                                >
                                    Apply Now
                                </button>

                                <button
    className="save-button"
    onClick={handleSaveJob}
>
    {saved ? (
        <>
            <Heart
                size={17}
                fill="currentColor"
                strokeWidth={2}
            />
            Saved
        </>
    ) : (
        <>
            <Bookmark
                size={17}
                strokeWidth={2}
            />
            Save Job
        </>
    )}
</button>
                                <button
    className="share-button"
    onClick={handleShare}
>
    <Share2
        size={17}
        strokeWidth={2}
    />

    Share Job
</button>

                            </div>


                            {/* About Company */}
                            <div className="company-card">

                                <h3>
                                    About Company
                                </h3>

                                <div className="company-card-logo">

                                    {logoUrl ? (

                                        <img
                                            src={logoUrl}
                                            alt={job.company}
                                        />

                                    ) : (

                                        <span>
                                            {job.company?.charAt(0)}
                                        </span>

                                    )}

                                </div>

                                <h4>
                                    {job.company}
                                </h4>

                                <p className="company-industry">
                                    Technology Company
                                </p>

                                <div className="company-details">

                                    <div>
                                        <strong>
                                            Industry
                                        </strong>

                                        <span>
                                            Software & IT
                                        </span>
                                    </div>


                                    <div>
                                        <strong>
                                            Company Size
                                        </strong>

                                        <span>
                                            10,000+ Employees
                                        </span>
                                    </div>


                                    <div>
                                        <strong>
                                            Founded
                                        </strong>

                                        <span>
                                            1998
                                        </span>
                                    </div>


                                    <div>
                                        <strong>
                                            Headquarters
                                        </strong>

                                        <span>
                                            {job.location}
                                        </span>
                                    </div>

                                </div>

                            </div>

                        </aside>

                    </div>

                </div>
            </div>
        </>
    )
}




export default JobDetails