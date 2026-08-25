import { useState, useEffect, useRef } from "react";

import {
  getProfile,
  logoutUser,
  uploadResume,
} from "../services/authService";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  User,
  Mail,
  FileText,
  Upload,
  LogOut,
  ShieldCheck,
  Eye,
  RefreshCw,
  Code2,
  ExternalLink,
  Briefcase,
  MapPin,
  GraduationCap,
} from "lucide-react";

import "../styles/Profile.css";

function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const resumeInputRef = useRef(null);

  /* =========================================================
     STATE
  ========================================================= */

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    headline: "",
    skills: [],
    education: "",
    experience: "",
    bio: "",
    linkedin: "",
    github: "",
    role: "user",
    resume: "",
  });

  /* =========================================================
     FETCH PROFILE
  ========================================================= */

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const response = await getProfile();

      console.log("PROFILE RESPONSE:", response);

      const profileUser = response?.user || {};

      setUser({
        name: profileUser.name || "",
        email: profileUser.email || "",
        phone: profileUser.phone || "",
        location: profileUser.location || "",
        headline: profileUser.headline || "",

        skills: Array.isArray(profileUser.skills)
          ? profileUser.skills
          : [],

        education: profileUser.education || "",
        experience: profileUser.experience || "",
        bio: profileUser.bio || "",
        linkedin: profileUser.linkedin || "",
        github: profileUser.github || "",
        role: profileUser.role || "user",
        resume: profileUser.resume || "",
      });
    } catch (error) {
      console.error("Profile error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.log("Logout API error:", error);
    } finally {
      logout();
      navigate("/");
    }
  };

  /* =========================================================
     RESUME SELECT
  ========================================================= */

  const handleResumeChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.type !== "application/pdf") {
      alert("Please select a PDF resume.");
      event.target.value = "";
      return;
    }

    setResume(file);
  };

  /* =========================================================
     UPLOAD RESUME
  ========================================================= */

  const handleUpload = async () => {
    if (!resume) {
      alert("Please select a resume first.");
      return;
    }

    try {
      const response = await uploadResume(resume);

      console.log(
        "RESUME UPLOAD RESPONSE:",
        response.data
      );

      if (response.data?.success) {
        setUser((previousUser) => ({
          ...previousUser,
          resume: response.data.resume,
        }));

        setResume(null);

        if (resumeInputRef.current) {
          resumeInputRef.current.value = "";
        }

        alert("Resume uploaded successfully!");
      }
    } catch (error) {
      console.error("Resume upload error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to upload resume"
      );
    }
  };

  /* =========================================================
     VIEW RESUME
  ========================================================= */

  const handleViewResume = () => {
    if (!user.resume) {
      return;
    }

    const resumeUrl = user.resume.startsWith("http")
      ? user.resume
      : `http://localhost:5000${user.resume}`;

    window.open(
      resumeUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* =========================================================
     REPLACE RESUME
  ========================================================= */

  const handleReplaceResume = () => {
    if (resumeInputRef.current) {
      resumeInputRef.current.click();
    }
  };

  /* =========================================================
     REPLACE FILE
  ========================================================= */

  const handleReplaceFile = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.type !== "application/pdf") {
      alert("Please select a PDF resume.");
      event.target.value = "";
      return;
    }

    try {
      const response = await uploadResume(file);

      console.log(
        "REPLACE RESUME RESPONSE:",
        response.data
      );

      if (response.data?.success) {
        setUser((previousUser) => ({
          ...previousUser,
          resume: response.data.resume,
        }));

        setResume(null);

        if (resumeInputRef.current) {
          resumeInputRef.current.value = "";
        }

        alert("Resume replaced successfully!");
      }
    } catch (error) {
      console.error(
        "Replace resume error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to replace resume"
      );
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-loading">
          <div className="profile-loading-spinner"></div>

          <h3>
            Loading your profile...
          </h3>

          <p>
            Please wait while we load your information.
          </p>
        </div>
      </div>
    );
  }

  /* =========================================================
     PROFILE PAGE
  ========================================================= */

  return (
    <div className="profile-page">

      {/* =====================================================
          PROFILE HEADER
      ===================================================== */}

      <div className="profile-header-card">

        <div className="profile-header-left">

          <div className="profile-avatar">
  {user?.name
    ? user.name.trim().charAt(0).toUpperCase()
    : "U"}
</div>

          <div className="profile-header-info">

            <h1>
              {user.name || "User"}
            </h1>

            <p>
              {user.email || "No email available"}
            </p>

            <span className="profile-role">
              <ShieldCheck size={14} />

              {user.role === "admin"
                ? "Administrator"
                : "Job Seeker"}
            </span>

          </div>

        </div>

      </div>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="profile-content">


        {/* ===================================================
            LEFT COLUMN
        =================================================== */}

        <div className="profile-column">


          {/* =================================================
              PERSONAL INFORMATION
          ================================================= */}

          <div className="profile-card">

            <div className="profile-card-header">

              <div className="profile-card-title">

                <div className="profile-section-icon">
                  <User size={18} />
                </div>

                <div>

                  <h2>
                    Personal Information
                  </h2>

                  <p>
                    Your account information
                  </p>

                </div>

              </div>

            </div>


            {/* NAME */}

            <div className="profile-info-group">

              <span className="profile-info-label">
                <User size={14} />
                Full Name
              </span>

              <div className="profile-info-value">
                {user.name || "Not available"}
              </div>

            </div>


            {/* EMAIL */}

            <div className="profile-info-group">

              <span className="profile-info-label">
                <Mail size={14} />
                Email Address
              </span>

              <div className="profile-info-value">
                {user.email || "Not available"}
              </div>

            </div>


            {/* PHONE */}

            <div className="profile-info-group">

              <span className="profile-info-label">
                Phone Number
              </span>

              <div className="profile-info-value">
                {user.phone || "Not added"}
              </div>

            </div>

          </div>


          {/* =================================================
              PROFESSIONAL LINKS
          ================================================= */}

          <div className="profile-card">

            <div className="profile-card-header">

              <div className="profile-card-title">

                <div className="profile-section-icon">
                  <Code2 size={18} />
                </div>

                <div>

                  <h2>
                    Professional Links
                  </h2>

                  <p>
                    Your professional profiles
                  </p>

                </div>

              </div>

            </div>


            <div className="profile-links">

              {user.linkedin && (
                <a
                  href={user.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="profile-link"
                >
                  <ExternalLink size={17} />

                  <span>
                    LinkedIn
                  </span>

                  <ExternalLink size={14} />
                </a>
              )}


              {user.github && (
                <a
                  href={user.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="profile-link"
                >
                  <ExternalLink size={17} />

                  <span>
                    GitHub
                  </span>
                </a>
              )}


              {!user.linkedin &&
                !user.github && (
                  <div className="profile-empty">
                    No professional links added yet.
                  </div>
                )}

            </div>

          </div>


          {/* =================================================
              RESUME
              
              IMPORTANT:
              Resume is now inside LEFT COLUMN.
              This removes the empty space on the left.
          ================================================= */}

          <div className="profile-card resume-card">

            <div className="profile-card-header">

              <div className="profile-card-title">

                <div className="profile-section-icon">
                  <FileText size={18} />
                </div>

                <div>

                  <h2>
                    Resume
                  </h2>

                  <p>
                    Keep your resume updated
                    for job applications
                  </p>

                </div>

              </div>

            </div>


            <div className="resume-box">

              {/* Hidden file input */}

              <input
                ref={resumeInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleReplaceFile}
                style={{
                  display: "none",
                }}
              />


              <div className="resume-icon">
                <FileText size={25} />
              </div>


              {user.resume ? (
                <>

                  <h3>
                    Resume uploaded
                  </h3>

                  <p>
                    Your resume is ready to use
                    for job applications.
                  </p>


                  <div className="resume-file-name">

                    <FileText size={18} />

                    <span>
                      {user.resume
                        .split("/")
                        .pop()}
                    </span>

                  </div>


                  <div className="profile-actions">

                    <button
                      type="button"
                      className="profile-btn profile-btn-primary"
                      onClick={handleViewResume}
                    >
                      <Eye size={16} />
                      View Resume
                    </button>


                    <button
                      type="button"
                      className="profile-btn profile-btn-secondary"
                      onClick={handleReplaceResume}
                    >
                      <RefreshCw size={16} />
                      Replace Resume
                    </button>

                  </div>

                </>
              ) : (
                <>

                  <h3>
                    No resume uploaded
                  </h3>

                  <p>
                    Upload a PDF resume to apply
                    for jobs more easily.
                  </p>


                  <div className="resume-upload">

                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handleResumeChange}
                    />

                  </div>


                  {resume && (
                    <div className="selected-resume">

                      <Upload size={15} />

                      <span>
                        {resume.name}
                      </span>

                    </div>
                  )}


                  <div className="profile-actions">

                    <button
                      type="button"
                      className="profile-btn profile-btn-success"
                      onClick={handleUpload}
                    >
                      <Upload size={16} />
                      Upload Resume
                    </button>

                  </div>

                </>
              )}

            </div>

          </div>

        </div>


        {/* ===================================================
            RIGHT COLUMN
        =================================================== */}

        <div className="profile-column">


          {/* =================================================
              PROFESSIONAL INFORMATION
          ================================================= */}

          <div className="profile-card">

            <div className="profile-card-header">

              <div className="profile-card-title">

                <div className="profile-section-icon">
                  <Briefcase size={18} />
                </div>

                <div>

                  <h2>
                    Professional Information
                  </h2>

                  <p>
                    Your professional background
                    and career information
                  </p>

                </div>

              </div>

            </div>


            {/* HEADLINE */}

            <div className="profile-info-group">

              <span className="profile-info-label">
                Professional Headline
              </span>

              <div className="profile-info-value">
                {user.headline || "Not added"}
              </div>

            </div>


            {/* LOCATION */}

            <div className="profile-info-group">

              <span className="profile-info-label">

                <MapPin size={14} />

                Location

              </span>

              <div className="profile-info-value">
                {user.location || "Not added"}
              </div>

            </div>


            {/* EXPERIENCE */}

            <div className="profile-info-group">

              <span className="profile-info-label">
                Experience
              </span>

              <div className="profile-info-value">
                {user.experience || "Not added"}
              </div>

            </div>


            {/* EDUCATION */}

            <div className="profile-info-group">

              <span className="profile-info-label">

                <GraduationCap size={14} />

                Education

              </span>

              <div className="profile-info-value">
                {user.education || "Not added"}
              </div>

            </div>


            {/* SKILLS */}

            <div className="profile-info-group">

              <span className="profile-info-label">

                <Code2 size={14} />

                Skills

              </span>


              <div className="profile-skills">

                {user.skills?.length > 0 ? (
                  user.skills.map(
                    (skill, index) => (
                      <span
                        className="skill-tag"
                        key={index}
                      >
                        {skill}
                      </span>
                    )
                  )
                ) : (
                  <div className="profile-empty">
                    No skills added.
                  </div>
                )}

              </div>

            </div>


            {/* ABOUT */}

            <div className="profile-info-group">

              <span className="profile-info-label">
                About Me
              </span>

              <div className="profile-bio">
                {user.bio ||
                  "No biography added."}
              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          LOGOUT
      ===================================================== */}

      <div className="profile-footer">

        <button
          type="button"
          className="profile-btn profile-btn-danger"
          onClick={handleLogout}
        >

          <LogOut size={16} />

          Logout

        </button>

      </div>

    </div>
  );
}

export default Profile;