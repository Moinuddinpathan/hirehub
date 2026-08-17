import { useState, useEffect, useRef } from "react";
import { getProfile, logoutUser, uploadResume, } from "../services/authService"
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
} from "lucide-react";

import "../styles/Profile.css";

function Profile() {


  const navigate = useNavigate();
  const { logout } = useAuth();
  
const [resume, setResume] = useState(null);

const resumeInputRef = useRef(null);

const [user, setUser] = useState({
  name:"",
  email:"",
 phone: "",
    role: "user",
    resume: "",
})
  

const [loading, setLoading] = useState(true);

useEffect(()=>{
  fetchProfile();
}, [])


const fetchProfile = async () => {

    try {

      setLoading(true);

      const response = await getProfile();

      console.log("PROFILE RESPONSE:", response);

      setUser({
        name: response.user?.name || "",
        email: response.user?.email || "",
        phone: response.user?.phone || "",
        role: response.user?.role || "user",
        resume: response.user?.resume || "",
      });

    } catch (error) {

      console.error(
        "Profile error:",
        error
      );

    } finally {

      setLoading(false);

    }
  };

    // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = async () => {

    try {

      await logoutUser();

    } catch (error) {

      console.log(
        "Logout API error:",
        error
      );

    } finally {

      logout();

      navigate("/");
    }
  };


  // =========================================
  // RESUME SELECT
  // =========================================

  const handleResumeChange = (e) => {

    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.type !== "application/pdf") {

      alert(
        "Please select a PDF resume."
      );

      e.target.value = "";

      return;
    }

    setResume(file);
  };


  // =========================================
  // TEMPORARY RESUME UPLOAD
  // =========================================

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

    if (response.data.success) {

      // Update profile immediately
      setUser((previousUser) => ({
        ...previousUser,
        resume: response.data.resume,
      }));

      // Remove selected file from React state
      setResume(null);

      // Reset browser file input
      if (resumeInputRef.current) {
        resumeInputRef.current.value = "";
      }

      alert("Resume uploaded successfully!");
    }

  } catch (error) {

    console.error(
      "Resume upload error:",
      error
    );

    alert(
      error.response?.data?.message ||
      "Failed to upload resume"
    );
  }
};

const handleViewResume = () => {

  if (!user.resume) {
    return;
  }

  const resumeUrl =
    `http://localhost:5000${user.resume}`;

  window.open(
    resumeUrl,
    "_blank"
  );
};


const handleReplaceResume = () => {

  if (resumeInputRef.current) {
    resumeInputRef.current.click();
  }
};


const handleReplaceFile = async (e) => {
  const file = e.target.files?.[0];

  if (!file) {
    return;
  }

  // Check PDF
  if (file.type !== "application/pdf") {
    alert("Please select a PDF resume.");

    e.target.value = "";

    return;
  }

  try {

    // Show selected file in state
    setResume(file);

    // Upload replacement immediately
    const response = await uploadResume(file);

    console.log(
      "REPLACE RESUME RESPONSE:",
      response.data
    );

    if (response.data.success) {

      // Update profile with new resume
      setUser((previousUser) => ({
        ...previousUser,
        resume: response.data.resume,
      }));

      // Clear selected file
      setResume(null);

      // Reset input
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


  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (
      <div className="profile-page">

        <div className="profile-card">

          <h3>
            Loading your profile...
          </h3>

        </div>

      </div>
    );
  }

    return(
         <div className="profile-page">

      {/* =====================================
          PROFILE HEADER
      ====================================== */}

      <div className="profile-header-card">

        <div className="profile-header-left">

          <div className="profile-avatar">

            {user.name
              ?.charAt(0)
              .toUpperCase() || "U"}

          </div>


          <div className="profile-header-info">

            <h1>
              {user.name || "User"}
            </h1>

            <p>
              {user.email}
            </p>

            <span className="profile-role">

              <ShieldCheck
                size={14}
                style={{
                  marginRight: "5px",
                  verticalAlign: "middle",
                }}
              />

              {user.role === "admin"
                ? "Administrator"
                : "Job Seeker"}

            </span>

          </div>

        </div>

      </div>


      {/* =====================================
          CONTENT
      ====================================== */}

      <div className="profile-content">


        {/* ===================================
            PERSONAL INFORMATION
        ==================================== */}

        <div className="profile-card">

          <div className="profile-card-header">

            <h2>
              Personal Information
            </h2>

            <p>
              Your account information
            </p>

          </div>


          {/* NAME */}

          <div className="profile-info-group">

            <span className="profile-info-label">

              <User
                size={14}
                style={{
                  marginRight: "6px",
                  verticalAlign: "middle",
                }}
              />

              Full Name

            </span>

            <div className="profile-info-value">

              {user.name || "Not available"}

            </div>

          </div>


          {/* EMAIL */}

          <div className="profile-info-group">

            <span className="profile-info-label">

              <Mail
                size={14}
                style={{
                  marginRight: "6px",
                  verticalAlign: "middle",
                }}
              />

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


        {/* ===================================
            RESUME
        ==================================== */}

        <div className="profile-card resume-card">

          <div className="profile-card-header">

            <h2>
              Resume
            </h2>

            <p>
              Keep your resume updated for job applications.
            </p>

          </div>


          <div className="resume-box">
<input
    ref={resumeInputRef}
    type="file"
    accept=".pdf,application/pdf"
    onChange={handleReplaceFile}
    style={{ display: "none" }}
  />

  <div className="resume-icon">
    <FileText size={24} />
  </div>

  {user.resume ? (

    <>
      {/* ==============================
          RESUME EXISTS
      =============================== */}

      <h3>
        Resume uploaded
      </h3>

      <p>
        Your resume is ready to use for job applications.
      </p>


      <div className="resume-file-name">

        <FileText size={18} />

        <span>
          {user.resume.split("/").pop()}
        </span>

      </div>


      <div className="profile-actions">

        <button
          className="profile-btn profile-btn-primary"
          onClick={handleViewResume}
        >

          <Eye
            size={16}
            style={{
              marginRight: "6px",
              verticalAlign: "middle",
            }}
          />

          View Resume

        </button>


        <button
          className="profile-btn profile-btn-secondary"
          onClick={handleReplaceResume}
        >

          <RefreshCw
            size={16}
            style={{
              marginRight: "6px",
              verticalAlign: "middle",
            }}
          />

          Replace Resume

        </button>

      </div>

    </>

  ) : (

    <>
      {/* ==============================
          NO RESUME
      =============================== */}

      <h3>
        No resume uploaded
      </h3>

      <p>
        Upload a PDF resume to apply for jobs more easily.
      </p>


      <div className="resume-upload">

  <input
    type="file"
    accept=".pdf,application/pdf"
    onChange={handleResumeChange}
  />

</div>


      {resume && (

        <p
          style={{
            marginTop: "12px",
            marginBottom: 0,
            color: "#2563eb",
            fontWeight: 600,
          }}
        >

          <Upload
            size={15}
            style={{
              marginRight: "6px",
              verticalAlign: "middle",
            }}
          />

          {resume.name}

        </p>

      )}


      <div className="profile-actions">

        <button
          className="profile-btn profile-btn-success"
          onClick={handleUpload}
        >

          <Upload
            size={16}
            style={{
              marginRight: "6px",
              verticalAlign: "middle",
            }}
          />

          Upload Resume

        </button>

      </div>

    </>

  )}

</div>

        </div>

      </div>


     

      {/* =====================================
          LOGOUT
      ====================================== */}

      <div
        style={{
          maxWidth: "1100px",
          margin: "20px auto 0",
        }}
      >

        <button
          className="profile-btn profile-btn-danger"
          onClick={handleLogout}
        >

          <LogOut
            size={16}
            style={{
              marginRight: "6px",
              verticalAlign: "middle",
            }}
          />

          Logout

        </button>

      </div>

    </div>
  );
}



export default Profile