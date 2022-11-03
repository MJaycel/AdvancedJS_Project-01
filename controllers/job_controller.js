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

const updateJob = (req,res) => {
    let id = req.params.id;
    let body = req.body;

    Job.findByIdAndUpdate(id, body, {
        new: true
    })
    .then((data) => {
        if (data) {
            res.status(201).json(data);
        }
        else {
            res.status(404).json({
                "message": `Bad Request. ${id} is not a valid ID`
            });
        }
    })
    .catch((err) => {
        if (err.name === 'ValidationError') {
            console.error('Validation Error!', err);
            res.status(422).json({
                "msg": "Validation Error",
                "error": err.message
            });
        }
        else if (err.name === 'CastError') {
            res.status(404).json({
                "message": `Bad Request. ${id} is not a valid ID`
            });
        }
        else {
            console.error(err);
            res.status(500);
        }
    });
}

module.exports = {
    newJob,
    allJobs,
    updateJob
}
