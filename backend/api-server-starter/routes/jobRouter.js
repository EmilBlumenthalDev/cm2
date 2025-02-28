const express = require('express')

// controller functions
const { createJob } = require('../controllers/jobController');
const { requireAuth } = require('../middleware/requireAuth');

const router = express.Router();

// create job route
router.post('/create', createJob);

module.exports = router