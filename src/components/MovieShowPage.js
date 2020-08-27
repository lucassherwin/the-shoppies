import React from 'react'

export default function MovieShowPage(props) {
    return (
        <div>
            <h1>Movie Show Page</h1>
            <p>This will show movie information</p>
            <h2>{props.title}</h2>
            <p>Released In: {props.releaseYear}</p>
            <p>{props.plot}</p>
        </div>
    )
}