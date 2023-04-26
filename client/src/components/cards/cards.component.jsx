import Card from '../../components/card/card.component';

import './cards.styles.css';

function Cards({ currentsCountries }) {

    return (
        <div className='cards-container'>
            {
                currentsCountries?.map(country => <Card key={country.id} country={country} />)
            }
        </div>
    );
}

export default Cards;