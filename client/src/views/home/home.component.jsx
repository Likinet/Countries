import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {    getCountries,
            getCountriesByName,
            orderCountriesByName,
            orderCountriesByPopulation,
            filterCountriesByContinent } from '../../redux/actions'

import Navbar from '../../components/navbar/navbar.component';
import Cards from '../../components/cards/cards.component';

import './home.styles.css';
import { useState } from 'react';

function Home() {

    const dispatch = useDispatch();
    const allCountries = useSelector((state)=>state.allCountries);
    const [searchString, setSearchString] = useState('');
    const [order, setOrder] = useState('');
    const [filter, setFilter] = useState('');

    function handleChange(event) {
        event.preventDefault();
        setSearchString(event.target.value);
    };

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(getCountriesByName(searchString))
    };

    function handleOrder(event) {
        const order = event.target.value;

        setOrder(event.target.value);
        if ( order === 'A-Z'|| order === 'Z-A')
            dispatch(orderCountriesByName(event.target.value))
        else
            dispatch(orderCountriesByPopulation(event.target.value))

    };

    function handleFilter(event){
        dispatch(filterCountriesByContinent(event.target.value));
        setFilter(event.target.value);
    };

    useEffect(()=>{
        dispatch(getCountries());
    }, [dispatch]);
    
    return (
        <div className='home-container'>
            <Navbar handleChange={ handleChange } handleSubmit={ handleSubmit }/>


            <div>
                <label for="order" value={order}>Order by: </label>
                <select name='order' onChange={handleOrder}>
                    <option value="" selected>--Please choose an option--</option>
                    <optgroup label="Country names">
                        <option value="A-Z">A-Z countries</option>
                        <option value="Z-A">Z-A countries</option>
                    </optgroup>
                    <optgroup label="Population">
                        <option value="Upward">Upward population</option>
                        <option value="Falling">Falling population</option>
                    </optgroup>
                </select>
                <label for="filter">Filter by: </label>
                <select name='filter' onChange={handleFilter}>
                    <option value='filter' disabled='disabled' >Filter by continent...</option>
                    <option value='All' selected>All</option>
                    <option value='Antarctica'>Antarctica</option>
                    <option value='North America'>North America</option>
                    <option value='Oceania'>Oceania</option>
                    <option value='South America'>South America</option>
                    <option value='Europe'>Europe</option>
                    <option value='Africa'>Africa</option>
                    <option value='Asia'>Asia</option>
                </select>
            </div>


            <Cards allCountries={allCountries} />
        </div>
    );
}

export default Home;