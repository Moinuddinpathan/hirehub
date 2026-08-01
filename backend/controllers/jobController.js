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
      skills: skills ? skills.split(",") : [],
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
  try {
    const jobs = await Job.find();

    res.json({
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

    const currentJob = await Job.findById(req.params.id);

    if (!currentJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const jobs = await Job.find({
      _id: { $ne: currentJob._id },
    })
      .limit(3);

    res.json({
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