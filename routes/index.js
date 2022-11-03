const express = require('express');
const router = express.Router();

router.use('/api/users', require('./users'));
router.use('/api/jobs', require('./jobs'));


module.exports = router;