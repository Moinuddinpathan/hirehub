import "./Hero.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";



function Hero() {

  const { user } = useAuth()
  const navigate = useNavigate()
  return (
    <section className="hero">
      <div className="hero-content">

        <h1>
          Find Your <span>Dream Job</span>
        </h1>

        <p>
          Discover thousands of job opportunities from top companies.
          Build your career with HireHub.
        </p>

        <div className="hero-buttons">
          <button className="search-btn"
          onClick={() => navigate("/jobs")}>
            Search Jobs
          </button>

          {user?.role === "admin" && (
  <button className="post-btn"
  onClick={() => navigate("/admin/jobs/create")}>
    Post a Job
  </button>
)}
        </div>

      </div>

      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=700"
          alt="Team Working"
        />
      </div>
    </section>
  );
}

export default Hero;