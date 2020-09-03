import React, { Component } from 'react';
import axios from 'axios';

export class Search extends Component {
    state = {
        searchResults: []
    }

    handleSearch = (searchTerm) => {
        let search = searchTerm.target.value;
        console.log(search);
    
        //axios request
        axios.get(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&t=${search}`)
        .then(res => {
            if(res.data['Response'] !== "False")
            {
                this.state.searchResults.push(res.data) //push the whole movie obj that is returned into the array
            }
    
            console.log('in search: ', res.data)
        })
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Search</h1>
                    <p>This is the search page</p>
                    <form>
                        <label>
                        Search Movie: <input type='text' name='movie' onChange={this.handleSearch} />
                        {/* <button onClick={handleClick}>Search</button> */}
                        </label>
                    </form>
                </div>
                <div>
                    <h2>Results:</h2>
                    <ul>
                        {this.state.searchResults.map((movie, index) => (
                            <li key={index}>{movie['Title']}</li>
                        ))}
                        {console.log(this.state.searchResults)}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Search



// import React from 'react'

// export default function Search(props) {
//     let searchInput = React.createRef();

//     function handleClick(event) {
//         event.preventDefault();
//         props.handleSearch(searchInput.current.value)
//     }

//     return (
//         <div>
//             <h1>Search</h1>
//             <p>This is the search page</p>
//             <form>
//                 <label>
//                     Search Movie: <input type='text' name='movie' onChange={props.handleSearch} ref={searchInput} />
//                     <button onClick={handleClick}>Search</button>
//                 </label>
//             </form>
//             <div>
//                 <h2>Results:</h2>
//                 <ul>
//                     {props.searchResults.map((movie, index) => (
//                         <li key={index}>{movie['Title']}</li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     )
// }