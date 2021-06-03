const axios = require('axios');

const baseUrl = 'https://swapi.dev/api/planets/';

const getPlanet = async (planetName) => {
    const request = await axios.get(`${baseUrl}?search=${planetName}`);
    return request.data;
};

module.exports = getPlanet;