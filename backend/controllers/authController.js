const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const OTP = require("../models/Otp")
const sendResetPasswordEmail = require("../utils/sendResetPasswordEmail");
const {
  generateAccessToken,
  generateRefreshToken,
    verifyAccessToken,
  verifyRefreshToken,
} = require("../utils/generateToken");
const { sendOtpEmail, transporter } = require("../utils/sendEmail");



// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if OTP is verified
const otpData = await OTP.findOne({
  email,
  verified: true,
});

if (!otpData) {
  return res.status(400).json({
    success: false,
    message: "Please verify your OTP first.",
  });
}

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check existing user
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("================================");
console.log("CREATING USER");
console.log("NAME:", name);
console.log("EMAIL:", email);
console.log("DATABASE:", mongoose.connection.name);
console.log("================================");

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    // Generate Tokens
const accessToken = generateAccessToken(user._id, user.role);
const refreshToken = generateRefreshToken(user._id, user.role);

// Save Refresh Token in Database
user.refreshToken = refreshToken;
await user.save();

res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

// Delete OTP after successful registration
await OTP.deleteMany({ email });

res.status(201).json({
  success: true,
  message: "Registration Successful",

  accessToken,


  user: {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
}); 
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    if(user.googleId) {
      return res.status(400).json({
        success: false,
        message: "This account uses Google Sign-In. Please continue with Google.",
      });
    }


    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // Generate Tokens
const accessToken = generateAccessToken(user._id, user.role);
const refreshToken = generateRefreshToken(user._id, user.role);

// Save Refresh Token
user.refreshToken = refreshToken;
await user.save();

console.log("Cookie Sent");

res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

console.log("Refresh Token Generated:", refreshToken);


res.status(200).json({
  success: true,
  message: "Login Successful",
  accessToken,

  user: {
    _id: user._id,
    name: user.name,
    email: user.email,

    role: user.role,
  },
});

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -refreshToken -resetOtp -resetOtpExpire -resetPasswordOtp -resetPasswordOtpExpiry"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.error("Get profile error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get profile",
    });
  }
};

// =========================
// UPDATE USER PROFILE
// =========================

const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      name,
      phone,
      headline,
      location,
      bio,
      skills,
      education,
      experience,
      linkedin,
      github,
    } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update fields
    if (name !== undefined) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (headline !== undefined) user.headline = headline;
    if (location !== undefined) user.location = location;
    if (bio !== undefined) user.bio = bio;
    if (education !== undefined) user.education = education;
    if (experience !== undefined) user.experience = experience;
    if (linkedin !== undefined) user.linkedin = linkedin;
    if (github !== undefined) user.github = github;

    if (skills !== undefined) {
      user.skills = Array.isArray(skills)
        ? skills
        : skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean);
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        headline: user.headline,
        location: user.location,
        bio: user.bio,
        skills: user.skills,
        education: user.education,
        experience: user.experience,
        linkedin: user.linkedin,
        github: user.github,
        resume: user.resume,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Update Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

// =====================================================
// UPLOAD RESUME
// =====================================================

const uploadResumeController = async (req, res) => {
  try {

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF resume",
      });
    }

    // Get logged-in user
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Save resume path
    user.resume = `/uploads/resumes/${req.file.filename}`;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      resume: user.resume,

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        resume: user.resume,
      },
    });

  } catch (error) {

    console.error(
      "UPLOAD RESUME ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// FORGOT PASSWORD - SEND OTP
// =====================================================

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "No account found with this email",
      });
    }

    // Generate 6 digit OTP
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // OTP expires after 5 minutes
    const otpExpiry = new Date(
      Date.now() + 5 * 60 * 1000
    );

    // Save OTP temporarily
    user.resetPasswordOtp = otp;
    user.resetPasswordOtpExpiry = otpExpiry;

    await user.save();

    // Send email
    await sendResetPasswordEmail(email, otp);

    return res.status(200).json({
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.error("Forgot password error:", error);

    return res.status(500).json({
      message: "Failed to send OTP",
    });
  }
};


const verifyResetOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email",
      });
    }

    if (!user.resetPasswordOtp) {
      return res.status(400).json({
        success: false,
        message: "No reset OTP found. Please request a new OTP.",
      });
    }

    if (
      !user.resetPasswordOtpExpiry ||
      user.resetPasswordOtpExpiry < new Date()
    ) {
      user.resetPasswordOtp = undefined;
      user.resetPasswordOtpExpiry = undefined;

      await user.save();

      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new OTP.",
      });
    }

    if (user.resetPasswordOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });

  } catch (error) {
    console.error("Verify reset OTP error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to verify OTP",
    });
  }
};


const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email",
      });
    }

    // Make sure OTP was generated
    if (!user.resetPasswordOtp) {
      return res.status(400).json({
        success: false,
        message: "Please verify your OTP first",
      });
    }

    // Make sure OTP has not expired
    if (
      !user.resetPasswordOtpExpiry ||
      user.resetPasswordOtpExpiry < new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new OTP",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    // Clear reset OTP after successful password change
    user.resetPasswordOtp = undefined;
    user.resetPasswordOtpExpiry = undefined;

    // Optional but recommended:
    // Log the user out from existing sessions
    user.refreshToken = "";

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });

  } catch (error) {
    console.error("Reset password error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to reset password",
    });
  }
};



const logoutUser = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh Token is required",
      });
    }

    const user = await User.findOne({ refreshToken });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.refreshToken = "";
    await user.save();

    res.clearCookie("refreshToken");

    res.status(200).json({
      success: true,
      message: "Logout Successful",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh Token Missing",
      });
    }

    const decoded = verifyRefreshToken(refreshToken);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.refreshToken !== refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid Refresh Token",
      });
    }

    const newAccessToken = generateAccessToken(user._id, user.role);
const newRefreshToken = generateRefreshToken(user._id, user.role);

// Update refresh token in database
user.refreshToken = newRefreshToken;
await user.save();

res.cookie("refreshToken", newRefreshToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

res.status(200).json({
    success: true,
    message: "Token Refreshed Successfully",
    accessToken: newAccessToken,
});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const sendOtp = async (req, res) => {
  try {

    console.log("SEND OTP BODY:", req.body);


    const { email } = req.body || {};

    if(!email){
      return res.status(400).json({
        success: false,
        message: "Email is Requiresd"
      })
    }

    const existingUser = await User.findOne({ email });

    console.log("================================");
console.log("EMAIL CHECK:", email);
console.log("EXISTING USER:", existingUser);
console.log("DATABASE:", mongoose.connection.name);
console.log("================================");
    if(existingUser){
      return res.status(400).json({
        success:false,
        message:"Email is already registered"
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await OTP.deleteMany({ email })

    await OTP.create({
      email, 
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

     await sendOtpEmail(email, otp);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {

     console.error("SEND OTP ERROR:", error)

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if(!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required"
      });
    }

    const otpData = await OTP.findOne({ email });

    if(!otpData){
      return res.status(400).json({
        success: false,
        message: "OTP not found"
      })
    }

     if (otpData.expiresAt < new Date()) {
      await OTP.deleteOne({ _id: otpData._id });

      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    if (otpData.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    otpData.verified = true;

    await otpData.save();

    res.status(200).json({
      success: true,
      message: "OTP Verified Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

module.exports = {
  sendOtp,
  verifyOtp,
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,  
  getProfile,
  updateProfile,
  uploadResumeController,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
};