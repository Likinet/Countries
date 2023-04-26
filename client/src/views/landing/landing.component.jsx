import { Link } from 'react-router-dom';

import './landing.styles.css';

function Landing() {
    return (
        <div className='landing-container'>
            {/* <div className='landing-title'>Hello World!</div>
            <div>You will be able to know the countries of the world, their activities and schedule new adventures!</div> */}
            <Link to='/home' className='button' style={{ textDecoration: 'none' , color: 'black' }}>Explore</Link>
        </div>
    );
}

export default Landing;