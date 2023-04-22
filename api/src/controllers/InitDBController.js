require('dotenv').config();
const { API_URL } = process.env;
const axios = require('axios');
const { Country } = require('../db');

const initDB = async () => {
    try {
        if (await Country.count() !== 0) return;
        let api = await axios.get(`${API_URL}/all`);
        const countries = api.data?.map(async country => {
            await Country.findOrCreate({
                where: {
                    id: country.cca3,
                    name: country.name.common
                },
                defaults: {
                    flag: country.flags.svg ? country.flags.svg : country.flags.png,
                    continents: country.continents ? country.continents : ['Not found'],
                    capitals: country.capital ? country.capital : ['Not found'],
                    subregion: country.subregion,
                    area: country.area > 0 ? country.area : 0,
                    population: country.population > 0 ? country.population : 0
                },
                row: false
            });
        });
        await Promise.all(countries);
        console.log(countries.length, 'loads in the Countries database');
        return;
    } catch (error) {
        console.log('Error:', error.message);
    }

};

module.exports = initDB;