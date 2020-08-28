import React from 'react'

export default function Nominations(props) {
    return (
        <div>
            <h1>Nominations</h1>
            <ul>
                {props.nominations.map((movie) => (
                    <li key={movie.imdbID}>{movie.title} <button onClick={() => props.removeNomination(movie.title)}>Remove</button></li>
                ))}
            </ul>
        </div>
    )
}
