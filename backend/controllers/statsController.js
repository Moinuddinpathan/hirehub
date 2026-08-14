const Job = require("../models/Job");
const User = require("../models/User");
const Application = require("../models/Application");

const getStats = async (req, res) => {
    try {

        // ================================
        // TOTAL ACTIVE JOBS
        // ================================

        const jobsAvailable = await Job.countDocuments({
            status: "Active"
        });


        // ================================
        // TOTAL UNIQUE COMPANIES
        // ================================

        const companies = await Job.distinct("company", {
            status: "Active"
        });


        // ================================
        // TOTAL CANDIDATES
        // ================================

        const candidates = await User.countDocuments({
            role: "user"
        });


        // ================================
        // SUCCESS RATE
        // ================================

        const totalApplications =
            await Application.countDocuments();

        const selectedApplications =
            await Application.countDocuments({
                status: "Selected"
            });


        let successRate = 0;

        if (totalApplications > 0) {

            successRate = Math.round(
                (selectedApplications / totalApplications) * 100
            );

        }


        // ================================
        // RESPONSE
        // ================================

        res.status(200).json({

            success: true,

            stats: {

                jobsAvailable,

                companies: companies.length,

                candidates,

                successRate

            }

        });

    } catch (error) {

        console.log("Get stats error:", error);

        res.status(500).json({

            success: false,

            message: "Failed to fetch statistics."

        });

    }
};


module.exports = {
    getStats
};