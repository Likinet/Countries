import React from "react";
import './paginated.styles.css'

export default function Paginated({ countriesPerPage, countries, handlePage, currentPage }) {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(countries / countriesPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <nav className='Paginado'>
            <ul className="Paginado__List">
                {pageNumbers && pageNumbers.map(number => (
                    <li key={number}>
                        <button className={`button ${number===currentPage? 'activo' : ''}`} onClick={() => handlePage(number)}> {number} </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}