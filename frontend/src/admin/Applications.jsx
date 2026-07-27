import { useEffect, useState } from "react";
import {
  getApplications,
  updateApplicationStatus,
} from "../services/adminService";
// import AdminNavbar from "../components/AdminNavbar";

function Applications() {

  const [applications, setApplications] = useState([]);

  const [selectedApplication, setSelectedApplication] = useState(null);


const [search, setSearch] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {

      const response = await getApplications();

      setApplications(response.data.applications);

    } catch (error) {

      console.log(error);

    }
  };

  const changeStatus = async (id, status) => {

    try {
        await updateApplicationStatus(id, status);
        
        alert("Application Updated");

        fetchApplications();
    } catch (error) {
        console.log(error);

        alert("Update Failed")
        
    }
  }

  const filteredApplications = applications.filter((app) => {
    const searchText = search.toLowerCase();

    return(
      app.user?.name?.toLowerCase().includes(searchText) ||
      app.user?.email?.toLowerCase().includes(searchText) ||
      app.job?.title?.toLowerCase().includes(searchText) ||
    app.skills?.toLowerCase().includes(searchText)
    )
  })

   return (
    <>
    {/* <AdminNavbar /> */}
    <div className="container mt-4">
        <h2 className="mb-4">
        Manage Applications
      </h2>

      <div className="mb-3">
  <input
    type="text"
    className="form-control"
    placeholder="Search by applicant, email, job or skills..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>

      <div className="table-responsive">

<table className="table table-bordered table-hover align-middle">

         <thead>

          <tr>
  <th>Applicant</th>
  <th>Email</th>
  <th>Job</th>
  <th>Skills</th>
  <th>Experience</th>
  <th>Status</th>
  <th>Resume</th>
  <th>Details</th>
  <th>Change Status</th>
</tr>

        </thead>

            <tbody>
  {filteredApplications.map((app) => (
    <tr key={app._id}>
      <td>{app.user?.name}</td>

      <td>{app.user?.email}</td>

      <td>{app.job?.title}</td>

      <td>{app.skills}</td>

      <td>{app.experience}</td>

      <td>
        <span
          className={`badge ${
            app.status === "Pending"
              ? "bg-warning text-dark"
              : app.status === "Reviewed"
              ? "bg-info"
              : app.status === "Selected"
              ? "bg-success"
              : "bg-danger"
          }`}
        >
          {app.status}
        </span>
      </td>

      <td>
        {app.resume ? (
          <a
            href={`http://localhost:5000/${app.resume.replace(/\\/g, "/")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            View Resume
          </a>
        ) : (
          <span>No Resume</span>
        )}
      </td>

      <td>
        <button className="btn btn-info btn-sm"
        data-bs-toggle="modal"
        data-bs-target="#applicationModal"
         onClick={() =>{
          console.log(app);
          setSelectedApplication(app)}}>
          View Details
        </button>
      </td>

      <td>
        <select
          className="form-select"
          value={app.status}
          onChange={(e) =>
            changeStatus(app._id, e.target.value)
          }
        >
          <option value="Pending">Pending</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Selected">Selected</option>
          <option value="Rejected">Rejected</option>
        </select>
      </td>
    </tr>
  ))}
</tbody>
      </table>

</div>
    </div>

<div 
className="modal fade"
id="applicationModal"
tabIndex="-1"
aria-hidden="true"
>
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
       <div className="modal-header">
        <h5 className="modal-title">
          Candidate Details
        </h5>


        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
        ></button>


       </div>

       <div className="modal-body">
        {
          selectedApplication && (
            <>
            
            <div className="row">
              <div className="col-md-6">
                <strong>Name</strong>
                <p>{selectedApplication.user?.name}</p>
              </div>

              <div className="col-md-6">
                <strong>Email</strong>
                <p>{selectedApplication.user?.email}</p>
              </div>

              <div className="col-md-6">
                <strong>Job</strong>
                <p>{selectedApplication.job?.title}</p>
              </div>

              <div className="col-md-6">
                <strong>Skills</strong>
                <p>{selectedApplication.skills}</p>
              </div>

              <div className="col-md-6">
                <strong>Experience</strong>
                <p>{selectedApplication.experience}</p>
              </div>

              <div className="col-md-6">
                <strong>Location</strong>
                <p>{selectedApplication.location}</p>
              </div>

              <div className="col-md-6">
                <strong>Expected Salary</strong>
                <p>{selectedApplication.expectedSalary}</p>
              </div>

              <div className="col-md-6">
                <strong>Status</strong>
                <p>{selectedApplication.status}</p>
              </div>

              <div className="col-md-6">
                <strong>LinkedIn</strong>
                <br />
                
                <a
                href={selectedApplication.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                >
                  Oen LinkedIn
                </a>
                </div>

                <div className="col-md-6">
                <strong>GitHub</strong>
                <br />

                <a
                  href={selectedApplication.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open GitHub
                </a>

              </div>

              <div className="col-md-6">
  <strong>Resume</strong>
  <br />

  {selectedApplication.resume ? (
    <a
      href={`http://localhost:5000/${selectedApplication.resume.replace(/\\/g, "/")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-primary btn-sm mt-2"
    >
      View Resume
    </a>
  ) : (
    <p>No Resume Uploaded</p>
  )}
</div>
</div>
              <hr />

              <strong>
                Cover Letter
              </strong>

              <div className="border rounded p-3 bg-light mt-2">
                {selectedApplication.coverLetter}
              

              
            </div>

            </>
          )
        }
       </div>

        <div className="modal-footer">
        <button
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Close
        </button>
      </div>
      
    </div>
  </div>
</div>

    </>
)
}

export default Applications;