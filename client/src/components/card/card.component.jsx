import './card.styles.css';
import {Link} from 'react-router-dom';

function Card( { country }) {

    const {id, flag, name, continents} = country;

    return (
        <div className='card-container'>
            <Link to={`/home/${id}`} style={{ textDecoration: 'none' , color: 'black' }}>
                <h2>{name}</h2>
                <img src={flag} alt={`${name} flag`}/>
                <p>{continents}</p>
            </Link>
        </div>
    );
}

export default Card;