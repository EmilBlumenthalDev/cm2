const express = require('express')

// controller functions
const { createJob, getAllJobs, editJob } = require('../controllers/jobController');
const { requireAuth } = require('../middleware/requireAuth');

const router = express.Router();

// create job route
router.post('/', createJob);
router.get('/', getAllJobs);
router.put('/:id', editJob); // edit job route


module.exports = router
