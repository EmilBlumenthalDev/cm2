const express = require('express');

// controller functions
const { createJob, getAllJobs, getJob, editJob, deleteJobById } = require('../controllers/jobController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();
router.get('/', getAllJobs);
// apply the requireAuth middleware to all routes
router.use(requireAuth);

// create job route
router.post('/', createJob);
router.get('/:id', getJob);
router.put('/:id', editJob); // edit job route
router.delete('/:jobId', deleteJobById);

module.exports = router;

