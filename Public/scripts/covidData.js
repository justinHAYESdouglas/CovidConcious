import {ApiKeys} from './keys.js';
import {recall} from './dataRecall.js';

let arrayExists = false;

let covidStates = [];
let ReferenceUtcDate;

let CovidInfo = 'https://api.covidactnow.org/v2/states.json?apiKey=' + ApiKeys.CovidApi;

// Init function, checks if 1 day has passed to refresh data on a daily basis.
let dayCheck = () => {
    let date = new Date();

    if (ReferenceUtcDate == ReferenceUtcDate != date.getUTCDate() || null || undefined ){
        initRetrieveData();
        return ReferenceUtcDate = date.getUTCDate();
    }  else {
        console.log("Same Day");
        return;
    }
}

let dataArrayPh = {};
dataArrayPh.exists = false;

// Fetch call to DB to see if prior data already exists, also passes through placeholder values.
async function initRetrieveData() {
    const dataArray = await recall.retrieveData();

    for(let i = 0; i < dataArray.length; i++){
        if(dataArray[i].StateAbbr == "PH"){
            dataArrayPh.exists = true,
            dataArrayPh.state = dataArray[i].StateAbbr
        }
    }
    if(typeof dataArray == "object" && dataArray.length > 0){
        arrayExists = true;
    }

    CovidApiCall(arrayExists, dataArrayPh);
}

// Fetch call to Covid API to return state data.
let CovidApiCall = (arrayExists, phCheck) => {

    fetch (CovidInfo)
    .then(response =>{
        return response.json();
    })
    .then(data => {
        createStateCovidArray(arrayExists, data, phCheck)
    });

};

// Returns API request data as an array of objects usable by the site. -- Can be refactored for
// clearer pathing.
let createStateCovidArray = (arrayExists, data, phCheck) => {
    for (let i=0; i<data.length; i++){
        let covidState = {};

        covidState.ICUCapRatRl = data[i].riskLevels.icuCapacityRatio,
        covidState.InfectionRateRl = data[i].riskLevels.infectionRate,
        covidState.PositiveRatioRl = data[i].riskLevels.testPositivityRatio,
        covidState.ContactTracersRl = data[i].riskLevels.contactTracerCapacityRatio,
        covidState.DensityRl = data[i].riskLevels.caseDensity,
        covidState.RiskLevelRl = data[i].riskLevels.overall,

        covidState.StateAbbr = data[i].state,
        covidState.Pop = data[i].population,

        // Total vaccinations completed.
        covidState.TotalVacc = data[i].actuals.vaccinationsCompleted,
        // Ratio of vaccinations completed.
        covidState.CompVacc = data[i].metrics.vaccinationsCompletedRatio,

        covidState.NewCases = data[i].actuals.newCases,
        covidState.Cases = data[i].actuals.cases,

        // Case # per hundred thousand.
        covidState.DensityPerHundredThousand = data[i].metrics.caseDensity,

        covidState.NewDeaths = data[i].actuals.newDeaths,
        covidState.Deaths = data[i].actuals.deaths,

        covidState.BedCap = data[i].actuals.hospitalBeds.capacity,
        covidState.BedUsageTotal = data[i].actuals.hospitalBeds.currentUsageTotal,
        covidState.BedUsageCovid = data[i].actuals.hospitalBeds.currentUsageCovid,

        covidState.ICUCap = data[i].actuals.icuBeds.capacity,
        covidState.ICUUsageTotal = data[i].actuals.icuBeds.currentUsageTotal,
        covidState.ICUUsageCovid = data[i].actuals.icuBeds.currentUsageCovid,
        // Ratio of staffed ICU beds currently in use.
        covidState.ICUCapRatio = data[i].metrics.icuCapacityRatio,

        covidStates.push(covidState);
        
    }
    submitInit(arrayExists, covidStates, phCheck);
};

// Iterates over API request data to submit to DB.
let submitInit = (arrayExists, data, phCheck) => {
    for( let i=0; i<data.length; i++ ) {
        covidSubmit(arrayExists, data[i], phCheck);
    }
};

// Either posts data from api query to DB, or updates existing data.
let covidSubmit = (arrayExists, data, phCheck) => {

    if(arrayExists == false || phCheck.exists == true){
        const response = fetch('/api', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'omit',
            headers: {'Content-Type' : 'application/json'},
        })
        .then(response =>{

            if(phCheck.exists == true && response.ok){
                cleanUpPlaceHolder(phCheck);
            };

            return response.json();
        })
    } 
    
    else if(arrayExists == true){
        let id = data.StateAbbr;
        const response = fetch('/api/' + id, {
            method: 'PUT',
            body: JSON.stringify(data),
            credentials: 'omit',
            headers: {'Content-Type' : 'application/json'},
        })
        .then(response =>{
            return response.json();
        })
    }
};

// Cleans up placeholder data left behind by DB seed.
let cleanUpPlaceHolder = (phCheck) => {
    const deletePH = fetch('/api/delete/' + phCheck.state, {
        method: 'DELETE',
        credentials: 'omit',
        headers: {'Content-Type' : 'application/json'},
    }).then(res => {
        console.log(res.json());
        console.log(deletePH);
    })
    return phCheck.exists = false;
}

// Init function.
dayCheck();

setInterval(dayCheck, 86400000);