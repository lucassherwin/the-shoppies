import React, { Component } from 'react'

export class Nominations extends Component {
    render() {
        return (
            <div>
                <h1>Nominations</h1>
                <ul>
                    {this.props.nominations.map((movie, index) => (
                        <li key={index}>{movie} <button onClick={() => this.props.removeNomination(movie)}>Remove</button></li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Nominations