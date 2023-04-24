import { Link } from 'react-router-dom';

import './landing.styles.css';

function Landing() {
    return (
        <div className="landing-container">
            <img src="'../../img/img_landing.jpg'" alt="" />
            <span className="landing-text">Landing</span>
            <Link to="/home" className="landing-button" style={{ textDecoration: 'none' , color: 'white' }}>Home</Link>
        </div>
    );
}

export default Landing;