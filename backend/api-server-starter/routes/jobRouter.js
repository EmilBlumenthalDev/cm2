const express = require('express')

// controller functions
const { createJob, getAllJobs } = require('../controllers/jobController');
const { requireAuth } = require('../middleware/requireAuth');

const router = express.Router();

// create job route
router.post('/', createJob);
router.get('/', getAllJobs);

module.exports = router