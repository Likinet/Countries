import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import {
    postActivity,
    getActivities
} from '../../redux/actions';
import validate from './validation';

import './create.styles.css';

function Create() {
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.fullCountries);
    const activities = useSelector((state) => state.activities);

    const [form, setForm] = useState({
        name: '',
        difficulty: '1',
        duration: 0,
        season: '',
        countries: []
    });
    const [error, setError] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        countries: ''
    });

    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        if (property === 'countries') {
            setForm({
                ...form, countries: form.countries.includes(value)
                    ? [...form.countries]
                    : [...form.countries, value]
            });
            setError(validate({
                ...form, countries: form.countries.includes(value)
                    ? [...form.countries]
                    : [...form.countries, value]
            }));
        } else if (property === 'duration') {
            setForm({ ...form, duration: Number(value) });
            setError(validate({ ...form, duration: Number(value) }));
        }
        else {
            setForm({ ...form, [property]: value });
            setError(validate({ ...form, [property]: value }));
        }
    }

    function handleDelete(id) {
        setForm({
            ...form,
            countries: [...form.countries].filter((elem => elem !== id))
        });
        setError(validate({
            ...form,
            countries: [...form.countries].filter((elem => elem !== id))
        }));
    };

    function handleSubmit(event) {
        event.preventDefault();
        if (form.name === '' || form.duration < 0 || form.difficulty === '' || form.season === '' || !form.countries.length)
            return alert('You must complete the fields correctly');
        if (activities.find(activity => activity.name === form.name))
            return alert('There is already an activity with that name');
        dispatch(postActivity(form));
        dispatch(getActivities());
        alert('Activity Created');
        setForm({
            name: '',
            difficulty: '1',
            duration: 0,
            season: '',
            countries: []
        })
    };

    useEffect(() => {
        dispatch(getActivities());
    }, [dispatch]);

    return (
        <div className='main-container'>
            <div className='header-container'>
            <div className='logo-view'>
                    <img src="img/aeroplano.png" alt="logo" />
                    <h2>New activity...</h2>
                </div>
                <Link to="/home" className="button">Back</Link>
            </div>
            <form onSubmit={handleSubmit} className='form-main-container'>
                <div className='campo-form'>
                    <div className='label-input'>
                        <label htmlFor='name'>Description: </label>
                        <input type='text'
                            name='name'
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>
                    <p className='error'>{error.name}</p>
                </div>

                <div className='campo-form'>
                    <div className='label-input'>
                        <label htmlFor='difficulty'>Difficulty: {form.difficulty}</label>
                        <input type="range"
                            min='1'
                            max='5'
                            name='difficulty'
                            value={form.difficulty}
                            onChange={handleChange}
                        />
                    </div>
                    <p className='error'>{error.difficulty}</p>
                </div>

                <div className='campo-form'>
                    <div className='label-input'>
                        <label htmlFor='duration'>Duration (in hours): </label>
                        <input type='number'
                            step='0.5'
                            name='duration'
                            value={form.duration}
                            onChange={handleChange}
                        />
                    </div>
                    <p className='error'>{error.duration}</p>
                </div>

                <div className='campo-form'>
                    <div className='label-input'>
                        <label htmlFor='season'>Season: </label>
                        <select
                            name='season'
                            value={form.season}
                            onChange={handleChange}
                        >
                            <option value=''>Season</option>
                            <option value='winter'>Winter</option>
                            <option value='summer'>Summer</option>
                            <option value='autumn'>Autumn</option>
                            <option value='spring'>Spring</option>
                        </select>
                    </div>
                    <p className="error">{error.season}</p>
                </div>

                <div className='campo-form'>
                    <div className='label-input'>
                        <label htmlFor='countries'>Country: </label>
                        <select
                            name='countries'
                            onChange={handleChange}>
                            <option> Countries </option>
                            {countries?.map(country =>
                                <option key={country.id} value={country.id}>{country.name}</option>
                            )}
                        </select>
                    </div>
                    <p className="error">{error.countries}</p>
                </div>

                <div className='buttons-container'>
                    {form.countries?.map((id) => (
                        <div key={id}>
                            <input  className="button-country"
                                    type='button'
                                    value={countries.find(country => country.id === id).name}
                                    onClick={() => handleDelete(id)} />
                        </div>
                    ))}
                </div>

                <button type='submit' className='button' id='button-create'>Create Activity</button>

            </form>
        </div>
    );
}

export default Create;