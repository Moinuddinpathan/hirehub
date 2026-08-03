  import { Link } from "react-router-dom";
  import { useAuth } from "../context/AuthContext";
  import { NavLink, useNavigate } from "react-router-dom";
  import { useState } from "react";
  import "./Navbar.css";  

  function Navbar() {

      const {
    isLoggedIn,
    user,
    logout
} = useAuth();

const navigate = useNavigate();


const [search, setSearch] = useState("");


    const [showMenu, setShowMenu] = useState(false);
    // const search = params.get("search");
   
   

    // const params = new URLSearchParams(location.search);

// const urlSearch = params.get("search") || "";

const handleSearch = () => {

    if (!search.trim()) return;

    navigate(`/jobs?search=${encodeURIComponent(search)}`);

};
  

  // navigate(`/jobs?search=${search}`);

    return (
<nav className="navbar">

    <div className="navbar-container">

        {/* Left */}

        <Link to="/" className="navbar-logo">

            <span className="logo-icon">💼</span>

            <span className="logo-text">
                JobPortal
            </span>

        </Link>


        {/* Center */}

        <div className="navbar-search">

            <input
    type="text"
    placeholder="Search jobs, companies, locations..."

    value={search}

    onChange={(e) => setSearch(e.target.value)}

    onKeyDown={(e) => {

        if (e.key === "Enter") {

            handleSearch();

        }

    }}
/>

<button
    className="search-btn"
    onClick={handleSearch}
>
    Search
</button>

        </div>


        {/* Right */}

        <div className="navbar-right">

    <NavLink
        to="/"
        end
        className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
        }
    >
        Home
    </NavLink>

    <NavLink
        to="/jobs"
        className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
        }
    >
        Jobs
    </NavLink>

    {isLoggedIn && (

        <NavLink
            to="/saved-jobs"
            className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
            }
        >
            Saved
        </NavLink>

    )}

    {isLoggedIn && (

        <NavLink
            to="/my-applications"
            className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
            }
        >
            Applications
        </NavLink>

    )}

    {isLoggedIn ? (

        <div className="profile-menu">

    <button
        className="profile-button"
        onClick={() => setShowMenu(!showMenu)}
    >

        <div className="avatar">

            {user?.name?.charAt(0).toUpperCase() || "U"}

        </div>

        <span>

            {user?.name || "Profile"}

        </span>

        ▼

    </button>

    {showMenu && (

        <div className="profile-dropdown">

            <Link to="/profile">

                My Profile

            </Link>

            <Link to="/saved-jobs">

                Saved Jobs

            </Link>

            <Link to="/my-applications">

                Applications

            </Link>

           <button
    onClick={logout}
>

Logout

</button>

        </div>

    )}

</div>

    ) : (

        <>
            <NavLink
                to="/login"
                className={({ isActive }) =>
                    isActive ? "nav-item active" : "nav-item"
                }
            >
                Login
            </NavLink>

            <NavLink
                to="/register"
                className={({ isActive }) =>
                    isActive ? "nav-item active" : "nav-item"
                }
            >
                Register
            </NavLink>
        </>

    )}

</div>

    </div>

</nav>
    );
  }

  export default Navbar;