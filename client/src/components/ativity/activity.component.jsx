import './activity.styles.css';

function Activity({ activityDetail }) {

    const {name, difficulty, duration, season} = activityDetail;

    return (
        <span className='activity-container'>
            <h4>{name}</h4>
            <p>Difficulty (scale from 1 to 5): {difficulty}</p>
            <p>Duration: {duration} hours</p>
            <p>Season: {season}</p>
        </span>
    );
}

export default Activity;