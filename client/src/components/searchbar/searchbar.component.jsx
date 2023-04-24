import './searchbar.styles.css';

function Searchbar({ handleChange, handleSubmit }) {
    return (
        <div className='search-box'>
            <form onChange={handleChange}>
                <input type='search' placeholder="Country name" />
                <button type='submit' onClick={handleSubmit}>Search</button>
            </form>
        </div>
    );
}

export default Searchbar;