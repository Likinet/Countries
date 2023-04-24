const { Activity, Country } = require('../db');

const createActivity = async (countries, name, difficulty, duration, season) => {
    if ( !name || !difficulty || !season )
        throw new Error('Information is missing');
    if ( difficulty < 1 || difficulty > 5 )
        throw new Error('Difficulty must be a number between 1 and 5');
    if ( duration < 0 )
        throw new Error('Duration of activities must be a number greater than zero');
    if ( season < 0 )
        throw new Error('Duration of activities must be a number greater than zero');
    if ( !['spring', 'summer', 'autumn', 'winter'].includes(season) )
        throw new Error('No valid season entered');

    const newActivity = await Activity.create({name, difficulty, duration, season});
    newActivity.addCountries(countries);
    return newActivity;
};
const getActivities = async () => {
    const activities = await Activity.findAll({
        include: [
            {
                model: Country,
                attributes: ['id'],
                through: { attributes: [] }
            }
        ]
    });
    return activities;
};

module.exports = {
    createActivity,
    getActivities,
};