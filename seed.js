// https://www.mongodb.com/developer/products/mongodb/seed-database-with-fake-data/
// https://www.mongodb.com/community/forums/t/seeding-mongodb-nodejs/4038
const {faker} = require('@faker-js/faker');
require('dotenv').config()
const connect = require('./utils/db.js');
const Job = require('./models/jobs_schema.js');
const Area = require('./models/jobAreas_schema.js');



const numOfJobs = 15;
const numOfPara = Math.floor(Math.random() * 8) + 4;
async function seedDb() {
    try {
        await connect();

        /// Delete all existing data
        await Job.deleteMany({});
        await Area.deleteMany({});

        /// Creating job areas
        const jobAreas = [
            "Consulting",
            "Strategy",
            "Digital",
            "Technology",
            "Operations",
            "Digital Engineering and Manufacturing"
        ]
        for(let i = 0; i < jobAreas.length; i++){
            const jobArea = new Area()
            jobArea.jobArea = jobAreas[i]
            await jobArea.save()
        }

        /// Creating new jobs
        for (let i = 0; i < numOfJobs; i++) {
            /// RESPONSIBILITIES
            /// Get random amount of sentences for RESPONSIBILITES
            var responsibilites = [];
            for(let j = 0; j < Math.floor(Math.random() * 10) + 3; j++){
                var resp = faker.lorem.sentence();
                responsibilites.push(resp)
            }

            /// QUALIFICATIONS
            /// Get random amound sentences for QUALIFICATIONS 
            var qualifications = []
            for(let k = 0; k < Math.floor(Math.random() * 8) + 3; k++){
                var quals = faker.lorem.sentence();
                qualifications.push(quals)
            }
            
            /// Gets a random job area
            const area = await Area.findOne().skip(Math.floor(Math.random() * jobAreas.length)).exec();
            
            const job = new Job();
            job.jobTitle = faker.name.jobTitle();
            job.jobArea = area._id
            job.jobType = faker.name.jobType();
            job.location = `${faker.address.county()}, ${faker.address.country()} `;
            job.salary = faker.finance.amount(10, 25, 2, '€');
            job.roleDesc = faker.lorem.paragraphs(numOfPara);
            job.responsibilites = responsibilites
            job.qualifications = qualifications

            /// Save new job and insert jobs in Job Area collections
            job.save()
            .then((data) => {
                const areaID = data.jobArea.toString()
                Area.findByIdAndUpdate({_id: areaID}, {$push: {jobs: data}})
                .then((data) => {
                    console.log('Added to area', data)
                })
            })
        }
    }
    catch (err) {
        console.log(err);
    }
}

seedDb();

/// node seed.js to run seeding