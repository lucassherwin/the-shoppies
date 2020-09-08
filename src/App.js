import React, { Component } from 'react';
import Search from './components/Search.js';
import axios from 'axios';
import Nominations from './components/Nominations.js';
import './App.css';

export class App extends Component {
    state = {
        searchTerm: '',
        nominations: [], //max of 5
        searchResults: [],
        currentMovie: null
    }
    
    handleSearch = (searchTerm) => {
        let search = searchTerm.target.value;
        this.setState({searchTerm: search});
        let searchResults = this.state.searchResults;
        let resultString; //this will have the format 'Title (release date)'
    
        //axios request
        axios.get(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&t=${search}`)
        .then(res => {
            if(res.data['Response'] !== "False")
            {
                resultString = `${res.data['Title']} (${res.data['Year']})`
                if(!searchResults.includes(resultString)) //if it doesnt already include the value
                {
                    searchResults.push(resultString); //push the whole movie obj that is returned into the array
                    // console.log('search results: ', searchResults);
                    this.setState({searchResults}); //set it to state
                }
            }
        })
    }

    nominate = (movieTitle) => {
        let movie = movieTitle.target.parentElement.parentElement.firstChild.data; //gets movie string from list item -> had to change because of material ui
        let nominations = this.state.nominations;
        if(this.state.nominations.length === 4) //next nomination will fill the array
        {
            nominations.push(movie.trim());
            this.setState({nominations});
            localStorage['nominations'] = JSON.stringify(this.state.nominations); //set localstorage array to nominations from state
            document.getElementById('movieSearchBar').value='';
            this.setState({searchResults: []}); //reset search results after nominating a movie
            alert('You have selected 5 nominations!');    
            
        }
        else if(this.state.nominations.length < 4)
        {
            nominations.push(movie.trim());
            this.setState({nominations});
            document.getElementById('movieSearchBar').value='';
            localStorage['nominations'] = JSON.stringify(this.state.nominations); //set localstorage array to nominations from state
            this.setState({searchResults: []}); //reset search results after nominating a movie
        }
    }

    removeNomination = (title) => {
        //filter out movie from nominations in state
        console.log('remove', title);
        // .filter returns an array
        // set that new array = to nominations in state
		// for all the movies that do not have the same title
		let nominations = this.state.nominations.filter(movie => movie !== title)
		//remove from state
		this.setState({nominations});
		//remove from localstorage
		localStorage['nominations'] = JSON.stringify(nominations);
	}

    componentDidMount() {
		let nominations = [];
		if(localStorage['nominations'])
		{
			nominations = JSON.parse(localStorage['nominations']); //get nominations from localstorage and parse
		}
        this.setState({nominations}); //set state to what was retireved from localstorage
	}

    render() {
        return (
            <div>
                <Search searchTerm={this.state.searchTerm} handleSearch={this.handleSearch} searchResults={this.state.searchResults} nominate={this.nominate} nominations={this.state.nominations} />                
                {this.state.nominations.length === 0 ? null : <Nominations nominations={this.state.nominations} removeNomination={this.removeNomination} />}
            </div>
        )
    }
}

export default App
