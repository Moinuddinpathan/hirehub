import { useEffect, useState } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import "./SearchBar.css";

function SearchBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [workMode, setWorkMode] = useState("");

  // ==========================================
  // READ SEARCH VALUES FROM URL
  // ==========================================

  useEffect(() => {
    setKeyword(
      searchParams.get("keyword") || ""
    );

    setLocation(
      searchParams.get("location") || ""
    );

    setJobType(
      searchParams.get("jobType") || ""
    );

    setWorkMode(
      searchParams.get("workMode") || ""
    );
  }, [searchParams]);

  // ==========================================
  // SEARCH
  // ==========================================

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (keyword.trim()) {
      params.set(
        "keyword",
        keyword.trim()
      );
    }

    if (location.trim()) {
      params.set(
        "location",
        location.trim()
      );
    }

    if (jobType) {
      params.set(
        "jobType",
        jobType
      );
    }

    if (workMode) {
      params.set(
        "workMode",
        workMode
      );
    }

    navigate(
      `/jobs?${params.toString()}`
    );
  };

  // ==========================================
  // ENTER KEY SEARCH
  // ==========================================

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="search-section">
      <div className="search-container">

        {/* KEYWORD */}

        <input
          type="text"
          placeholder="Job title, skills or company"
          value={keyword}
          onChange={(e) =>
            setKeyword(e.target.value)
          }
          onKeyDown={handleKeyDown}
        />

        {/* LOCATION */}

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
          onKeyDown={handleKeyDown}
        />

        {/* JOB TYPE */}

        <select
          value={jobType}
          onChange={(e) =>
            setJobType(e.target.value)
          }
        >
          <option value="">
            All Job Types
          </option>

          <option value="Full Time">
            Full Time
          </option>

          <option value="Part Time">
            Part Time
          </option>

          <option value="Internship">
            Internship
          </option>
        </select>

        {/* WORK MODE */}

        <select
          value={workMode}
          onChange={(e) =>
            setWorkMode(e.target.value)
          }
        >
          <option value="">
            All Work Modes
          </option>

          <option value="On-site">
            On-site
          </option>

          <option value="Hybrid">
            Hybrid
          </option>

          <option value="Remote">
            Remote
          </option>
        </select>

        {/* SEARCH BUTTON */}

        <button onClick={handleSearch}>
          Search Jobs
        </button>

      </div>
    </section>
  );
}

export default SearchBar;