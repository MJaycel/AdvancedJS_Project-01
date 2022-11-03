const express = require('express');
const { verifyToken , validateUser} = require('./middleware/validation.js');
const router = require('./routes/index.js')
const app = express();
const port = 9000;

require('dotenv').config()
require('./utils/db.js')();

app.use(express.json());

app.use(express.static('public'));
app.use(verifyToken)
app.use(validateUser)
app.use(router)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});