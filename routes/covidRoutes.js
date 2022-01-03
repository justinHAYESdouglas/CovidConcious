const router = require("express").Router();
const req = require("express/lib/request");
const { covidInfo } = require('../models');

router.get('/', async (req, res) => {
    console.log("Get Fired")
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

router.put('/*', async (req, res) => {
    console.log(req.params[0])
    console.log("REQ BODY",req.body)

    let newStateInfo = {
        StateAbbr: req.params.id,
        Pop: req.body.Pop,
        TotalVacc: req.body.TotalVacc,
        CompVacc: req.body.CompVacc,
        NewCases: req.body.NewCases,
        Cases: req.body.Cases,
        DensityPerHundredThousand: req.body.DensityPerHundredThousand,
        InfectionRatePerCase: req.body.InfectionRatePerCase,
        NewDeaths: req.body.NewDeaths,
        Deaths: req.body.Deaths,
        BedCap: req.body.BedCap,
        BedUsageTotal: req.body.BedUsageTotal,
        BedUsageCovid: req.body.BedUsageCovid,
        ICUCap: req.body.ICUCap,
        ICUUsageTotal: req.body.ICUUsageTotal,
        ICUUsageCovid: req.body.ICUUsageCovid,
        ICUCapRatio: req.body.ICUCapRatio,
        RiskLevel: req.body.RiskLevel
    }

    
    try {
        let covidUpdate = await covidInfo.update(newStateInfo, {
            where: {
                StateAbbr : req.params[0]
            }
        })
        res.status(200).json(covidUpdate);
    } catch (err) {
        res.status(400).json(err);
    } 
})

module.exports = router;