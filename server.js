const express = require('express');
const { verifyToken } = require('./middleware/validation.js');
const router = require('./routes/index.js')
const app = express();
const port = 9000;

require('dotenv').config()
require('./utils/db.js')();
require('./middleware/validation.js');

app.use(express.json());

app.use(express.static('public'));
app.use(verifyToken)
app.use(router)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});