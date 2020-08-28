import React from 'react'

export default function MovieShowPage(props) {
    return (
        <div>
            <h1>Movie Show Page</h1>
            <p>This will show movie information</p>
            <h2>{props.currentMovie.title}</h2>
            <p>Released In: {props.currentMovie.releaseYear}</p>
            <p>{props.currentMovie.plot}</p>

            <button onClick={props.nominate}>Nominate!</button>
        </div>
    )
}