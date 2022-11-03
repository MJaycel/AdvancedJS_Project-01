const { Schema, model } = require('mongoose');

const jobSchema = new Schema({
    jobTitle: {
        type: String
    },
    jobArea: {
        type: String
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

