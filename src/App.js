import React, { Component } from 'react';
import './App.css';
import Search from './components/Search.js';
import MovieShowPage from './components/MovieShowPage.js';
import Nominations from './components/Nominations.js';
import axios from 'axios';

class App extends Component {
  state = {
    searchTerm: '',
    title: '',
    releaseYear: null,
    plot: null,
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
      this.setState({title: res.data['Title']})
      this.setState({releaseYear: res.data['Year']})
      this.setState({plot: res.data['Plot']})

      console.log(res.data)
    })
  }

  nominate = () => {
    let movieObj = {
      title: this.state.title,
      releaseYear: this.state.releaseYear
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
    }
  }

  render() {
    let {title, releaseYear, plot} = this.state;
    return (
      <div>
        <Search searchTerm={this.state.searchTerm} handleSearch={this.handleSearch} />
        <MovieShowPage title={title} releaseYear={releaseYear} plot={plot} nominate={this.nominate} />
        <Nominations />
      </div>
    )
  }
}

export default App
