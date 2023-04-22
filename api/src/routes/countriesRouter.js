const { Router } = require('express');
const { getCountriesHandler, getDetailHandler} = require('../handlers/countriesHandlers');

const countriesRouter = Router();

countriesRouter.get('/', getCountriesHandler);
countriesRouter.get('/:idCountry', getDetailHandler);

module.exports = countriesRouter;