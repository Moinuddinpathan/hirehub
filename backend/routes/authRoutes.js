const express = require("express");



const {
  registerUser,
  loginUser,
  sendOtp,
  verifyOtp,
  logoutUser,
  refreshAccessToken,
  getProfile,  
  forgotPassword,
  verifyResetOtp,
  resetPassword,
} = require("../controllers/authController");

const passport = require("passport")

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/google",
   passport.authenticate("google",{
      scope: ["profile", "email"],
  session:false,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/login",
  }),
  async (req, res) => {
    try {
      const {
        generateAccessToken,
        generateRefreshToken,
      } = require("../utils/generateToken");

      
        const user = req.user;

        const accessToken = generateAccessToken(user._id, user.role);
        const refreshToken = generateRefreshToken(user._id, user.role);

         user.refreshToken = refreshToken;
      await user.save();

      res.cookie("refreshToken", refreshToken, {
        httpOnly : true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.redirect(
        `http://localhost:5173/google-success?token=${accessToken}`
      );
    } catch (err) {
      console.log(err);
      res.redirect("http://localhost:5173/login");
    }
  }
)
  
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-otp", verifyResetOtp);
router.post("/reset-password", resetPassword);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.post("/refresh-token", refreshAccessToken);

router.get("/profile", authMiddleware, getProfile);



module.exports = router;