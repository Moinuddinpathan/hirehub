import { useEffect, useState } from "react";
import {
  getUsers,
  deleteUser,
} from "../services/adminService";
// import AdminNavbar from "../components/AdminNavbar";



function ManageUsers(){
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");


    const fetchUsers = async () => {
        try {
            const response = await getUsers();

            console.log(response.data);
            

        setUsers(response.data.users);
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
    fetchUsers();
  }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
        return;
    }

    try {
        await deleteUser(id);

        alert("User Deleted")

        fetchUsers()

    } catch (error) {
        console.log(error);
        alert("Delete Failed")
        
    }

    };

    const filteredUsers = users.filter((user) =>
  user.name.toLowerCase().includes(search.toLowerCase())
);

    return(
        <>
        {/* <AdminNavbar /> */}
         <div className="container mt-4">

            <h2 className="mb-3">Manage Users</h2>

<input
  type="text"
  className="form-control mb-3"
  placeholder="Search by user name..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
            <div className="table-responsive">

<table className="table table-bordered table-hover align-middle">
                 <thead>

          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>
            {
                filteredUsers.map((user) => (
                    <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.role}</td>

                        <td>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>

              </td>
                    </tr>
                ) )
            }
        </tbody>
          </table>

</div>

</div>
</>
    )
}

export default ManageUsers;