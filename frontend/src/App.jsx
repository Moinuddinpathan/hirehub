import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobCard from "./components/JobCard";
import Jobs from "./pages/Jobs";
import JobsDetails from "./pages/JobDetails";
import Profile from "./pages/Profile";
import Dashboard from "./admin/Dashboard";
import MyApplications from "./pages/MyApplications";
import ApplyJob from "./pages/ApplyJob";
import ManageUsers from "./admin/ManageUsers";
import ManageJobs from "./admin/ManageJobs";
import Applications from "./admin/Applications";
import AdminRoute from "./components/AdminRoute";
import GoogleSuccess from "./pages/GoogleSuccess";
import CreateJob from "./pages/CreateJob";
// import AdminNavbar from "../components/AdminNavbar";



function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<Jobs />}/>
        <Route path="/jobs/:id" element={<JobsDetails/>}/>
        <Route path="/profile" element={<Profile />}/>
      
        <Route path="/my-applications" element={<MyApplications />}/>
        <Route path="/apply/:id" element={<ApplyJob />}/>

        <Route path="/google-success" element={<GoogleSuccess />} />

       <Route
  path="/admin/jobs/create"
  element={
    <AdminRoute>
      <CreateJob />
    </AdminRoute>
  }
/>

<Route
  path="/admin"
  element={<Navigate to="/admin/dashboard" replace />}
/>
        <Route path="/admin/dashboard" element={<AdminRoute>
          <Dashboard />
        </AdminRoute>}/>
        <Route path="/admin/users" element={<AdminRoute>
          <ManageUsers />
        </AdminRoute>}/>
        <Route path="/admin/jobs" element={<AdminRoute>
          <ManageJobs />
        </AdminRoute>}/>
        <Route path="/admin/applications" element={<AdminRoute>
          <Applications />
        </AdminRoute>}/>
      </Routes>
    </>
  );
}

export default App;