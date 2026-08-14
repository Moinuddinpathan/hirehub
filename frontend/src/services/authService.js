import api from "../api/axios";

export const sendOTP = async (email) => {
  return await api.post("/auth/send-otp", { email });
};

// Verify OTP
export const verifyOTP = async (email, otp) => {
  return await api.post("/auth/verify-otp", {
    email,
    otp,
  });
};

export const registerUser = (userData) => {
  return api.post("/auth/register", userData);
};

// Verify Reset OTP
export const verifyResetOtp = (data) => {
  return api.post("/auth/verify-reset-otp", data);
};


// Reset Password
export const resetPassword = (data) => {
  return api.post("/auth/reset-password", data);
};

export const forgotPassword = (email) => {
  return api.post("/auth/forgot-password", {
    email,
  });
};

export const loginUser = (userData) => {
  return api.post("/auth/login", userData);
};





export const getProfile = async () => {
    const response = await api.get("/auth/profile");
    return response.data;
  };

export const logoutUser = ()=>{
  return api.post("/auth/logout");
}