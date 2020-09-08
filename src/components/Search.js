import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import '../App.css'

export class Search extends Component {
    render() {
        return (
            <div>
                <div id='movieComponent'>
                    <form>
                        <label>
                        Search Movie: <Input type='text' name='movie' onChange={this.props.handleSearch} id='movieSearchBar' />
                        </label>
                    </form>
                </div>
                <div id='resultsComponent'>
                    <h2 id='resultsHeader'>{`Results for: ${this.props.searchTerm}`}</h2>
                    <ul>
                        {this.props.searchResults.map((movie, index) => (
                            <li key={index}>{movie} <Button variant='contained' onClick={this.props.nominate} disabled={this.props.nominations.includes(movie)} size='small'>Nominate</Button></li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Search