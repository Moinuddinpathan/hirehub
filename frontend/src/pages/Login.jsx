import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const { isLoggedIn, login } = useAuth();

  console.log("Navbar:", isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Remove error when user starts typing
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      // YOUR EXISTING LOGIN API
      const response = await loginUser(formData);

      console.log("Login response:", response.data);

      // YOUR EXISTING AUTH CONTEXT LOGIC
      login(
        response.data.user,
        response.data.accessToken
      );

      alert("Login Successful");

      // YOUR EXISTING REDIRECT
      navigate("/");

    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.response?.data?.message ||
        "Login Failed"
      );

    } finally {
      setLoading(false);
    }
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = () => {
    window.location.href =
      "http://localhost:5000/api/auth/google";
  };

  return (
    <main className="login-page">

      {/* =====================================================
          LEFT SIDE - HIREHUB BRANDING
      ====================================================== */}

      <section className="login-hero">

        {/* Decorative background */}
        <div className="hero-circle hero-circle-one"></div>
        <div className="hero-circle hero-circle-two"></div>
        <div className="hero-grid"></div>


        <div className="hero-content">

          {/* LOGO */}

          <div className="hero-logo">

            <div className="hero-logo-box">
              H
            </div>

            <div className="hero-logo-text">
              Hire<span>Hub</span>
            </div>

          </div>


          {/* HERO TEXT */}

          <div className="hero-main">

            <div className="hero-eyebrow">
              YOUR CAREER STARTS HERE
            </div>

            <h1>
              Find the job
              <br />
              <span>you deserve.</span>
            </h1>

            <p className="hero-description">
              Connect with top companies, discover exciting
              opportunities, and take the next step in your
              career with HireHub.
            </p>

          </div>


          {/* FEATURES */}

          <div className="hero-features">

            <div className="hero-feature">

              <div className="hero-feature-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12l4 4L19 6" />
                </svg>
              </div>

              <div className="hero-feature-content">

                <h3>
                  Thousands of opportunities
                </h3>

                <p>
                  Discover jobs from growing companies.
                </p>

              </div>

            </div>


            <div className="hero-feature">

              <div className="hero-feature-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12l4 4L19 6" />
                </svg>
              </div>

              <div className="hero-feature-content">

                <h3>
                  Build your career
                </h3>

                <p>
                  Find opportunities that match your skills.
                </p>

              </div>

            </div>


            <div className="hero-feature">

              <div className="hero-feature-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12l4 4L19 6" />
                </svg>
              </div>

              <div className="hero-feature-content">

                <h3>
                  Simple & secure
                </h3>

                <p>
                  Apply to jobs with confidence.
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* LEFT FOOTER */}

        <div className="hero-footer">
          <span>© 2026 HireHub</span>
          <span className="hero-footer-dot">•</span>
          <span>All rights reserved.</span>
        </div>

      </section>


      {/* =====================================================
          RIGHT SIDE - LOGIN
      ====================================================== */}

      <section className="login-form-area">

        <div className="login-card">


          {/* MOBILE LOGO */}

          <div className="mobile-login-logo">

            <div className="mobile-logo-box">
              H
            </div>

            <span>
              Hire<span>Hub</span>
            </span>

          </div>


          {/* LOGIN HEADER */}

          <div className="login-header">

            <h2>
              Welcome back
            </h2>

            <p>
              Sign in to continue to your HireHub account.
            </p>

          </div>


          {/* ERROR */}

          {error && (
            <div className="login-error">

              <div className="error-icon">
                !
              </div>

              <span>
                {error}
              </span>

            </div>
          )}


          {/* LOGIN FORM */}

          <form onSubmit={handleSubmit}>


            {/* EMAIL */}

            <div className="login-form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <div className="login-input-wrapper">

                <span className="login-input-icon">

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                    />

                    <path d="M3 7l9 6 9-6" />
                  </svg>

                </span>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="login-form-group">

              <div className="login-password-label">

                <label htmlFor="password">
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="forgot-password"
                >
                  Forgot password?
                </Link>

              </div>


              <div className="login-input-wrapper">

                <span className="login-input-icon">

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect
                      x="5"
                      y="10"
                      width="14"
                      height="10"
                      rx="2"
                    />

                    <path d="M8 10V7a4 4 0 018 0v3" />
                  </svg>

                </span>


                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter Password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                />


                {/* SHOW / HIDE PASSWORD */}

                <button
                  type="button"
                  className="password-eye"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >

                  {showPassword ? (

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M3 3l18 18" />

                      <path d="M10.6 10.6a2 2 0 002.8 2.8" />

                      <path d="M9.9 4.2A10.8 10.8 0 0112 4c5 0 8.5 4 9.5 8a11.7 11.7 0 01-3.1 5.1" />

                      <path d="M6.6 6.6C4.3 8 3 10.2 2.5 12c1 4 4.5 8 9.5 8 1.2 0 2.3-.2 3.3-.6" />
                    </svg>

                  ) : (

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" />

                      <circle
                        cx="12"
                        cy="12"
                        r="2.5"
                      />

                    </svg>

                  )}

                </button>

              </div>

            </div>


            {/* REMEMBER ME */}

            <div className="login-options">

              <label className="remember-me">

                <input
                  type="checkbox"
                  name="remember"
                />

                <span>
                  Remember me
                </span>

              </label>

            </div>


            {/* LOGIN BUTTON */}

            <button
  type="submit"
  className="login-submit"
  disabled={loading}
>
  {loading ? (
    <>
      <span className="login-spinner"></span>
      Signing in...
    </>
  ) : (
    "Sign in"
  )}
</button>





          </form>


          {/* DIVIDER */}

          <div className="login-divider">

            <span></span>

            <p>
              OR
            </p>

            <span></span>

          </div>


          {/* GOOGLE */}

          <button
  type="button"
  className="google-button"
  onClick={handleGoogleLogin}
>
  <svg
    className="google-icon"
    viewBox="0 0 48 48"
    aria-hidden="true"
  >
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L37.618 9.382C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
    />

    <path
      fill="#FF3D00"
      d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 14 24 14c3.059 0 5.842 1.154 7.961 3.039L37.618 9.382C34.046 6.053 29.268 4 24 4c-7.682 0-14.344 4.337-17.694 10.691z"
    />

    <path
      fill="#4CAF50"
      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.618-3.316-11.286-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
    />

    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.084 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
    />
  </svg>

  <span>Continue with Google</span>
</button>


          {/* REGISTER */}

          <div className="login-register">

            <span>
              Don't have an account?
            </span>

            <Link to="/register">
              Create an account
            </Link>

          </div>


          {/* SECURITY */}

          <div className="login-security">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <rect
                x="5"
                y="10"
                width="14"
                height="10"
                rx="2"
              />

              <path d="M8 10V7a4 4 0 018 0v3" />
            </svg>

            <span>
              Your information is protected with secure authentication.
            </span>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Login;