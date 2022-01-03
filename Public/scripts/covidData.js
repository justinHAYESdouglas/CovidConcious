import {ApiKeys} from './keys.js';
import {recall} from './dataRecall.js';

let arrayExists = false;

let covidStates = [];
let ReferenceUtcDate;

let CovidInfo = 'https://api.covidactnow.org/v2/states.json?apiKey=' + ApiKeys.CovidApi;

let dayCheck = () => {
    let date = new Date();
    console.log(ReferenceUtcDate);

    if (ReferenceUtcDate == null || undefined || ReferenceUtcDate != date.getUTCDate()){
        initRetrieveData();
        console.log("if " + ReferenceUtcDate);
        return ReferenceUtcDate = date.getUTCDate();
    }  else {
        console.log("Same Day");
        return;
    }
}

async function initRetrieveData() {
    const dataArray = await recall.retrieveData();
    console.log(dataArray);

    if(typeof dataArray == "object"){
        console.log("object")
        arrayExists = true;
    }

    CovidApiCall(arrayExists);
}

let CovidApiCall = (arrayExists) => {

    console.log(arrayExists)

    fetch (CovidInfo)
    .then(response =>{
        console.log(response);
        return response.json();
    })
    .then(data => {
        createStateCovidArray(arrayExists, data)
    });

};

let createStateCovidArray = (arrayExists, data) => {
    for (let i=0; i<data.length; i++){
        let covidState = {};

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
        // Infectivity average of each case.
        covidState.InfectionRatePerCase = data[i].metrics.infectionRate

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

        covidState.RiskLevel = data[i].riskLevels.overall

        covidStates.push(covidState);
        
    }

    console.log(covidStates);

    submitInit(arrayExists, covidStates);

};

let submitInit = (arrayExists, data) => {
    for( let i=0; i<data.length; i++ ) {
        covidSubmit(arrayExists, data[i]);
    }
};

let covidSubmit = (arrayExists, data) => {
    
    if(arrayExists == false){
        const response = fetch('/api', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'omit',
            headers: {'Content-Type' : 'application/json'},
        })
        .then(response =>{
            console.log(response);
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
            console.log(response);
            return response.json();
        })
    }
};

dayCheck();
setInterval(dayCheck, 86400000);