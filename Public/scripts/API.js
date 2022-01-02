import {ApiKeys} from './config.js';

console.log(ApiKeys);
let CovidInfo = 'https://api.covidactnow.org/v2/states.json?apiKey=' + ApiKeys.CovidApi;

fetch (CovidInfo)
    .then(response =>{
        console.log(response);
        return response.json();
    })
    .then(data => {
        console.log(data);
        return {
            data
        };
    });