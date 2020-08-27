import React from 'react'

export default function Search(props) {
    // const searchInput = useRef(null);
    let searchInput = React.createRef();
    // console.log(searchInput.value)

    function handleClick(event) {
        event.preventDefault();
        // console.log(searchInput.current.value);
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
