const express = require('express');
const router = express.Router();
const { loginRequired } = require('../middleware/auth'); // route level middleware


const { 
    newJob,
    allJobs,
    updateJob,
    removeJob,
  } = require('../controllers/job_controller');

router
    .post('/add', loginRequired, newJob)
    .get('/all', allJobs)
    .put('/update/:id', updateJob)
    .delete('/remove/:id', removeJob)


module.exports = router;