const { Schema, model } = require('mongoose');

const jobSchema = new Schema({
    jobTitle: {
        type: String
    },
    jobType: {
        type: String
    },
    jobArea: { 
        type: Schema.Types.ObjectId, 
        ref: 'jobArea'
    },
    location: {
        type: String
    },
    salary: {
        type: String
    },
    roleDesc: {
        type: String
    },
    responsibilites: [{
        type: String
    }],
    qualifications: [{
        type: String
    }]
}, {
    timestamps: true
})

module.exports = model('job', jobSchema)

