const covidRetrieve = {
    async pastCovidData() {
        let response;
        try {
            response = await fetch('/');
        } catch (err) {
            console.log(err)
        }
        const json = await response.json();
    }
}

export default covidRetrieve;