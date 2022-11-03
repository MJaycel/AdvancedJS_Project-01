const express = require('express');
const router = express.Router();
const { loginRequired } = require('../middleware/auth'); // route level middleware


const { 
    newJob,
    allJobs,
    updateJob,
    
  } = require('../controllers/job_controller');

router
    .post('/add', loginRequired, newJob)
    .get('/all', allJobs)
    .put('/update/:id', updateJob)

module.exports = router;