const express = require('express');
const router = express.Router();

router.use('/api/users', require('./users'));
router.use('/api/jobs', require('./jobs'));
router.use('/api/jobAreas', require('./jobAreas'))


module.exports = router;