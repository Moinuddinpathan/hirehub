import { Link, useNavigate  } from "react-router-dom";
import { logoutUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";


function AdminNavbar() {

    const navigate = useNavigate();

    const { logout } = useAuth();

  const handleLogout = async () => {
    try {

      await logoutUser();

      logout();
      
      alert("Logged out successfully.");

      navigate("/login");

    } catch (error) {

       console.log(error);

  console.log(error.response);

  console.log(error.response?.data);

  alert(error.response?.data?.message || "Logout failed.");


    }
  };  


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <div className="container">

        <Link className="navbar-brand" to="/admin/dashboard">
  Admin Panel
</Link>

        <div className="navbar-nav">

         <Link className="nav-link" to="/admin/dashboard">
  Dashboard
</Link> 

          <Link className="nav-link" to="/admin/users">
            Users
          </Link>

          <Link className="nav-link" to="/admin/jobs">
            Jobs
          </Link>

          <Link className="nav-link" to="/admin/applications">
            Applications
          </Link>

        </div>
                <button
          className="btn btn-danger"
          onClick={handleLogout}
        >
          Logout
        </button>


      </div>
    </nav>
  );
}

export default AdminNavbar;