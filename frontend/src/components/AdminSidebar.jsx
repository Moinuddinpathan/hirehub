import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./AdminSidebar.css";


function AdminSidebar() {
    const navigate = useNavigate();

    const { user, logout}  = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return(
        <aside className="admin-sidebar">

      {/* ================= BRAND ================= */}

      <div className="admin-sidebar-brand">

        <Link to="/admin/dashboard">
          Hire<span>Hub</span>
        </Link>

        <p>ADMIN PANEL</p>

      </div>


      {/* ================= NAVIGATION ================= */}

      <nav className="admin-sidebar-nav">

        <p className="admin-menu-label">
          MENU
        </p>


        {/* Dashboard */}

        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `admin-sidebar-link ${
              isActive ? "active" : ""
            }`
          }
        >

          <span className="admin-sidebar-icon">
            ▦
          </span>

          <span>Dashboard</span>

        </NavLink>


        {/* Post Job */}

        <NavLink
          to="/admin/jobs/create"
          className={({ isActive }) =>
            `admin-sidebar-link ${
              isActive ? "active" : ""
            }`
          }
        >

          <span className="admin-sidebar-icon">
            ＋
          </span>

          <span>Post Job</span>

        </NavLink>


        {/* Manage Jobs */}

        <NavLink
          to="/admin/jobs"
          end
          className={({ isActive }) =>
            `admin-sidebar-link ${
              isActive ? "active" : ""
            }`
          }
        >

          <span className="admin-sidebar-icon">
            💼
          </span>

          <span>Manage Jobs</span>

        </NavLink>


        {/* Applications */}

        <NavLink
          to="/admin/applications"
          className={({ isActive }) =>
            `admin-sidebar-link ${
              isActive ? "active" : ""
            }`
          }
        >

          <span className="admin-sidebar-icon">
            ▤
          </span>

          <span>Applications</span>

        </NavLink>


        {/* Users */}

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `admin-sidebar-link ${
              isActive ? "active" : ""
            }`
          }
        >

          <span className="admin-sidebar-icon">
            ♙
          </span>

          <span>Users</span>

        </NavLink>

      </nav>


      {/* ================= BOTTOM ================= */}

      <div className="admin-sidebar-bottom">

        <Link
          to="/"
          className="admin-view-site"
        >
          ← View Website
        </Link>


        {/* Admin Account */}

        <div className="admin-account">

          <div className="admin-avatar">

            {user?.name
              ?.charAt(0)
              .toUpperCase() || "A"}

          </div>


          <div className="admin-account-info">

            <strong>
              {user?.name || "Administrator"}
            </strong>

            <span>
              Administrator
            </span>

          </div>

        </div>


        {/* Logout */}

        <button
          type="button"
          className="admin-logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </aside>
    )
}

export default AdminSidebar;