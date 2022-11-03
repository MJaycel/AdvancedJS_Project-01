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

const removeJob = (req,res) => {
    let id = req.params.id;

    Job.findByIdAndRemove({_id: id})
    .then((data) => {
        if (data) {
            res.status(200).json({
                "message": `Job with ID: ${id} was deleted sucessfully`
            });
        } else {
            res.status(404).json({
                "message": `Job with ID: ${id} was not found`
            });
        }
    })
    // error handling 
    .catch((err) => {
        if (err.name === 'CastError') {
            res.status(404).json({
                "message": `Bad Request. ${id} is not a valid ID`
            });
        }
        else {
            res.status(500).json(err)
        }

    })
}

const viewOne = (req,res) => {
    // to get the ID you need to access the id from the request. to do this create a variable and put it in there
    let id = req.params.id;

    // connect to db and retrieve festival with :id
    Job.findById(id)
    .then((data) => {
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({
                "message": `Jjob with ID: ${id} was not found`
            });
        }
    })

    // error handling 
    .catch((err) => {
        if (err.name === 'CastError') {
            res.status(404).json({
                "message": `Bad Request. ${id} is not a valid ID`
            });
        }
        else {
            res.status(500).json(err);
        }
    })
}

module.exports = {
    newJob,
    allJobs,
    updateJob,
    removeJob,
    viewOne
}
