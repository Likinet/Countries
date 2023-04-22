import './card.styles.css';

function Card( { country }) {

    const {flag, name, continents, population} = country;

    return (
        <div className='card-container'>
            <img src={flag} alt={`${name} flag`}/>
            <h2>{name}</h2>
            <p>{continents}</p>
            <p>{population}</p>
        </div>
    );
}

export default Card;