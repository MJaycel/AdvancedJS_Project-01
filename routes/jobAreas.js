const express = require('express');
const router = express.Router();
const { loginRequired } = require('../middleware/auth'); // route level middleware


const { 
    getJobAreas,
  } = require('../controllers/jobArea_controller');

router
    .get('/all', loginRequired, getJobAreas)


module.exports = router;