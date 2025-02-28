const express = require('express')

// controller functions
const { createJob, getAllJobs, getJob, editJob } = require('../controllers/jobController');
const { requireAuth } = require('../middleware/requireAuth');

const router = express.Router();

// create job route
router.post('/', createJob);
router.get('/', getAllJobs);
router.get('/:id', getJob);
router.put('/:id', editJob); // edit job route


module.exports = router
