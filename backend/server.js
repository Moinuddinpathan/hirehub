const dotenv = require("dotenv");
dotenv.config();
const path = require("path");

const session = require("express-session");
const passport = require("./config/passport");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");



const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const savedJobRoutes = require("./routes/savedJobRoutes")

const userRoutes = require("./routes/userRoutes");

const adminRoutes = require("./routes/adminRoutes");
const statsRoutes = require("./routes/statsRoutes")

// dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "jobportal_secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes)
app.use("/api/applications", applicationRoutes)
app.use("/api/saved-jobs", savedJobRoutes);


app.use("/api/users", userRoutes);

app.use("/api/stats", statsRoutes);


// Test Route
app.get("/", (req, res) => {
  res.send("Job Portal API Running...");
});
app.use("/api/admin", adminRoutes);


// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on Port ${PORT}`);
});