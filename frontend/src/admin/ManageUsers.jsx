import { useEffect, useState } from "react";
import {
  getUsers,
  deleteUser,
} from "../services/adminService";

import "../styles/ManageUsers.css";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // ==============================
  // FETCH USERS
  // ==============================

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await getUsers();

      setUsers(response.data.users || []);
    } catch (error) {
      console.log("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ==============================
  // DELETE USER
  // ==============================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteUser(id);

      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== id)
      );

      alert("User deleted successfully");
    } catch (error) {
      console.log("Delete failed:", error);
      alert("Delete failed");
    }
  };

  // ==============================
  // SEARCH
  // ==============================

  const filteredUsers = users.filter((user) => {
    const searchValue = search.toLowerCase().trim();

    return (
      user.name?.toLowerCase().includes(searchValue) ||
      user.email?.toLowerCase().includes(searchValue) ||
      user.role?.toLowerCase().includes(searchValue)
    );
  });

  // ==============================
  // AVATAR INITIAL
  // ==============================

  const getInitial = (name) => {
    if (!name) return "U";

    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="manage-users-page">

      {/* ==============================
          PAGE HEADER
      ============================== */}

      <div className="manage-users-header">

        <div>
          <span className="page-label">
            USER MANAGEMENT
          </span>

          <h1>Manage Users</h1>

          <p>
            Manage registered users, roles and account access.
          </p>
        </div>

        <div className="user-count-card">
          <span>Total Users</span>
          <strong>{users.length}</strong>
        </div>

      </div>


      {/* ==============================
          USERS CARD
      ============================== */}

      <div className="users-card">

        {/* TOP BAR */}

        <div className="users-card-header">

          <div>
            <h2>All Users</h2>

            <p>
              {filteredUsers.length} users found
            </p>
          </div>

          {/* SEARCH */}

          <div className="users-search">

            <span className="search-icon">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            {search && (
              <button
                className="clear-search"
                onClick={() => setSearch("")}
                type="button"
              >
                ×
              </button>
            )}

          </div>

        </div>


        {/* ==============================
            TABLE
        ============================== */}

        <div className="users-table-wrapper">

          {loading ? (
            <div className="users-loading">
              <div className="loading-spinner"></div>
              <p>Loading users...</p>
            </div>
          ) : filteredUsers.length === 0 ? (

            <div className="users-empty">

              <div className="empty-icon">
                👥
              </div>

              <h3>
                No users found
              </h3>

              <p>
                {search
                  ? "Try changing your search."
                  : "There are no registered users yet."}
              </p>

            </div>

          ) : (

            <table className="users-table">

              <thead>
                <tr>
                  <th>USER</th>
                  <th>EMAIL</th>
                  <th>PHONE</th>
                  <th>ROLE</th>
                  <th>STATUS</th>
                  <th className="action-column">
                    ACTION
                  </th>
                </tr>
              </thead>

              <tbody>

                {filteredUsers.map((user) => (

                  <tr key={user._id}>

                    {/* USER */}

                    <td>

                      <div className="user-info">

                        <div className="user-avatar">
                          {getInitial(user.name)}
                        </div>

                        <div className="user-name">
                          <strong>
                            {user.name || "Unnamed User"}
                          </strong>

                          <span>
                            ID: {user._id.slice(-6)}
                          </span>
                        </div>

                      </div>

                    </td>


                    {/* EMAIL */}

                    <td>
                      <span className="user-email">
                        {user.email || "—"}
                      </span>
                    </td>


                    {/* PHONE */}

                    <td>
                      <span className="user-phone">
                        {user.phone || "Not provided"}
                      </span>
                    </td>


                    {/* ROLE */}

                    <td>

                      <span
                        className={`role-badge ${
                          user.role === "admin"
                            ? "role-admin"
                            : "role-user"
                        }`}
                      >
                        {user.role === "admin"
                          ? "Administrator"
                          : "User"}
                      </span>

                    </td>


                    {/* STATUS */}

                    <td>

                      <span className="status-badge">
                        <span className="status-dot"></span>
                        Active
                      </span>

                    </td>


                    {/* ACTION */}

                    <td className="action-column">

                      <button
                        className="delete-user-btn"
                        onClick={() =>
                          handleDelete(user._id)
                        }
                        type="button"
                      >
                        <span>🗑</span>
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </div>
  );
}

export default ManageUsers;