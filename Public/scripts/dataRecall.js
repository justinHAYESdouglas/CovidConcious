// Fetch function that returns data from the DB.
const recall = {
    async retrieveData() {
        let response;
        try {
            response = await fetch('/api/', {
                method: 'GET',
                credentials: 'omit',
                headers: {'Content-Type' : 'application/json'},
            })
        } catch (err) {
            console.log(err)
        }

        const json = await response.json();
        return json;
    }
}

export {recall};