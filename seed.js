// https://www.mongodb.com/developer/products/mongodb/seed-database-with-fake-data/
// https://www.mongodb.com/community/forums/t/seeding-mongodb-nodejs/4038
const {faker} = require('@faker-js/faker');
require('dotenv').config()
const connect = require('./utils/db.js');
const Job = require('./models/jobs_schema.js');


const numOfJobs = 15;
const numOfPara = Math.floor(Math.random() * 8) + 4;
async function seedDb() {
    try {
        await connect();

        await Job.deleteMany({});

        for (let i = 0; i < numOfJobs; i++) {
            // const fullName = faker.name.fullName();
            var responsibilites = [];
            for(let j = 0; j < Math.floor(Math.random() * 10) + 3; j++){
                var resp = faker.lorem.sentence();
                responsibilites.push(resp)
            }

            var qualifications = []
            for(let k = 0; k < Math.floor(Math.random() * 8) + 3; k++){
                var quals = faker.lorem.sentence();
                qualifications.push(quals)
            }

            const job = new Job();
            job.jobTitle = faker.name.jobTitle();
            job.jobArea = faker.name.jobArea();
            job.location = `${faker.address.county()}, ${faker.address.country()} `;
            job.salary = faker.finance.amount(10, 25, 2, '€');
            job.roleDesc = faker.lorem.paragraphs(numOfPara);
            job.responsibilites = responsibilites
            job.qualifications = qualifications
            job.save()
        }
    }
    catch (err) {
        console.log(err);
    }
}

seedDb();