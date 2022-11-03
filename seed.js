// https://www.mongodb.com/developer/products/mongodb/seed-database-with-fake-data/
// https://www.mongodb.com/community/forums/t/seeding-mongodb-nodejs/4038
const {faker} = require('@faker-js/faker');
require('dotenv').config()
const connect = require('./utils/db.js');
const Job = require('./models/jobs_schema.js');


const numOfJobs = 10;
const numOfPara = Math.floor(Math.random() * 8) + 4;
async function seedDb() {
    try {
        await connect();

        Job.deleteMany();

        for (let i = 0; i < numOfJobs; i++) {
            // const fullName = faker.name.fullName();

            const job = new Job();
            job.jobTitle = faker.name.jobTitle();
            job.jobArea = faker.name.jobArea();
            job.location = `${faker.address.county()}, ${faker.address.country()} `;
            job.salary = faker.finance.amount(10, 25, 2, '€');
            job.roleDesc = faker.lorem.paragraphs(numOfPara);
            job.responsibilites = faker.lorem.sentence(Math.floor(Math.random() * 10) + 2)
            job.qualifications = faker.lorem.sentence(Math.floor(Math.random() * 10) + 2)
            job.save()
        }
    }
    catch (err) {
        console.log(err);
    }
}

seedDb();