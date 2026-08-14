  import { Routes, Route, Navigate, Outlet } from "react-router-dom";
  import Navbar from "./components/Navbar";

  import Home from "./pages/Home";
  import Login from "./pages/Login";
  import Register from "./pages/Register";
  // import JobCard from "./components/JobCard";
  import Jobs from "./pages/Jobs";
  import JobsDetails from "./pages/JobDetails";
  import Profile from "./pages/Profile";
  import Dashboard from "./admin/Dashboard";
  import MyApplications from "./pages/MyApplications";
  import ApplyJob from "./pages/ApplyJob";
  import SavedJobs from "./pages/SavedJobs";


  import ManageUsers from "./admin/ManageUsers";
  import ManageJobs from "./admin/ManageJobs" ;
  import Applications from "./admin/Applications";
  // import AdminRoute from "./components/AdminRoute";
  import GoogleSuccess from "./pages/GoogleSuccess";
  import CreateJob from "./pages/CreateJob";
  // import AdminNavbar from "../components/AdminNavbar";
  // Admin Protection + Layout
  import AdminRoute from "./components/AdminRoute";
  import AdminLayout from "./components/AdminLayout";

  import EditJob from "./pages/EditJob";
  import ForgotPassword from "./pages/ForgetPassword";



  function UserLayout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>
    </>
  );
}



  function App() {
    return (
      <>
                


        <Routes>

                {/* =====================================
          USER / PUBLIC ROUTES
      ===================================== */}

      <Route element={<UserLayout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/jobs"
          element={<Jobs />}
        />

         <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

        <Route
          path="/jobs/:id"
          element={<JobsDetails />}
        />

        <Route
  path="/saved-jobs"
  element={<SavedJobs />}
/>


        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/my-applications"
          element={<MyApplications />}
        />

        <Route
          path="/apply/:id"
          element={<ApplyJob />}
        />

      </Route>


          <Route path="/google-success" element={<GoogleSuccess />} />

      

  <Route
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >

          {/* /admin redirects to dashboard */}

          <Route
            path="/admin"
            element={
              <Navigate
                to="/admin/dashboard"
                replace
              />
            }
          />


          {/* Dashboard */}

          <Route
            path="/admin/dashboard"
            element={<Dashboard />}
          />


          {/* Create Job */}

          <Route
            path="/admin/jobs/create"
            element={<CreateJob />}
          />


          {/* Manage Jobs */}

          <Route
            path="/admin/jobs"
            element={<ManageJobs />}
          />

             {/* EDIT JOB - PUT IT HERE */}
             
             <Route
  path="/admin/jobs/:id/edit"
  element={<EditJob />}
/>

          {/* Applications */}

          <Route
            path="/admin/applications"
            element={<Applications />}
          />


          {/* Users */}

          <Route
            path="/admin/users"
            element={<ManageUsers />}
          />

        </Route>

            

        </Routes>
      </>
    );
  }

  export default App;