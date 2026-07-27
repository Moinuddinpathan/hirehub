    import { useEffect, useState } from "react";
    import { getJobs, deleteJob } from "../services/adminService";
// import AdminNavbar from "../components/AdminNavbar";

    function ManageJobs() {
        const [jobs, setJobs] = useState([]);
        const [search, setSearch] = useState("");

        useEffect(() => {
            fetchJobs()
        }, [])

        const fetchJobs = async () => {
            try {
            const response = await getJobs();

            console.log(response.data);

            setJobs(response.data.jobs);
            
        } catch (error) {
            console.log(error);
            
        }
        }

        const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
        "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) {
        return;
    }

        try {


await deleteJob(id);
        alert("Job Deleted Successfully");

        fetchJobs();

        } catch (error) {

        console.log(error);

        alert("Delete Failed");

        }

    };

    const filteredJobs = jobs.filter((job) =>
  job.title.toLowerCase().includes(search.toLowerCase())
);


    return(
        <>
        {/* <AdminNavbar /> */}
        <div className="container mt-4">

            <h2 className="mb-3">Manage Jobs</h2>

<input
  type="text"
  className="form-control mb-3"
  placeholder="Search by job title..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

        <div className="table-responsive">

<table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">

            <tr>

                <th>Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Salary</th>
                <th>Action</th>

            </tr>

            </thead> 

            <tbody>
                {
                    filteredJobs.map((job) => (
                        <tr key={job._id}>
                            <td>{job.title}</td>

                <td>{job.company}</td>

                <td>{job.location}</td>

                <td>{job.salary}</td>

                <td>

                    <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(job._id)}
                    >
                    Delete
                    </button>

                </td>
                        </tr>
                    ))
                }
            </tbody>
       </table>

</div>
        </div>
        </>

    )
    }

    export default ManageJobs;