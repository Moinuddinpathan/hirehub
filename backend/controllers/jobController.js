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


const updateJob = async (req, res)=>{
    try{
        const job = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            
            {new: true}
        );
        if(!job){
            return res.status(404).json({
                success:false,
                message: "Job not Found"
            });
        }

        res.json({
            success:true,
            message:"Job updated successfully",
            job,
        });
    } catch (error){
        res.status(500).json({
            success:false,
            message:error.message,
        })
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
    updateJob,
    deleteJob,
}