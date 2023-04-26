import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    getCountries,
    getCountriesByName,
    orderCountriesByName,
    orderCountriesByPopulation,
    filterCountries,
    getActivities
} from '../../redux/actions';

import Searchbar from '../../components/searchbar/searchbar.component';
import Cards from '../../components/cards/cards.component';
import Paginated from '../../components/paginated/paginated.component';

import './home.styles.css';

function Home() {

    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.allCountries);
    const fullCountries = useSelector((state) => state.fullCountries)
    const allActivities = useSelector((state) => state.activities);
    const [searchString, setSearchString] = useState('');
    const [order, setOrder] = useState('');
    const [filter, setFilter] = useState({
        continent: 'All',
        activity: 'All'
    });

    const [currentPage, setCurrentPage] = useState(1);
    const countriesPerPage = 10;
    const lastCountry = currentPage * countriesPerPage;
    const firstCountry = lastCountry - countriesPerPage;
    const currentsCountries = [...allCountries].slice(firstCountry, lastCountry);

    const handlePage = (page) => {
        setCurrentPage(page);
    };

    function handleChange(event) {
        event.preventDefault();
        setSearchString(event.target.value);
    };

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(getCountriesByName(searchString));
        handlePage(1);
    };

    function handleOrder(event) {
        if (event.target.value === 'A-Z' || event.target.value === 'Z-A')
            dispatch(orderCountriesByName(event.target.value))
        else
            dispatch(orderCountriesByPopulation(event.target.value));
        setOrder(event.target.value);
        handlePage(1);
    };

    function handleFilter(event) {
        const filterType = event.target.name;
        const value = event.target.value;

        dispatch(filterCountries({ ...filter, [filterType]: value }));
        setFilter({ ...filter, [filterType]: value });
        handlePage(1);
    };

    useEffect(() => {
        dispatch(getActivities());
        if (!fullCountries.length)
            dispatch(getCountries());
    }, [dispatch]);

    return (
        <div className='main-container'>
            <div className='header-container'>
                <div className='logo-view'>
                    <img src="img/aeroplano.png" alt="logo" />
                    <h2>Countries & fun!</h2>
                </div>
                <Link to="/create" className="button">New activity</Link>
            </div>

            <div className='filter-order-main'>
                <Searchbar handleChange={handleChange} handleSubmit={handleSubmit} />
                <div className='filter-container'>
                    <label htmlFor="order"></label>
                    <select name='order' onChange={handleOrder}>
                        <option value={order} disabled='disabled'>Order by...</option>
                        <optgroup label="Country names">
                            <option value="A-Z">A-Z countries</option>
                            <option value="Z-A">Z-A countries</option>
                        </optgroup>
                        <optgroup label="Population">
                            <option value="Upward">Upward population</option>
                            <option value="Falling">Falling population</option>
                        </optgroup>
                    </select>
                    <label htmlFor="continent"></label>
                    <select name='continent'
                        value={filter.continent}
                        onChange={handleFilter}>
                        <option value='filter' disabled='disabled'>Filter by continent...</option>
                        <option value='All'>All continents</option>
                        <option value='Antarctica'>Antarctica</option>
                        <option value='North America'>North America</option>
                        <option value='Oceania'>Oceania</option>
                        <option value='South America'>South America</option>
                        <option value='Europe'>Europe</option>
                        <option value='Africa'>Africa</option>
                        <option value='Asia'>Asia</option>
                    </select>

                    <label htmlFor='activity'></label>
                    <select
                        name='activity'
                        value={filter.activity}
                        onChange={handleFilter}>
                        <option disabled='disabled' >Filter by activity...</option>
                        <option value='All'> All activities </option>
                        {allActivities?.map(activity =>
                            <option key={activity.id} value={activity.name}>{activity.name}</option>
                        )}
                    </select>
                </div>
            </div>

            <Paginated
                countriesPerPage={countriesPerPage}
                countries={allCountries.length}
                handlePage={handlePage}
                currentPage={currentPage}
            />

            <Cards currentsCountries={currentsCountries} />
        </div>
    );
}

export default Home;