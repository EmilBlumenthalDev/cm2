const Job = require('../models/jobModel');

// create job post
const createJob = async (req, res) => {
  const {
    title,
    type,
    location,
    description,
    salary,
    company
  } = req.body

  try {
    const job = await Job.createJobPost(
        title, 
        type, 
        location, 
        description, 
        salary, 
        company
    )

    res.status(200).json({job})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const deleteJobById = async (req, res) => {
    const jobId = req.params.jobId
    try {
        const result = await Job.deleteJobById(jobId)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getAllJobs = async (req, res) => {
    /*
    /api/jobs?_limit=3
    */

    const limit = req.query._limit ? parseInt(req.query._limit) : 10
    console.log("limit", limit);

    try {
        let jobs = []
        if (limit) {
            jobs = await Job.find().limit(limit);
        } else {
            jobs = await Job.find();
        }

        res.status(200).json(jobs)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getJob = async (req, res) => {
    const { id } = req.params

    try {
        const job = await Job.findById(id);
        res.status(200).json(job)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { createJob, getAllJobs, deleteJobById, getJob }