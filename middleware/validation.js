const jwt = require("jsonwebtoken");

// verify Token
const verifyToken = (req,res,next)=> {
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
}

// checks to see if the user is valid
const validateUser = (req,res,next) => {
    console.log("USER: ")
    console.log(req.user);
    next();
}

module.exports = {verifyToken, validateUser}
