import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { postActivity } from '../../redux/actions';

import './create.styles.css';

function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'You must fill this field above'
    } else
        errors.name = '';
    if (input.duration < 0)
        errors.duration = 'Duration must be greater than zero'
    else
        errors.duration = '';
    if (!input.difficulty) {
        errors.difficulty = 'You must choose the difficulty'
    } else
        errors.difficulty = '';
    if (!['winter', 'summer', 'autumn', 'spring'].includes(input.season)) {
        errors.difficulty = 'You must choose the season'
    }
    else
        errors.season = '';
    if (!input.countries.length ) {
        errors.countries = 'You must select at least one country'
    }
    else
        errors.countries = '';
    return errors;
}

function Create() {
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.fullCountries);
    
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
        countries:''
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
            setError(validate({ ...form, countries: form.countries.includes(value)
                                                    ? [...form.countries]
                                                    : [...form.countries, value]
            }));
        } else if(property === 'duration'){
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
        })
    };

    function handleSubmit(event){
        event.preventDefault();
        if (form.name === '' || form.duration < 0 || form.difficulty === '' || form.season === '' || !form.countries.length)
            return alert('You must complete the fields correctly');
        dispatch(postActivity(form));
        alert('Activity Created');
        setForm({
            name: '',
            difficulty: '1',
            duration: 0,
            season: '',
            countryId: []
        })
    };


    return (
        <form onSubmit={handleSubmit}>
            <Link to="/home" className="landing-button" style={{ textDecoration: 'none' , color: 'white' }}>Back</Link>
            <h3>Plan your activity</h3>

            <div>
                <label htmlFor='name'>* Description: </label>
                <input  type='text'
                        name='name'
                        value={form.name}
                        onChange={handleChange}
                />
                <p className='error'>{error.name}</p>
            </div>

            <div>
                <label htmlFor='difficulty'>* Difficulty: {form.difficulty}</label>
                <input  type="range"
                        min='1'
                        max='5'
                        name='difficulty'
                        value={form.difficulty}
                        onChange={handleChange}
                />
                <p className='error'>{error.difficulty}</p>
            </div>

            <div>
                <label htmlFor='duration'>Duration (in hours): </label>
                <input  type='number'
                        step='0.5' 
                        name='duration'
                        value={form.duration}
                        onChange={handleChange}
                />
                <p className='error'>{error.duration}</p>
            </div>

            <div>
                <label htmlFor='season'>* Season: </label>
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
                <p className="error">{error.season}</p>
            </div>

            <div>
            <label htmlFor='countries'>Season: </label>
                <select
                        name='countries'
                        onChange={handleChange}>
                    <option> Countries </option>
                    {countries?.map(country =>
                        <option key={country.id} value={country.id}>{country.name}</option>
                    )}
                </select>
                <p className="error">{error.countries}</p>
            </div>

            <div>
                {form.countries?.map((id) => (
                    <div>
                        <input className="Form__Button" type='button' value='X' onClick={() => handleDelete(id)} />
                        <p>{countries.find(country => country.id === id).name}</p>
                    </div>
                ))}
            </div>

            <div>
                <button type='submit'>Create Activity</button>
            </div>
        </form>
    );
}

export default Create;