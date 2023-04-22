import Card from '../../components/card/card.component';

import './cards.styles.css';

function Cards({ allCountries }) {

    const countriesList = allCountries;

    return (
        <div className='cards-container'>
        {
            countriesList?.map(country => <Card key={country.id} country = {country} />)
        }
        </div>
    );
}

export default Cards;