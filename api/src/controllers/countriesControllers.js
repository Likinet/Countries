const { Country, Activity } = require('../db');
const { Op } = require('sequelize');

const getCountries = async (name) => {
    const response =    (name)
                        ? await Country.findAll({ where: {name: {[Op.iLike]: `%${name}%`}} })
                        : await Country.findAll();
    return response;
};
const getCountryById = async (idCountry) => {
    const response = await Country.findByPk(  idCountry, 
                                            { include: {    model: Activity,
                                                            through: { attributes: []}}});
    return response;
};

module.exports = {
    getCountryById,
    getCountries,
};