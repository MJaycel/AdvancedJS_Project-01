const Job = require('../models/jobs_schema');
const Area = require('../models/jobAreas_schema');

const newJob = (req,res) => {
    
    let jobData = req.body;

    /// Create new job
    Job.create(jobData)
    .then((data) => {

        /// Convert ObjectId (jobArea) to a string
        const areaID = data.jobArea.toString()

        /// push new job to job area object
        Area.findByIdAndUpdate({_id: areaID}, {$push: {jobs: data}})
        .then((data) => {
            console.log('Added to area', data)
        })

        console.log('New job added', data);
        res.status(201).json(data);
        
        /// ERROR I GOT -
        /// Pushing the new job into the job area wasn't working because I didn't realise that jobArea wasn't a String and actually an ObjectId
        /// SOLUTION -
        /// Converted jobArea to a string using toString()
    })
    .catch((error) => {
        res.status(500).json({
            error: error.message
        })
    })
}

/// Gets all jobs
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

            /// update job inside Job Area
            /// Update area with the job id 
            Area.updateOne(
                {"jobs._id": id}, 
                {$set: {
                    "jobs.$.jobTitle": data.jobTitle,
                    "jobs.$.jobType": data.jobType,
                    "jobs.$.jobArea": data.jobArea,
                    "jobs.$.location": data.location,
                    "jobs.$.salary": data.salary,
                    "jobs.$.roleDesc": data.roleDesc,
                    "jobs.$.responsibilites": data.responsibilites,
                    "jobs.$.qualifications": data.qualifications
                    }
                })
            .then((data) => {
                console.log('Added to area', data)
            })
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

            /// Find job area using jobs id and pull from array of jobs
            Area.findOneAndUpdate({"jobs._id": id}, {$pull: {jobs: {_id: id}}})
            .then()

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
    let id = req.params.id;

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

/// Gets all job that have the same area
const getAllInArea = (req,res) => {
    var mongoose = require('mongoose')

    let areaId = mongoose.Types.ObjectId(req.params.areaId);

    Job.find({jobArea: areaId})
    .then((data) => {
        if(data){
            res.status(200).json(data)
        } else{
            res.status(404).json("There are currently no jobs under job area")
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json(err);
    });
}


module.exports = {
    newJob,
    allJobs,
    updateJob,
    removeJob,
    viewOne,
    getAllInArea,
}
