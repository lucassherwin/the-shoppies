import React from 'react'

export default function MovieShowPage(props) {
    return (
        <div>
            <h2>{props.currentMovie.title}</h2>
            <p>Released In: {props.currentMovie.releaseYear}</p>
            <p>{props.currentMovie.plot}</p>
            <button onClick={props.nominate} disabled={props.nominations.includes(props.currentMovie.title)}>Nominate!</button>
            {console.log(props.nominations.includes(props.currentMovie.title))}
        </div>
    )
}