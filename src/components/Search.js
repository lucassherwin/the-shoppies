import React, { Component } from 'react';
// import axios from 'axios';

export class Search extends Component {
    render() {
        return (
            <div>
                <div>
                    <h1>Search</h1>
                    <p>This is the search page</p>
                    <form>
                        <label>
                        Search Movie: <input type='text' name='movie' onChange={this.props.handleSearch} id='movieSearchBar' />
                        {/* <button onClick={handleClick}>Search</button> */}
                        </label>
                    </form>
                </div>
                <div>
                    <h2>{`Results for: ${this.props.searchTerm}`}</h2>
                    <ul>
                        {this.props.searchResults.map((movie, index) => (
                            <li key={index}>{movie} <button onClick={this.props.nominate} disabled={this.props.nominations.includes(movie)}>Nominate</button></li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Search