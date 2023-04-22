import axios from 'axios';

export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_COUNTRIES_BY_NAME = 'GET_COUNTRIES_BY_NAME';
export const ORDER_COUNTRIES_BY_NAME = 'ORDER_COUNTRIES_BY_NAME';
export const ORDER_COUNTRIES_BY_POPULATION = 'ORDER_COUNTRIES_BY_POPULATION';
export const FILTER_COUNTRIES_BY_CONTINENT = 'FILTER_COUNTRIES_BY_CONTINENT';

export function getCountries(){
    return async function(dispatch){
        const response = await axios('http://localhost:3001/countries');
        return dispatch({
            type: GET_COUNTRIES,
            payload: response.data
        })
    }
};
export function getCountriesByName(name) {
    return async function(dispatch){
        const response = await axios(`http://localhost:3001/countries/?name=${name}`);
        return dispatch({
            type: GET_COUNTRIES_BY_NAME,
            payload: response.data
        })
    }
};
export function orderCountriesByName(order) {
    return {    
        type: ORDER_COUNTRIES_BY_NAME,
        payload:order 
    }
};
export function orderCountriesByPopulation(order) {
    return {    
        type: ORDER_COUNTRIES_BY_POPULATION,
        payload:order 
    }
};
export function filterCountriesByContinent(continent) {
    return {    
        type: FILTER_COUNTRIES_BY_CONTINENT,
        payload:continent 
    }
};