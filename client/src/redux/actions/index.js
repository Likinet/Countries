import axios from 'axios';

export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_COUNTRIES_BY_NAME = 'GET_COUNTRIES_BY_NAME';
export const GET_COUNTRY_BY_ID = 'GET_COUNTRY_BY_ID';
export const ORDER_COUNTRIES_BY_NAME = 'ORDER_COUNTRIES_BY_NAME';
export const ORDER_COUNTRIES_BY_POPULATION = 'ORDER_COUNTRIES_BY_POPULATION';
export const FILTER_COUNTRIES = 'FILTER_COUNTRIES';
// export const FILTER_COUNTRIES_BY_CONTINENT = 'FILTER_COUNTRIES_BY_CONTINENT';
// export const FILTER_COUNTRIES_BY_ACTIVITY = 'FILTER_COUNTRIES_BY_ACTIVITY';
export const CLEAR_COUNTRY_DETAIL = 'CLEAR_COUNTRY_DETAIL';
export const POST_ACTIVITY ='POST_ACTIVITY';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';

export function getCountries(){
    return async function(dispatch){
        try {
            const response = await axios.get('http://localhost:3001/countries');
            return dispatch({
                type: GET_COUNTRIES,
                payload: response.data
            })
        } catch (error) {
            console.log(error);
        }
    }
};
export function getCountriesByName(name) {
    return async function(dispatch){
        try {
            const response = await axios.get(`http://localhost:3001/countries/?name=${name}`);
            return dispatch({
                type: GET_COUNTRIES_BY_NAME,
                payload: response.data
            })
        } catch (error) {
            console.log(error);
        }
    }
};
export function getCountryById(id) {
    return async function(dispatch){
        try {
            const response = await axios.get(`http://localhost:3001/countries/${id}`);
            return dispatch({
                type: GET_COUNTRY_BY_ID,
                payload: response.data
            })
        } catch (error) {
            console.log(error);
        }
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
export function filterCountries(filter) {
    return {    
        type: FILTER_COUNTRIES,
        payload:filter 
    }
};
// export function filterCountriesByContinent(continent) {
//     return {    
//         type: FILTER_COUNTRIES_BY_CONTINENT,
//         payload:continent 
//     }
// };
// export function filterCountriesByActivity(activity) {
//     return {    
//         type: FILTER_COUNTRIES_BY_ACTIVITY,
//         payload:activity 
//     }
// };
export function clearCountryDetail() {
    return {
        type: CLEAR_COUNTRY_DETAIL,
    }
};
export function postActivity(activity) {
    return async function(dispatch){
        try {
            const response = await axios.post(`http://localhost:3001/activities/`, activity);
            return dispatch({
                type: POST_ACTIVITY,
                payload: response.data
            })
        } catch (error) {
            console.log(error);
        }
    }
};
export function getActivities() {
    return async function(dispatch){
        try {
            const response = await axios.get(`http://localhost:3001/activities/`);
            return dispatch({
                type: GET_ACTIVITIES,
                payload: response.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}