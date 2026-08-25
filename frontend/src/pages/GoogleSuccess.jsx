import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getProfile } from "../services/authService";

function GoogleSuccess() {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleLogin = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      console.log("Google Token:", token);

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // Temporarily save token so getProfile() can use it
        localStorage.setItem("token", token);

        // Get logged-in user's profile
        const response = await getProfile();

        console.log("Profile Response:", response);

        // Get user from API response
        const userData =
          response?.data?.user ||
          response?.user ||
          response?.data;

        console.log("Google User Data:", userData);

        if (!userData) {
          throw new Error("User data not found");
        }

        // Save Google user + token
        // true = remember Google login
        login(userData, token, true);

        // Redirect to home
        navigate("/");
      } catch (error) {
        console.error("Google Login Error:", error);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");

        navigate("/login");
      }
    };

    handleGoogleLogin();
  }, [login, navigate]);

  return <h2>Signing you in...</h2>;
}

export default GoogleSuccess;