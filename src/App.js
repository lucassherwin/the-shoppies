import React, { Component } from 'react';
import Search from './components/Search.js';
import MovieShowPage from './components/MovieShowPage.js';
// import Nominations from './Nominations.js';
import axios from 'axios';
import Nominations from './components/Nominations.js';

export class App extends Component {
    state = {
        currentMovie: {
            searchTerm: '',
            title: '',
            releaseYear: null,
            plot: null,
            imdbID: null
        },
        searchTerm: '',
        nominations: [] //max of 5
    }
    
    handleSearch = (searchInput) => {
        console.log('searching');
        console.log(searchInput);
    
        let searchTerm = searchInput.toLowerCase().split(' ').join('+');
    
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
        let currentTitle = this.state.currentMovie.title;
        console.log(currentTitle); //title to be push into nominations
        if(this.state.nominations.length === 5)
        {
          alert('You have selected 5 nominations!');
          console.log(this.state.nominations);
        }
        else
        {
            this.state.nominations.push(currentTitle); //only save the title not the whole object
            //this will make disabling the button easier -> dont need the object at any point
            console.log(this.state.nominations);

            //reset current movie in state
            this.setState({currentMovie: {...this.state.currentMovie, title: ''}})
            this.setState({currentMovie: {...this.state.currentMovie, releaseYear: null}})
            this.setState({currentMovie: {...this.state.currentMovie, plot: ''}})
            this.setState({currentMovie: {...this.state.currentMovie, imdbID: null}})
        }
    }

    removeNomination = (title) => {
        //filter out movie from nominations in state
        console.log('remove');
        // .filter returns an array
        // set that new array = to nominations in state
        // for all the movies that do not have the same title

        console.log(title);
        this.setState({nominations: this.state.nominations.filter(movie => movie.title !== title)})

        //reset currentMovie in state
        this.setState({currentMovie: {...this.state.currentMovie, title: ''}})
        this.setState({currentMovie: {...this.state.currentMovie, releaseYear: null}})
        this.setState({currentMovie: {...this.state.currentMovie, plot: ''}})
        this.setState({currentMovie: {...this.state.currentMovie, imdbID: null}})
    }

    render() {
        return (
            <div>
                <Search searchTerm={this.state.searchTerm} handleSearch={this.handleSearch} />
                
                {this.state.currentMovie.title === '' ? null : <MovieShowPage currentMovie={this.state.currentMovie} nominate={this.nominate} nominations={this.state.nominations} />} 
                
                {this.state.nominations.length === 0 ? null : <Nominations nominations={this.state.nominations} removeNomination={this.removeNomination} />}
            </div>
        )
    }
}

export default App
