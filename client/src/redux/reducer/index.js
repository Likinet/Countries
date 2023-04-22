import {GET_COUNTRIES,
        GET_COUNTRIES_BY_NAME,
        ORDER_COUNTRIES_BY_NAME, 
        ORDER_COUNTRIES_BY_POPULATION,
        FILTER_COUNTRIES_BY_CONTINENT} from '../actions';

let initialState = {    allCountries: [],
                        allCountriesCopy: []};

function compararPorNombre(a, b) {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
};

function rootReducer(state = initialState, action){
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                allCountries: action.payload,
                allCountriesCopy: action.payload
            };
        case GET_COUNTRIES_BY_NAME:
            return {
                ...state,
                allCountries: action.payload,
                allCountriesCopy: action.payload
            };
        case ORDER_COUNTRIES_BY_NAME:
            return {
                ...state,
                allCountries:    action.payload === 'A-Z'
                                ? [...state.allCountries].sort((country1, country2) => compararPorNombre(country1.name,country2.name))
                                : [...state.allCountries].sort((country1, country2) => compararPorNombre(country2.name,country1.name)),
                allCountriesCopy:    action.payload === 'A-Z'
                                ? [...state.allCountriesCopy].sort((country1, country2) => compararPorNombre(country1.name,country2.name))
                                : [...state.allCountriesCopy].sort((country1, country2) => compararPorNombre(country2.name,country1.name))
            };
        case ORDER_COUNTRIES_BY_POPULATION:
            return {
                ...state,
                allCountries:    action.payload === 'Upward'
                                ? [...state.allCountries].sort((country1, country2) => country1.population - country2.population)
                                : [...state.allCountries].sort((country1, country2) => country2.population - country1.population),
                allCountriesCopy:    action.payload === 'Upward'
                                ? [...state.allCountriesCopy].sort((country1, country2) => country1.population - country2.population)
                                : [...state.allCountriesCopy].sort((country1, country2) => country2.population - country1.population),
            };
        case FILTER_COUNTRIES_BY_CONTINENT:
            return {
                ...state,
                allCountries:   action.payload === 'All'
                                ? [...state.allCountriesCopy]
                                : [...state.allCountriesCopy].filter(country => country.continents.includes(action.payload))
            };

        default:
            return {...state};
    }
};

export default rootReducer;