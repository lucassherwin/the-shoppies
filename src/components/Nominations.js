import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

export class Nominations extends Component {
    render() {
        return (
            <div id='nominationsComponent'>            
                <h1 id='nominationsHeader'>Nominations</h1>
                <div id='nominationsList'>
                    <ul>
                        {this.props.nominations.map((movie, index) => (
                            <li key={index}>{movie} <Button onClick={() => this.props.removeNomination(movie)} variant="contained" color="secondary" >Remove</Button> </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Nominations