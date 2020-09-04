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
        searchTerm: null,
        nominations: [], //max of 5
        searchResults: []
    }
    
    handleSearch = (searchTerm) => {
        // console.log('searching');
        // console.log(searchInput.target.value);
    
        // let searchTerm = searchInput.toLowerCase().split(' ').join('+');
        // this.setState({searchTerm: searchInput.toLowerCase().split(' ').join('+')});
        // this.setState({searchTerm: searchTerm.target.value})
        // console.log(this.state.serachTerm);
        // let search = searchTerm.target.value;
        // console.log(search);
    
        //axios request
        // axios.get(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&t=${search}`)
        // .then(res => {
            // this.setState({currentMovie: {...this.state.currentMovie, title: res.data['Title']}})
            // this.setState({currentMovie: {...this.state.currentMovie, releaseYear: res.data['Year']}})
            // this.setState({currentMovie: {...this.state.currentMovie, plot: res.data['Plot']}})
            // this.setState({currentMovie: {...this.state.currentMovie, imdbID: res.data['imdbID']}})
            // this.state.searchResults.push(res.data) //push the whole movie obj that is returned into the array
        //     if(res.data['Response'] !== "False")
        //     {
        //         console.log('adding: ');
        //         this.state.searchResults.push(res.data) //push the whole movie obj that is returned into the array
        //     }
    
        //     console.log(res.data)
        // })

        let search = searchTerm.target.value;
        this.setState({searchTerm: search});
        // this.props.handleSearch(searchTerm);
        // console.log(search);
        let searchResults = this.state.searchResults;
    
        //axios request
        axios.get(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&t=${search}`)
        .then(res => {
            if(res.data['Response'] !== "False")
            {
                if(!searchResults.includes(res.data['Title'])) //if it doesnt already include the value
                {
                    searchResults.push(res.data['Title']); //push the whole movie obj that is returned into the array\
                    this.setState({searchResults}); //set it to state
                }
            }
        })
    }

    nominate = () => {
		let currentTitle = this.state.currentMovie.title;
      	console.log(currentTitle); //title to be push into nominations
        if(this.state.nominations.length === 5)
        {
        	alert('You have selected 5 nominations!');
        	console.log(this.state.nominations);

          //check if this will make it 5 nominations and alert
        }
        else
        {
            this.state.nominations.push(currentTitle); //only save the title not the whole object
			//this will make disabling the button easier -> dont need the object at any point

			localStorage['nominations'] = JSON.stringify(this.state.nominations); //set localstorage array to nominations from state
			
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
        console.log('remove', title);
        // .filter returns an array
        // set that new array = to nominations in state
		// for all the movies that do not have the same title
		let nominations = this.state.nominations.filter(movie => movie !== title)
		//remove from state
		this.setState({nominations});
		//remove from localstorage
		localStorage['nominations'] = JSON.stringify(nominations);

        //reset currentMovie in state
        this.setState({currentMovie: {...this.state.currentMovie, title: ''}})
        this.setState({currentMovie: {...this.state.currentMovie, releaseYear: null}})
        this.setState({currentMovie: {...this.state.currentMovie, plot: ''}})
		this.setState({currentMovie: {...this.state.currentMovie, imdbID: null}})
	}

    componentDidMount() {
		let nominations = [];
		if(localStorage['nominations'])
		{
			console.log('in mount', localStorage['nominations'])
			nominations = JSON.parse(localStorage['nominations']); //get nominations from localstorage and parse
		}
		this.setState({nominations}); //set state to what was retireved from localstorage
	}

    render() {
        return (
            <div>
                <Search searchTerm={this.state.searchTerm} handleSearch={this.handleSearch} searchResults={this.state.searchResults} />
                
                {this.state.currentMovie.title === '' ? null : <MovieShowPage currentMovie={this.state.currentMovie} nominate={this.nominate} nominations={this.state.nominations} />} 
                
                {this.state.nominations.length === 0 ? null : <Nominations nominations={this.state.nominations} removeNomination={this.removeNomination} />}
            </div>
        )
    }
}

export default App
