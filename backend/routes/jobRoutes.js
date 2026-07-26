const express = require("express")
const uploadLogo = require("../middleware/uploadLogo")


const { 
    addJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob,
 } = require("../controllers/jobController")

 const router = express.Router()

 router.post("/", uploadLogo.single("logo"), addJob)

 router.get("/", getJobs);

 router.get("/:id", getJobById);

 router.put("/:id", updateJob);

 router.delete("/:id", deleteJob);

 module.exports = router