  import { Link } from "react-router-dom";
  import { useAuth } from "../context/AuthContext";
  import { NavLink, useNavigate } from "react-router-dom";
  import { useState, useEffect } from "react";
  import {
    User,
    Bookmark,
    FileText,
    LogOut
} from "lucide-react";
  import "./Navbar.css";  
  import logo from "../assets/llogo.png";

  function Navbar() {

      const {
    isLoggedIn,
    user,
    logout
} = useAuth();

const navigate = useNavigate();

const [dropdownOpen, setDropdownOpen] = useState(false);

useEffect(() => {

    const handleClickOutside = (e) => {

        if (!e.target.closest(".profile-menu")) {
            setDropdownOpen(false);
        }

    };

    document.addEventListener("click", handleClickOutside);

    return () => {
        document.removeEventListener("click", handleClickOutside);
    };

}, []);

const [search, setSearch] = useState("");


    // const [showMenu, setShowMenu] = useState(false);
    // const search = params.get("search");
   
   

    // const params = new URLSearchParams(location.search);

// const urlSearch = params.get("search") || "";

const handleSearch = () => {

    if (!search.trim()) return;

    navigate(`/jobs?keyword=${encodeURIComponent(search.trim())}`);

};
  

const closeDropdown = () => {
    setDropdownOpen(false);
};

  // navigate(`/jobs?search=${search}`);

    return (
<nav className="navbar">

    <div className="navbar-container">

        {/* Left */}

        <Link to="/" className="navbar-logo">
    <img
        src={logo}
        alt="HireHub"
        className="logo-image"
    />

   
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
        onClick={() => setDropdownOpen(!dropdownOpen)}
    >

        <div className="avatar">

            {user?.name?.charAt(0).toUpperCase() || "U"}

        </div>

        <span>

            {user?.name || "Profile"}

        </span>

        ▼

    </button>

    {/* {dropdownOpen && (

        <div className="profile-dropdown">

    <Link to="/profile" onClick={closeDropdown}>
        👤 My Profile
    </Link>

    <Link to="/saved-jobs" onClick={closeDropdown}>
        🔖 Saved Jobs
    </Link>

    <Link to="/my-applications" onClick={closeDropdown}>
        📄 Applications
    </Link>

    <div className="dropdown-divider"></div>

    <button
        onClick={() => {
            closeDropdown();
            logout();
            navigate("/");
        }}
    >
        ↪ Logout
    </button>



</div>

    )} */}

    {dropdownOpen && (

    <div className="profile-dropdown">

        <Link to="/profile" onClick={closeDropdown}>
            <User size={18} />
            <span>My Profile</span>
        </Link>

        <Link to="/saved-jobs" onClick={closeDropdown}>
            <Bookmark size={18} />
            <span>Saved Jobs</span>
        </Link>

        <Link to="/my-applications" onClick={closeDropdown}>
            <FileText size={18} />
            <span>Applications</span>
        </Link>

        <div className="dropdown-divider"></div>

        <button
            onClick={() => {
                closeDropdown();
                logout();
                navigate("/");
            }}
        >
            <LogOut size={18} />
            <span>Logout</span>
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