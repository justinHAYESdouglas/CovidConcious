// let CovidAPI = process.env.COVIDAPI;
let CovidInfo = 'https://api.covidactnow.org/v2/states.json?apiKey=' + '';

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
