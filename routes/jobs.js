const express = require('express');
const router = express.Router();
const { loginRequired } = require('../middleware/auth'); // route level middleware


const { 
    newJob,
    allJobs
  } = require('../controllers/job_controller');

router
    .post('/add', loginRequired, newJob)
    .get('/all', allJobs)


module.exports = router;