const router = require("express").Router();
const { covidInfo } = require('../models');

router.get('/', async (req, res) => {
    try {
        const covidData = await covidInfo.findAll({
            order: [['StateAbbr', 'ASC']]
        })
        .then(function (covidData) {
            console.log(covidData)
        })
        res.status(200).json(covidData);
    } catch (err) {
        res.status(500).json(err)
    }
    console.log("GET FIRED")
});

router.post('/', async (req, res) => {
    try {
        const covidData = await covidInfo.create(req.body);
        res.status(200).json(covidData);
    } catch (err) {
        res.status(400).json(err);
    }
})

router.put('/', async (req, res) => {
    try {
        const covidData = await covidInfo.update(req.body);
        res.status(200).json(covidData);
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;