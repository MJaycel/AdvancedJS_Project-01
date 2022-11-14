const Area = require('../models/jobAreas_schema');

/// Gets all job areas
const getJobAreas = (req,res) => {
    Area.find()
    .then((data) => {
        if(data){
            res.status(200).json(data)
        } else{
            res.status(404).json("There are no job areas")
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json(err);
    });
}

module.exports = {
    getJobAreas,
}
