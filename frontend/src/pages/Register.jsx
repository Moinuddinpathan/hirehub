import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "./Register.css";
import registerBanner from "../assets/register-banner.jpg";
import logo from "../assets/logo.png";

import {
  sendOTP,
  verifyOTP,
  registerUser,
} from "../services/authService";


function Register() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

const [otpSent, setOtpSent] = useState(false);

const [otpVerified, setOtpVerified] = useState(false);

const [loading, setLoading] = useState(false);


    const handleSendOTP = async () => {
      if (!formData.email) {
        return alert("Enter Email");
      }

      try {
        setLoading(true);

        const res = await sendOTP(formData.email);

        alert(res.data.message);

        setOtpSent(true);

      } catch (error) {
  console.log(error);
  alert(error.response?.data?.message || error.message || "Something went wrong");
} finally {
        setLoading(false);
      }
    }

    const handleVerifyOTP = async () => {
  if (!otp) {
    return alert("Enter OTP");
  }

  try {
    setLoading(true);

    const res = await verifyOTP(formData.email, otp);

    alert(res.data.message);

    setOtpVerified(true);

  } catch (error) {
  console.log(error);
  alert(error.response?.data?.message || error.message || "Something went wrong");
} finally {

    setLoading(false);

  }
};

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
  alert("Please verify your OTP first");
  return;
}

    // Validation
    if (
      !formData.name ||
      !formData.email ||

      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await registerUser({
  name: formData.name,
  email: formData.email,

  password: formData.password,
});

localStorage.setItem(
  "token",
  res.data.accessToken
);

      alert(res.data.message);

      setFormData({
        name: "",
        email: "",
   
        password: "",
        confirmPassword: "",
      });

      setOtp("");
setOtpSent(false);
setOtpVerified(false);

      navigate("/complete-profile");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };


 const handleGoogleLogin = () => {
  window.location.href =
    `${import.meta.env.VITE_API_URL}/api/auth/google`;
};


  return (
    <div className="register-page">
      <div className="register-left">
        <img src={registerBanner}
        alt="Banner"
        className="register-banner"
        />

        <div className="register-overlay">

          <img 
          src={logo}
          alt="Logo"
          className="register-logo"
          />

           <h1>
          Build Your Dream Career
        </h1>

        <p>
          Discover thousands of opportunities from India's top companies and
          start your journey today.
        </p>


        </div>
      </div>

      <div className="register-right">

        <div className="register-card">

           <h1>Create Account</h1>

        <p className="subtitle">
          Register to apply for your dream jobs.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">

            <label>Full Name</label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter Full Name"
              autoComplete="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

          </div>

          <div className="mb-3">
            <label>Email Address</label>

            <div className="input-group">

               <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                autoComplete="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSendOTP}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>

            </div>
          </div>

          {
            otpSent && (
              <div className="mb-3">
                <label>OTP</label>

                <div className="input-group">
                  <input 
                  type="text"
                  className="form-control"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  />

                  <button 
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={handleVerifyOTP}>
                    Verify OTP
                  </button>
                </div>
              </div>
            )
          }

          <div className="mb-3">

  <label>Password</label>

  <input
  type="password"
  className="form-control"
  placeholder="Enter Password"
  name="password"
  autoComplete="new-password"
  value={formData.password}
  onChange={handleChange}
/>

</div>

<div className="mb-3">

  <label>Confirm Password</label>

<input
  type="password"
  className="form-control"
  placeholder="Confirm Password"
  name="confirmPassword"
  autoComplete="new-password"
  value={formData.confirmPassword}
  onChange={handleChange}
/>

</div>

<div className="form-check mb-3">

  <input
    className="form-check-input"
    type="checkbox"
    id="terms"
    required
  />

  <label
    className="form-check-label"
    htmlFor="terms"
  >
    I agree to the <strong>Terms & Conditions</strong>
  </label>

</div>

<button
  type="submit"
  className="register-btn"
  disabled={!otpVerified}
>
  {otpVerified ? "Create Account" : "Verify OTP First"}
</button>

<div className="divider">
  <span>OR</span>
</div>

<button
  type="button"
  className="google-btn"
  onClick={handleGoogleLogin}
>
  <img
    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
    alt="Google"
  />

  Continue with Google
</button>

<p className="login-text">
  Already have an account?

  <Link to="/login">
    Login
  </Link>
</p>

        </form>
        </div>
      </div>
    </div>
  );
}

export default Register;