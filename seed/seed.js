require("dotenv").config();
const sequelize = require('../config/connection');
const { covidInfo } = require('../models');

const covidTemplate = require('./covidTemplate.json');

const seedDatabase = async() => {
    await sequelize.sync({force: true});

    const covidInsert = await covidInfo.create(covidTemplate[0], {
        individualHooks: true,
        returning: true,
    })

    process.exit(0);
}

seedDatabase();