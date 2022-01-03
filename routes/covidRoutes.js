const router = require("express").Router();
const { covidInfo } = require('../models');

router.get('/', async (req, res) => {
    try {
        const covidData = await covidInfo.findAll({
            raw: true
        });
        console.log(covidData);
        res.status(200).json(covidData);
    } 
    catch (err) {
        res.status(400).json(err);
    }
})

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