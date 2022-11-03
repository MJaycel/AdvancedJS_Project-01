// checks to see if there is a user available
const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    }
    else {
        res.status(401).json({
            msg: "Unauthorised User. Please login to make changes"
        })
    }
};

module.exports = {
    loginRequired
}