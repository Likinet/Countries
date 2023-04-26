import {
    GET_COUNTRIES,
    GET_COUNTRIES_BY_NAME,
    GET_COUNTRY_BY_ID,
    ORDER_COUNTRIES_BY_NAME,
    ORDER_COUNTRIES_BY_POPULATION,
    FILTER_COUNTRIES,
    CLEAR_COUNTRY_DETAIL,
    POST_ACTIVITY,
    GET_ACTIVITIES
} from '../actions';

let initialState = {
    allCountries: [],
    allCountriesCopy: [],
    fullCountries: [],
    activities: [],
    countryDetail: {}
};

function compararPorNombre(a, b) {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
};

function filterActivity(activities, name) {
    for (let activity of activities) {
        if (activity.name === name) return true
    }
    return false;
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_COUNTRIES:
            const sortedCountries = action.payload.sort((country1, country2) => compararPorNombre(country1.name, country2.name));
            return {
                ...state,
                allCountries: sortedCountries,
                allCountriesCopy: sortedCountries,
                fullCountries: sortedCountries
            };
        case GET_COUNTRIES_BY_NAME:
            return {
                ...state,
                allCountries: action.payload.sort((country1, country2) => compararPorNombre(country1.name, country2.name)),
                allCountriesCopy: action.payload.sort((country1, country2) => compararPorNombre(country1.name, country2.name))
            };
        case GET_COUNTRY_BY_ID:
            return {
                ...state,
                countryDetail: action.payload
            };
        case ORDER_COUNTRIES_BY_NAME:
            return {
                ...state,
                allCountries: action.payload === 'A-Z'
                    ? [...state.allCountries].sort((country1, country2) => compararPorNombre(country1.name, country2.name))
                    : [...state.allCountries].sort((country1, country2) => compararPorNombre(country2.name, country1.name)),
                allCountriesCopy: action.payload === 'A-Z'
                    ? [...state.allCountriesCopy].sort((country1, country2) => compararPorNombre(country1.name, country2.name))
                    : [...state.allCountriesCopy].sort((country1, country2) => compararPorNombre(country2.name, country1.name))
            };
        case ORDER_COUNTRIES_BY_POPULATION:
            return {
                ...state,
                allCountries: action.payload === 'Upward'
                    ? [...state.allCountries].sort((country1, country2) => country1.population - country2.population)
                    : [...state.allCountries].sort((country1, country2) => country2.population - country1.population),
                allCountriesCopy: action.payload === 'Upward'
                    ? [...state.allCountriesCopy].sort((country1, country2) => country1.population - country2.population)
                    : [...state.allCountriesCopy].sort((country1, country2) => country2.population - country1.population),
            };
        case FILTER_COUNTRIES:
            const { continent, activity } = action.payload;
            const filteredCountries = continent === 'All'
                ? [...state.allCountriesCopy]
                : [...state.allCountriesCopy].filter(country => country.continents.includes(continent));
            return {
                ...state,
                allCountries: activity === 'All'
                    ? filteredCountries
                    : filteredCountries.filter(country => filterActivity(country.Activities, activity))
            };
        case CLEAR_COUNTRY_DETAIL:
            return {
                ...state,
                countryDetail: {}
            };
        case POST_ACTIVITY:
            return {
                ...state,
            };
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload.sort((activity1, activity2) => compararPorNombre(activity1.name, activity2.name))
            };

        default:
            return { ...state };
    }
};

export default rootReducer;