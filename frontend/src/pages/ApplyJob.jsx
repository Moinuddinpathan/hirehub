import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { applyJob } from "../services/applicationService";
import { useEffect } from "react";
import "../styles/ApplyJob.css";
import { getJobById } from "../services/jobService";

function ApplyJob() {

    const navigate = useNavigate();


    const { id } = useParams();

    const [job, setJob] = useState(null);

    const [formData, setFormData] = useState({
        skills: "",
        experience: "",
        currentLocation: "",
        expectedSalary: "",
        linkedin: "",
        github: "",
        coverLetter: ""
    });



    const [resume, setResume] = useState(null);

    const [loading, setLoading] = useState(true);

    const [submitting, setSubmitting] = useState(false);

    // ==============================
    // FETCH JOB
    // ==============================

    useEffect(() => {

        const fetchJob = async () => {

            try {

                const response = await getJobById(id);

                setJob(response.data.job);

            } catch (error) {

                console.log("Failed to fetch job:", error);

            } finally {

                setLoading(false);

            }

        };

        fetchJob();

    }, [id]);



    // ==============================
    // HANDLE INPUT
    // ==============================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };


    // ==============================
    // HANDLE RESUME
    // ==============================

    const handleResumeChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (file.type !== "application/pdf") {
                alert("Please upload a PDF resume.");
                e.target.value = "";
                return;
            }

            setResume(file);
        }
    };



    // ==============================
    // SUBMIT APPLICATION
    // ==============================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!resume) {

            alert("Please upload your resume.");

            return;

        }

        try {

            setSubmitting(true);

            const data = new FormData();

            data.append("job", id);
            data.append("resume", resume);

            data.append("skills", formData.skills);
            data.append("experience", formData.experience);
            data.append("location", formData.currentLocation);
            data.append("expectedSalary", formData.expectedSalary);
            data.append("linkedIn", formData.linkedin);
            data.append("github", formData.github);
            data.append("coverLetter", formData.coverLetter);

           const response = await applyJob(data);

alert("Application submitted successfully!");

navigate("/applications", {
    state: {
        applicationSubmitted: true
    }
});


        } catch (error) {

            console.log("Application error:", error);

            alert(
                error.response?.data?.message ||
                "Failed to submit application."
            );

        } finally {

            setSubmitting(false);

        }

    };







    // ==============================
    // LOADING
    // ==============================

    if (loading) {

        return (
            <div className="apply-loading">
                <h2>Loading...</h2>
            </div>
        );

    }

    if (!job) {

        return (
            <div className="apply-loading">
                <h2>Job not found.</h2>
            </div>
        );

    }


    return (

        <div className="apply-job-page">

            <div className="apply-job-container">


                {/* =========================
                    BACK BUTTON
                ========================= */}

                <button
                    className="back-to-details-btn"
                    onClick={() => navigate(`/jobs/${id}`)}
                >
                    ← Back to Job Details
                </button>


                {/* =========================
                    MAIN CARD
                ========================= */}

                <div className="apply-job-card">


                    {/* =========================
                        HEADER
                    ========================= */}

                    <div className="apply-job-header">

                        <h1>
                            Apply Job
                        </h1>

                    </div>


                    {/* =========================
                        JOB INFORMATION
                    ========================= */}

                    <div className="apply-job-content">


                        <div className="apply-job-info">

                            <h2>
                                {job.title}
                            </h2>

                            <h3>
                                {job.company}
                            </h3>


                            <div className="apply-job-meta">

                                <span>
                                    <strong>Location:</strong>{" "}
                                    {job.location}
                                </span>

                                <span>
                                    <strong>Salary:</strong>{" "}
                                    {job.salary}
                                </span>

                                <span>
                                    <strong>Experience:</strong>{" "}
                                    {job.experience}
                                </span>

                            </div>

                        </div>


                        {/* =========================
                            APPLICATION FORM
                        ========================= */}

                        <form
                            className="application-form"
                            onSubmit={handleSubmit}
                        >


                            {/* RESUME */}

                            <div className="form-group">

                                <label>
                                    Upload Resume (PDF)
                                </label>

                                <input
                                    type="file"
                                    accept=".pdf,application/pdf"
                                    onChange={handleResumeChange}
                                    required
                                />

                                {resume && (

                                    <small className="file-name">
                                        Selected: {resume.name}
                                    </small>

                                )}

                            </div>


                            {/* SKILLS */}

                            <div className="form-group">

                                <label htmlFor="skills">
                                    Skills
                                </label>

                                <input
                                    type="text"
                                    id="skills"
                                    name="skills"
                                    value={formData.skills}
                                    onChange={handleChange}
                                    placeholder="React, Node.js, MongoDB"
                                    required
                                />

                            </div>


                            {/* EXPERIENCE */}

                            <div className="form-group">

                                <label htmlFor="experience">
                                    Experience
                                </label>

                                <select
                                    id="experience"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select Experience
                                    </option>

                                    <option value="Fresher">
                                        Fresher
                                    </option>

                                    <option value="0-1 years">
                                        0-1 years
                                    </option>

                                    <option value="1-2 years">
                                        1-2 years
                                    </option>

                                    <option value="2-3 years">
                                        2-3 years
                                    </option>

                                    <option value="3-5 years">
                                        3-5 years
                                    </option>

                                    <option value="5+ years">
                                        5+ years
                                    </option>

                                </select>

                            </div>


                            {/* CURRENT LOCATION */}

                            <div className="form-group">

                                <label htmlFor="currentLocation">
                                    Current Location
                                </label>

                                <input
                                    type="text"
                                    id="currentLocation"
                                    name="currentLocation"
                                    value={formData.currentLocation}
                                    onChange={handleChange}
                                    placeholder="Mumbai"
                                    required
                                />

                            </div>


                            {/* EXPECTED SALARY */}

                            <div className="form-group">

                                <label htmlFor="expectedSalary">
                                    Expected Salary
                                </label>

                                <input
                                    type="number"
                                    id="expectedSalary"
                                    name="expectedSalary"
                                    value={formData.expectedSalary}
                                    onChange={handleChange}
                                    placeholder="500000"
                                    required
                                />

                            </div>


                            {/* LINKEDIN */}

                            <div className="form-group">

                                <label htmlFor="linkedin">
                                    LinkedIn
                                </label>

                                <input
                                    type="url"
                                    id="linkedin"
                                    name="linkedin"
                                    value={formData.linkedin}
                                    onChange={handleChange}
                                    placeholder="https://linkedin.com/in/username"
                                />

                            </div>


                            {/* GITHUB */}

                            <div className="form-group">

                                <label htmlFor="github">
                                    GitHub
                                </label>

                                <input
                                    type="url"
                                    id="github"
                                    name="github"
                                    value={formData.github}
                                    onChange={handleChange}
                                    placeholder="https://github.com/username"
                                />

                            </div>


                            {/* COVER LETTER */}

                            <div className="form-group">

                                <label htmlFor="coverLetter">
                                    Cover Letter
                                </label>

                                <textarea
                                    id="coverLetter"
                                    name="coverLetter"
                                    value={formData.coverLetter}
                                    onChange={handleChange}
                                    placeholder="Tell us why you are a good fit for this role..."
                                    rows="6"
                                />

                            </div>


                            {/* SUBMIT */}

                            <button
                                type="submit"
                                className="apply-submit-button"
                                disabled={submitting}
                            >

                                {submitting
                                    ? "Submitting..."
                                    : "Apply Now"
                                }

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    );

}






export default ApplyJob