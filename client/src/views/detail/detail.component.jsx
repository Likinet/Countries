import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCountryById } from '../../redux/actions';
import { clearCountryDetail } from '../../redux/actions';
import { Link } from 'react-router-dom';

import Activity from '../../components/ativity/activity.component';

import './detail.styles.css';

function Detail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const countryDetail = useSelector((state) => state.countryDetail);

    useEffect(() => {
        dispatch(getCountryById(id));
        return (() => {
            dispatch(clearCountryDetail())
        })
    }, [dispatch, id]);

    return (
        <div>
            <div className='header-container'>
                <div className='logo-view'>
                {/* <img src="img/aeroplano.png" alt="logo" /> */}
                    <h2>Country detail</h2>
                </div>
                <Link to="/home" className="button">Back</Link>
            </div>
            {countryDetail.id ?
                <div key={countryDetail.id} className='countryDetail-container'>
                    <div className='countryDetail'>
                        <div>
                            <img src={countryDetail.flag} alt={`${countryDetail.name} flag`} width='300px' />
                        </div>
                        <div>
                            <h3>{countryDetail.name} ({countryDetail.id})</h3>
                            {<p>Continents: {countryDetail.continents?.map(continent => <span key={continent}>{continent} </span>)}</p>}
                            {<p>Capitals:   {countryDetail.capitals?.map(capital => <span key={capital}>{capital} </span>)}</p>}
                            {countryDetail.subregion && <p>Subregion: {countryDetail.subregion}</p>}
                            {countryDetail.area > 0 && <p>Area: {countryDetail.area}</p>}
                            {countryDetail.population > 0 && <p>Population: {countryDetail.population}</p>}
                        </div>
                    </div>
                    <h3>Activities:</h3>
                    <div>
                        {countryDetail.Activities?.length
                            ? <div className='countryActivities-container'>
                                {countryDetail.Activities?.map(activity => <Activity key={activity.id} activityDetail={activity} />)}
                            </div>
                            : <span>No registered activities</span>}
                    </div>
                </div>
                : <div>Loading...</div>
            }
        </div>
    );
}

export default Detail;