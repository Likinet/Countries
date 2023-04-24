import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {    getCountries,
            getCountriesByName,
            orderCountriesByName,
            orderCountriesByPopulation,
            filterCountriesByContinent,
            filterCountriesByActivity, 
            getActivities} from '../../redux/actions';

import Searchbar from '../../components/searchbar/searchbar.component';
import Cards from '../../components/cards/cards.component';

import './home.styles.css';
import { useState } from 'react';

function Home() {

    const dispatch = useDispatch();
    const allCountries = useSelector((state)=>state.allCountries);
    const allActivities = useSelector((state)=>state.activities);
    const [searchString, setSearchString] = useState('');
    const [order, setOrder] = useState('');
    const [filter, setFilter] = useState({  continent:'',
                                            activity:''});

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
        const filterType = event.target.name;
        const value = event.target.value;

        if (filterType === 'filterContinent') {
            dispatch(filterCountriesByContinent(value));
        };
        if (filterType === 'filterActivity') {
            dispatch(filterCountriesByActivity(value));
        };
        setFilter({ ...filter, [filterType]: value });
    };

    useEffect(()=>{
        dispatch(getActivities());
        if (!allCountries.length)
            dispatch(getCountries());
    }, [dispatch, allCountries]);
    
    return (
        <div className='home-container'>
            <Searchbar handleChange={ handleChange } handleSubmit={ handleSubmit }/>
            <Link to="/create" className="landing-button" style={{ textDecoration: 'none' , color: 'white' }}>New activity</Link>


            <div>
                <label htmlFor="order">Order by: </label>
                <select name='order' value={order} onChange={handleOrder}>
                    <option value="">Please choose an option</option>
                    <optgroup label="Country names">
                        <option value="A-Z">A-Z countries</option>
                        <option value="Z-A">Z-A countries</option>
                    </optgroup>
                    <optgroup label="Population">
                        <option value="Upward">Upward population</option>
                        <option value="Falling">Falling population</option>
                    </optgroup>
                </select>
                <label htmlFor="filterContinent">Filter by: </label>
                <select name='filterContinent' value={filter} onChange={handleFilter}>
                    <option value='filter' disabled='disabled' >Filter by continent...</option>
                    <option value='All'>All continents</option>
                    <option value='Antarctica'>Antarctica</option>
                    <option value='North America'>North America</option>
                    <option value='Oceania'>Oceania</option>
                    <option value='South America'>South America</option>
                    <option value='Europe'>Europe</option>
                    <option value='Africa'>Africa</option>
                    <option value='Asia'>Asia</option>
                </select>
                
                <label htmlFor='filterActivity'>Activities: </label>
                <select
                    name='filterActivity'
                    onChange={handleFilter}>
                    <option disabled='disabled' >Filter by activity...</option>
                    <option value='All'> All activities </option>
                    {allActivities?.map(activity =>
                        <option key={activity.id} value={activity.name}>{activity.name}</option>
                    )}
                </select>
            </div>


            <Cards allCountries={allCountries} />
        </div>
    );
}

export default Home;