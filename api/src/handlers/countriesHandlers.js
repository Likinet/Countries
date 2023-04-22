const { getCountryById, getCountries } = require('../controllers/countriesControllers');

const getCountriesHandler = async (req, res) => {
    const { name } = req.query;
    
    try {
        const response = await getCountries(name);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    };
};
const getDetailHandler = async (req, res) => {
    const { idCountry } = req.params;

    try {
        const response = await getCountryById(idCountry);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    };
};

module.exports = {
    getCountriesHandler,
    getDetailHandler
};