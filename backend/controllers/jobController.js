const Job = require("../models/Job");

const addJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      salary,
      experience,
      // New fields
      jobType,
      workMode,
      skills,
      benefits,
  responsibilities,
      description,
      lastDate,
    } = req.body;




    const job = await Job.create({
      title,
      company,
      location,
      salary,
      experience,
      jobType,
workMode,
        skills: skills
    ? skills.split(",").map((skill) => skill.trim()).filter(Boolean)
    : [],

  responsibilities: responsibilities
    ? responsibilities
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean)
    : [],

  benefits: benefits
    ? benefits
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [],
      description,
      lastDate,

      // Save uploaded logo path
      logo: req.file ? req.file.path : "",
    });

    res.status(201).json({
      success: true,
      message: "Job Added Successfully",
      job,
    });
  } catch (error) {
    console.error("CREATE JOB ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getJobs = async (req, res) => {

  console.log("Search Query:", req.query.search);

    try {

        const { search } = req.query;

        let query = {};

        if (search) {

            query = {

                $or: [

                    {
                        title: {
                            $regex: search,
                            $options: "i",
                        },
                    },

                    {
                        company: {
                            $regex: search,
                            $options: "i",
                        },
                    },

                    {
                        location: {
                            $regex: search,
                            $options: "i",
                        },
                    },

                ],

            };

        }

        const jobs = await Job.find(query);

        res.status(200).json({

            success: true,

            jobs,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};



const getJobById = async (req, res)=>{

    try {
    const job = await Job.findById(req.params.id);

    if(!job) {
        return res.status(404).json({
            success: false,
            message: "Job Not Found",
        });
    }

    res.json({
        success: true,
        job,
    });
} catch (error){
    res.status(500).json({
        success: false,
        message: error.message,
    });
}
};



const getSimilarJobs = async (req, res) => {
    try {
        // Get the current job
        const currentJob = await Job.findById(req.params.id);

        // If job doesn't exist
        if (!currentJob) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        // Create conditions for finding similar jobs
        const conditions = [];

        // 1. Match location
        if (currentJob.location) {
            conditions.push({
                location: {
                    $regex: currentJob.location,
                    $options: "i",
                },
            });
        }

        // 2. Match job type
        if (currentJob.jobType) {
            conditions.push({
                jobType: currentJob.jobType,
            });
        }

        // 3. Match work mode
        if (currentJob.workMode) {
            conditions.push({
                workMode: currentJob.workMode,
            });
        }

        // 4. Match job title
        if (currentJob.title) {
            conditions.push({
                title: {
                    $regex: currentJob.title,
                    $options: "i",
                },
            });
        }

        // 5. Match skills
        if (Array.isArray(currentJob.skills) && currentJob.skills.length > 0) {
            conditions.push({
                skills: {
                    $in: currentJob.skills,
                },
            });
        }

        // Find similar jobs
        const similarJobs = await Job.find({
            _id: {
                $ne: currentJob._id,
            },

            $or: conditions,
        })
            .sort({ createdAt: -1 })
            .limit(3);

        res.status(200).json({
            success: true,
            jobs: similarJobs,
        });

    } catch (error) {
        console.error("Error fetching similar jobs:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch similar jobs",
            error: error.message,
        });
    }
};

const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    console.log("CONTENT TYPE:", req.headers["content-type"]);
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const {
      title,
      company,
      location,
      salary,
      experience,
      jobType,
      workMode,
      skills,
        benefits,
  responsibilities,
      description,
      lastDate,
      status,
    } = req.body;

    // Update fields
    job.title = title ?? job.title;
    job.company = company ?? job.company;
    job.location = location ?? job.location;
    job.salary = salary ?? job.salary;
    job.experience = experience ?? job.experience;
    job.jobType = jobType ?? job.jobType;
    job.workMode = workMode ?? job.workMode;
    job.description = description ?? job.description;
    job.lastDate = lastDate ?? job.lastDate;

    // Only update status when supplied
    if (status) {
      job.status = status;
    }

    // Convert comma-separated skills to array
    if (skills !== undefined) {
      job.skills = Array.isArray(skills)
        ? skills
        : skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean);
    }

// Update responsibilities
if (responsibilities !== undefined) {
  job.responsibilities = Array.isArray(responsibilities)
    ? responsibilities
    : responsibilities
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);
}

// Update benefits
if (benefits !== undefined) {
  job.benefits = Array.isArray(benefits)
    ? benefits
    : benefits
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
}

    // Replace logo only when a new one was uploaded
    if (req.file) {
      job.logo = req.file.path;
    }

    await job.save();

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job,
    });

  } catch (error) {
    console.error("UPDATE JOB ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteJob = async (req, res)=>{
    try{
        const job = await Job.findByIdAndDelete(req.params.id)

        if(!job){
            return res.status(404).json({
                success:false,
                message:"Job not Found"
            });
        }

        res.json({
            success:true,
            message:"Job Deleted Successfully "
        });
    } catch (error) {
        res.status(500).json({
            success:"false",
            message: error.meassage,
        });
    }
}

module.exports = {
    addJob,
    getJobs,
    getJobById,
    getSimilarJobs,
    updateJob,
    deleteJob,
}