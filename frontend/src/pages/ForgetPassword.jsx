import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/ForgotPassword.css";
import {
  forgotPassword,
  verifyResetOtp,
  resetPassword
} from "../services/authService";


function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ================================
  // SEND OTP
  // ================================
 const handleSendOtp = async (e) => {
  e.preventDefault();

  setError("");
  setSuccess("");

  if (!email) {
    setError("Please enter your email address.");
    return;
  }

  try {
    setLoading(true);

    const response = await forgotPassword(email);

    console.log("Forgot password response:", response.data);

    setSuccess(
      response.data.message ||
      "OTP sent to your email."
    );

    setStep(2);

  } catch (error) {
    console.error("Forgot password error:", error);

    setError(
      error.response?.data?.message ||
      "Failed to send OTP."
    );
  } finally {
    setLoading(false);
  }
};


  // ================================
  // VERIFY OTP
  // ================================
  const handleVerifyOtp = async (e) => {
  e.preventDefault();

  setError("");
  setSuccess("");

  if (!otp) {
    setError("Please enter the OTP.");
    return;
  }

  if (otp.length !== 6) {
    setError("OTP must be 6 digits.");
    return;
  }

  try {
    setLoading(true);

    const response = await verifyResetOtp({
      email,
      otp,
    });

    console.log("Verify OTP response:", response.data);

    setSuccess(
      response.data.message ||
      "OTP verified successfully."
    );

    setStep(3);

  } catch (error) {
    console.error("OTP verification error:", error);

    setError(
      error.response?.data?.message ||
      "Invalid OTP."
    );
  } finally {
    setLoading(false);
  }
};

  // ================================
  // RESET PASSWORD
  // ================================
 const handleResetPassword = async (e) => {
  e.preventDefault();

  setError("");
  setSuccess("");

  if (!password || !confirmPassword) {
    setError("Please fill in both password fields.");
    return;
  }

  if (password.length < 6) {
    setError("Password must be at least 6 characters.");
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  try {
    setLoading(true);

    const response = await resetPassword({
      email,
      password,
    });

    console.log("Reset password response:", response.data);

    setSuccess(
      response.data.message ||
      "Password reset successfully."
    );

    setTimeout(() => {
      navigate("/login");
    }, 1500);

  } catch (error) {
    console.error("Reset password error:", error);

    setError(
      error.response?.data?.message ||
      "Failed to reset password."
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <main className="forgot-page">

      {/* =====================================
          LEFT HERO
      ====================================== */}

      <section className="forgot-hero">

        <div className="forgot-circle forgot-circle-one"></div>
        <div className="forgot-circle forgot-circle-two"></div>
        <div className="forgot-grid"></div>

        <div className="forgot-hero-content">

          {/* LOGO */}

          <div className="forgot-logo">

            <div className="forgot-logo-box">
              H
            </div>

            <div className="forgot-logo-text">
              Hire<span>Hub</span>
            </div>

          </div>


          {/* HERO TEXT */}

          <div className="forgot-hero-main">

            <div className="forgot-eyebrow">
              SECURE ACCOUNT RECOVERY
            </div>

            <h1>
              Get back to
              <br />
              <span>your career.</span>
            </h1>

            <p>
              Don't worry if you've forgotten your password.
              We'll help you securely recover your HireHub
              account in just a few steps.
            </p>

          </div>


          {/* FEATURES */}

          <div className="forgot-features">

            <div className="forgot-feature">

              <div className="forgot-feature-icon">
                ✓
              </div>

              <div>
                <h3>Secure verification</h3>
                <p>Verify your identity using email OTP.</p>
              </div>

            </div>


            <div className="forgot-feature">

              <div className="forgot-feature-icon">
                ✓
              </div>

              <div>
                <h3>Protect your account</h3>
                <p>Create a new secure password.</p>
              </div>

            </div>


            <div className="forgot-feature">

              <div className="forgot-feature-icon">
                ✓
              </div>

              <div>
                <h3>Get back to work</h3>
                <p>Continue discovering your dream jobs.</p>
              </div>

            </div>

          </div>

        </div>


        <div className="forgot-footer">
          © 2026 HireHub • All rights reserved.
        </div>

      </section>


      {/* =====================================
          RIGHT FORM
      ====================================== */}

      <section className="forgot-form-area">

        <div className="forgot-card">


          {/* MOBILE LOGO */}

          <div className="forgot-mobile-logo">

            <div className="forgot-mobile-logo-box">
              H
            </div>

            <span>
              Hire<span>Hub</span>
            </span>

          </div>


          {/* HEADER */}

          <div className="forgot-header">

            <div className="forgot-header-icon">
              🔐
            </div>

            <h2>
              {step === 1 && "Forgot password?"}
              {step === 2 && "Verify your email"}
              {step === 3 && "Create new password"}
            </h2>

            <p>
              {step === 1 &&
                "Enter your email address and we'll send you an OTP to reset your password."
              }

              {step === 2 &&
                "Enter the 6-digit OTP sent to your email address."
              }

              {step === 3 &&
                "Create a strong new password for your HireHub account."
              }
            </p>

          </div>


          {/* ERROR */}

          {error && (
            <div className="forgot-error">

              <span className="forgot-error-icon">
                !
              </span>

              <span>
                {error}
              </span>

            </div>
          )}


          {/* SUCCESS */}

          {success && (
            <div className="forgot-success">

              <span>
                ✓
              </span>

              <span>
                {success}
              </span>

            </div>
          )}


          {/* =====================================
              STEP 1
          ====================================== */}

          {step === 1 && (

            <form onSubmit={handleSendOtp}>

              <div className="forgot-form-group">

                <label htmlFor="email">
                  Email Address
                </label>

                <div className="forgot-input-wrapper">

                  <span className="forgot-input-icon">
                    ✉
                  </span>

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    autoComplete="email"
                  />

                </div>

              </div>


              <button
                type="submit"
                className="forgot-submit"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <span className="forgot-spinner"></span>
                    Sending OTP...
                  </>
                ) : (
                  "Send OTP"
                )}

              </button>

            </form>

          )}


          {/* =====================================
              STEP 2
          ====================================== */}

          {step === 2 && (

            <form onSubmit={handleVerifyOtp}>

              <div className="forgot-form-group">

                <label htmlFor="otp">
                  Enter OTP
                </label>

                <div className="forgot-input-wrapper">

                  <span className="forgot-input-icon">
                    #
                  </span>

                  <input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    maxLength="6"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "");

                      setOtp(value);
                      setError("");
                    }}
                  />

                </div>

                <p className="otp-info">
                  OTP sent to <strong>{email}</strong>
                </p>

              </div>


              <button
                type="submit"
                className="forgot-submit"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <span className="forgot-spinner"></span>
                    Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}

              </button>


              <button
                type="button"
                className="resend-button"
                onClick={() => {
                  setStep(1);
                  setOtp("");
                  setError("");
                  setSuccess("");
                }}
              >
                Change email
              </button>

            </form>

          )}


          {/* =====================================
              STEP 3
          ====================================== */}

          {step === 3 && (

            <form onSubmit={handleResetPassword}>

              {/* PASSWORD */}

              <div className="forgot-form-group">

                <label htmlFor="password">
                  New Password
                </label>

                <div className="forgot-input-wrapper">

                  <span className="forgot-input-icon">
                    🔒
                  </span>

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    className="forgot-eye"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>

              </div>


              {/* CONFIRM PASSWORD */}

              <div className="forgot-form-group">

                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <div className="forgot-input-wrapper">

                  <span className="forgot-input-icon">
                    🔒
                  </span>

                  <input
                    id="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setError("");
                    }}
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    className="forgot-eye"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                  >
                    {showConfirmPassword
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

              </div>


              <button
                type="submit"
                className="forgot-submit"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <span className="forgot-spinner"></span>
                    Resetting...
                  </>
                ) : (
                  "Reset Password"
                )}

              </button>

            </form>

          )}


          {/* BACK TO LOGIN */}

          <div className="forgot-back-login">

            <span>
              Remember your password?
            </span>

            <Link to="/login">
              Back to Login
            </Link>

          </div>


          {/* SECURITY */}

          <div className="forgot-security">

            <span>🔒</span>

            <span>
              Your information is protected with secure authentication.
            </span>

          </div>

        </div>

      </section>

    </main>
  );
}

export default ForgotPassword;