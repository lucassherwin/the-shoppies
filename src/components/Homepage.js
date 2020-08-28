import React, { Component } from 'react';
import Search from './Search.js';
import MovieShowPage from './MovieShowPage.js';
// import Nominations from './Nominations.js';
import axios from 'axios';
import Nominations from './Nominations.js';

export class Homepage extends Component {
    state = {
        currentMovie: {
            searchTerm: '',
            title: '',
            releaseYear: null,
            plot: null,
            imdbID: null
        },
        searchTerm: '',
        // title: '',
        // releaseYear: null,
        // plot: null,
        // imdbID: null,
        nominations: [] //max of 5
    }
    
    handleSearch = (searchInput) => {
        console.log('searching');
        console.log(searchInput);
    
        let searchTerm = searchInput.toLowerCase().split(' ').join('+');
        console.log(searchTerm);
    
        //axios request
        axios.get(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&t=${searchTerm}`)
        .then(res => {
            this.setState({currentMovie: {...this.state.currentMovie, title: res.data['Title']}})
            this.setState({currentMovie: {...this.state.currentMovie, releaseYear: res.data['Year']}})
            this.setState({currentMovie: {...this.state.currentMovie, plot: res.data['Plot']}})
            this.setState({currentMovie: {...this.state.currentMovie, imdbID: res.data['imdbID']}})
    
            console.log(res.data)
        })
    }

    nominate = () => {
        let movieObj = {
            title: this.state.currentMovie.title,
            releaseYear: this.state.currentMovie.releaseYear,
            imdbID: this.state.currentMovie.imdbID
        };
        console.log(movieObj);
        if(this.state.nominations.length === 5)
        {
            alert('You have selected 5 nominations!');
            console.log(this.state.nominations);
        }
        else
        {
            this.state.nominations.push(movieObj);
            console.log(this.state.nominations);

            this.setState({currentMovie: {...this.state.currentMovie, title: ''}})
            this.setState({currentMovie: {...this.state.currentMovie, releaseYear: null}})
            this.setState({currentMovie: {...this.state.currentMovie, plot: ''}})
            this.setState({currentMovie: {...this.state.currentMovie, imdbID: null}})
        }
    }

    render() {
        return (
            <div>
                <Search searchTerm={this.state.searchTerm} handleSearch={this.handleSearch} />
                {/* <MovieShowPage title={this.state.title} 
                releaseYear={this.state.releaseYear} plot={this.state.plot} nominate={this.nominate} />  */}
                <MovieShowPage currentMovie={this.state.currentMovie} nominate={this.nominate} />
                
                <Nominations nominations={this.state.nominations} />
                <div>
                    {/* <h2>Nominations</h2> */}
                    {/* <ul> */}
                        {/* {this.state.nominations.length !== 0 ? this.state.nominations.map((movie, index) => (
                            <li key={index}>{movie.title}</li>
                        )) : null} */}
                        {/* {this.state.nominations.map((movie, index) => (
                            <li key={index}>{movie.title}</li>
                        ))} */}
                    {/* </ul> */}
                </div>
            </div>
        )
    }
}

export default Homepage
