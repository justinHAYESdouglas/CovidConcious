// let CovidAPI = process.env.COVIDAPI;
let CovidInfo = 'https://api.covidactnow.org/v2/states.json?apiKey=' + '29430bfd9a794c83856c585beafdb31b';

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