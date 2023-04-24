import './card.styles.css';
import {Link} from 'react-router-dom';

function Card( { country }) {

    const {id, flag, name, continents} = country;

    return (
        <div className='card-container'>
            <Link to={`/home/${id}`} style={{ textDecoration: 'none' , color: 'black' }}>
                <img src={flag} alt={`${name} flag`}/>
                <h2>{name}</h2>
                <p>{continents}</p>
            </Link>
        </div>
    );
}

export default Card;