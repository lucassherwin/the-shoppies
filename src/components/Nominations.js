import React from 'react'

export default function Nominations(props) {
    return (
        <div>
            <h1>Nominations</h1>
            <ul>
                {props.nominations.map((movie, index) => (
                    <li key={index}>{movie} <button onClick={() => props.removeNomination(movie)}>Remove</button></li>
                ))}
            </ul>
        </div>
    )
}
