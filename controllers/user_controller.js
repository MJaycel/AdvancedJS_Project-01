const User = require('../models/user_schema');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

//// Register User  
const register = (req, res) => {
    let newUser = new User(req.body)

    if(newUser.password.length >= 8){
        newUser.password = bcrypt.hashSync(req.body.password, 10)
    }

    console.log(newUser)
    //save user to db
    newUser.save((err, user) => {
        if(err) {
            return res.status(422).send({
                message: err
            })
        } else {
            user.password = undefined; // password gets deleted from client. doesnt affect the DB version of User
            return res.status(201).json(user);
        }
    })
}

//// Login User
const login = (req,res) => {
     User.findOne({
         email: req.body.email
     }).then(user => {
         //if user is blank or wrong password 
         if(!user || !user.comparePassword(req.body.password)){
            return res.status(401).json({
                message: "Authentication failed. Invalid user or password"
            })
         } 
         else{
             //create token
            res.json({
                token: jwt.sign({
                    name: user.name,
                    email: user.email,
                _id: user._id
            }, process.env.APP_KEY),
            user
            })
         }

     })
    .catch(err => {
        throw err
        // return res.status(401).json()
    })
}

const getUsers = (req,res) => {
    User.find()
    .then((data) => {
        if(data){
            res.status(200).json(data)
        }
        else {
            res.status(404).json("None found")
        }
    })
    .catch((err)=> {
        console.error(err)
        res.status(500).json("None Found")
    })
}

module.exports = {
    register,
    login,
    getUsers
}




