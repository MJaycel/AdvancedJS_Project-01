const express = require('express');
const router = express.Router();
const { loginRequired } = require('../middleware/auth'); // route level middleware


const { 
    newJob,
    allJobs,
    updateJob,
    removeJob,
    viewOne,
    getAllInArea,
  } = require('../controllers/job_controller');

router
    .post('/add', loginRequired, newJob)
    .get('/all', allJobs)
    .put('/update/:id', loginRequired, updateJob)
    .delete('/remove/:id', loginRequired, removeJob)
    .get('/view/:id', loginRequired, viewOne)
    .get('/view/all/area/:areaId', loginRequired, getAllInArea)


module.exports = router;