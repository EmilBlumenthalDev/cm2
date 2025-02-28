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

module.exports = { createJob }