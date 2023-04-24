const { Country, Activity } = require('../db');
const { Op } = require('sequelize');

const getCountries = async (name) => {
    const response =    (name)
                        ? await Country.findAll({   where: {name: {[Op.iLike]: `%${name}%`}},
                                                    include: [
                                                        {
                                                            model: Activity,
                                                            attributes: ['name'],
                                                            through: { attributes: [] }
                                                        }
                                                    ]})
                        : await Country.findAll({   include: [
                                                        {
                                                            model: Activity,
                                                            attributes: ['name'],
                                                            through: { attributes: [] }
                                                        }
                                                    ]});
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