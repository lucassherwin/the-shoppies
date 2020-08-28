import React from 'react'

export default function Search(props) {
    let searchInput = React.createRef();

    function handleClick(event) {
        event.preventDefault();
        props.handleSearch(searchInput.current.value)
    }

    return (
        <div>
            <h1>Search</h1>
            <p>This is the search page</p>
            <form>
                <label>
                    Search Movie: <input type='text' name='movie' ref={searchInput} />
                    <button onClick={handleClick}>Search</button>
                </label>
            </form>
        </div>
    )
}
