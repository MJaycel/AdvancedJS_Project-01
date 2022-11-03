const express = require('express');
const app = express();
const port = 9000;
const jwt = require("jsonwebtoken");

require('dotenv').config()

require('./utils/db.js')();

app.use(express.json());

app.use(express.static('public'));

app.use((req, res, next) => {
    console.log("Time: ", Date.now());
    res.setHeader('test', "Hello World");
    next();
});
// verify Token
app.use((req,res,next)=> {
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] ==='Bearer'){
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.APP_KEY, (err,decode) => {
            if(err)
                req.user = undefined
                req.user = decode

            next()
        })
    } else{
        req.user = undefined
        next()
    }
})

app.use('/api/users', require('./routes/users'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});