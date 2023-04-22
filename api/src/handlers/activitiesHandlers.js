const { createActivity, getActivities } = require('../controllers/activitiesControllers');

const postActivitiesHandler = async (req, res) => {
    const {countries, name, difficulty, duration, season} = req.body;
    try {
        const response = await createActivity(countries, name, difficulty, duration, season);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    };
};
const getActivitiesHandler = async (req, res) => {
    try {
        const response = await getActivities();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = {
    postActivitiesHandler,
    getActivitiesHandler
};