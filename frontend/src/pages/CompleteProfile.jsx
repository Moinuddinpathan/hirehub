import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../services/authService";
import "../styles/CompleteProfile.css";

function CompleteProfile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    location: "",
    headline: "",
    skills: "",
    education: "",
    experience: "",
    bio: "",
    linkedin: "",
    github: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.phone || !formData.location) {
    alert("Please enter your phone number and location.");
    return;
  }

  try {
    setLoading(true);

    const response = await updateProfile(formData);

    console.log("PROFILE UPDATED:", response);

    if (response.data.success) {
      alert("Profile completed successfully!");
      navigate("/profile");
    } else {
      alert(
        response.data.message ||
        "Failed to update profile"
      );
    }

  } catch (error) {
    console.error("Profile update error:", error);

    alert(
      error.response?.data?.message ||
      "Failed to update profile"
    );

  } finally {
    setLoading(false);
  }
};

  return (
    <div className="complete-profile-page">

      <div className="profile-header">
        <span>PROFILE SETUP</span>

        <h1>Complete Your Profile</h1>

        <p>
          Add your professional details to help employers understand
          your skills and experience.
        </p>
      </div>

      <form
        className="profile-form"
        onSubmit={handleSubmit}
      >

        {/* PERSONAL INFORMATION */}

        <section className="profile-section">

          <div className="section-heading">
            <div className="section-number">01</div>

            <div>
              <h2>Personal Information</h2>
              <p>Your basic professional information.</p>
            </div>
          </div>

          <div className="form-grid">

            <div className="form-group">
              <label>Phone Number *</label>

              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Location *</label>

              <input
                type="text"
                name="location"
                placeholder="City, State"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

          </div>

        </section>


        {/* PROFESSIONAL INFORMATION */}

        <section className="profile-section">

          <div className="section-heading">
            <div className="section-number">02</div>

            <div>
              <h2>Professional Information</h2>
              <p>Tell employers about your professional background.</p>
            </div>
          </div>

          <div className="form-group">

            <label>Professional Headline *</label>

            <input
              type="text"
              name="headline"
              placeholder="e.g. Full Stack Developer"
              value={formData.headline}
              onChange={handleChange}
              required
            />

          </div>

          <div className="form-group">

            <label>Skills *</label>

            <input
              type="text"
              name="skills"
              placeholder="React, JavaScript, Node.js, MongoDB"
              value={formData.skills}
              onChange={handleChange}
              required
            />

            <small>
              Separate multiple skills using commas.
            </small>

          </div>

          <div className="form-group">

            <label>About Me</label>

            <textarea
              name="bio"
              rows="5"
              placeholder="Write a short professional introduction..."
              value={formData.bio}
              onChange={handleChange}
            />

          </div>

        </section>


        {/* EXPERIENCE & EDUCATION */}

        <section className="profile-section">

          <div className="section-heading">

            <div className="section-number">03</div>

            <div>
              <h2>Experience & Education</h2>
              <p>Highlight your qualifications and experience.</p>
            </div>

          </div>

          <div className="form-group">

            <label>Experience</label>

            <input
              type="text"
              name="experience"
              placeholder="e.g. Fresher or 2 years"
              value={formData.experience}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label>Education</label>

            <input
              type="text"
              name="education"
              placeholder="e.g. B.Sc. Information Technology"
              value={formData.education}
              onChange={handleChange}
            />

          </div>

        </section>


        {/* SOCIAL PROFILES */}

        <section className="profile-section">

          <div className="section-heading">

            <div className="section-number">04</div>

            <div>
              <h2>Professional Links</h2>
              <p>Connect your professional profiles.</p>
            </div>

          </div>

          <div className="form-grid">

            <div className="form-group">

              <label>LinkedIn</label>

              <input
                type="url"
                name="linkedin"
                placeholder="https://linkedin.com/in/yourname"
                value={formData.linkedin}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label>GitHub</label>

              <input
                type="url"
                name="github"
                placeholder="https://github.com/yourname"
                value={formData.github}
                onChange={handleChange}
              />

            </div>

          </div>

        </section>


        {/* ACTIONS */}

        <div className="form-actions">

          <button
            type="button"
            className="skip-btn"
            onClick={() => navigate("/")}
          >
            Skip for Now
          </button>

          <button
            type="submit"
            className="save-profile-btn"
             disabled={loading}
          >
            {loading ? "Saving..." : "Save & Continue"}
          </button>

        </div>

      </form>

    </div>
  );
}

export default CompleteProfile;