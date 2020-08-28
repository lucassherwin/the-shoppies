import React from 'react'

export default function Nominations(props) {
    return (
        <div>
            <h1>Nominations</h1>
            <ul>
                {/* {props.nominations.length !== 0 ? props.nominations.map((movie, index) => (
                    <li key={index}>{movie.title}</li>
                )) : null} */}
                {props.nominations.map((movie, index) => (
                    <li key={index}>{movie.title}</li>
                ))}
            </ul>
        </div>
    )
}
