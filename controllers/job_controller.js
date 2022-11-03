const Job = require('../models/jobs_schema');

const newJob = (req,res) => {
    let jobData = req.body;

    Job.create(jobData)
    .then((data) => {
        console.log('New job added', data);
        res.status(201).json(data);
    })
    .catch((error) => {
        res.status(500).json({
            error: error.message
        })
    })
}

const allJobs = (req,res) => {
    Job.find()
    .then((data) => {
        if(data){
            res.status(200).json(data)
        } else{
            res.status(404).json("There are currently no jobs")
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json(err);
    });
}

module.exports = {
    newJob,
    allJobs
}
