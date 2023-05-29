// this is a slight variation of the previous project, this will dynamically render the
// results when greater than 3 characters are added and debounce time i have taken is 1000ms

import React, { useState } from "react";
import ReactDOM from "react-dom";

const GithubSearch = () => {
  const API_URL = "https://api.github.com";
  const [results, setResults] = useState([]);
  const [x, setIt] = useState(0);
  const [inputValue, setInputValue] = useState(""); //to set the state of input 

  async function fetchDetails() {
    const SEARCH_URL = `${API_URL}/search/users?q=${inputValue}`;

    try {
      const response = await fetch(SEARCH_URL);
      const json = await response.json();

      setResults(json.items);
      setIt(1);
    } catch (e) {
      throw new Error(e);
    }
  }


  //this function will handle  the change when the input is changed i.e
  // greater than 3 characters are added and the debounce time is 1000ms 

  function handleInputChange(event){
    const value = event.target.value;
    setInputValue(value);

    if(value.length > 3){
      setTimeout(fetchDetails, 1000);
    }

  }

// function handleKeyDown(event){
//   if(event.key === "Enter"){
//     event.preventDefault();
//     fetchDetails();
//   }
  
// }

//this was generating an error when the enter was being pressed so to handle that
// we have set onKeyDown to handleKeyDown when the enter is pressed


  return (
    <div>
      <h1>Project 5: GitHub User Search</h1>
      <form>
        <input
          type="text"
          name="input"
          required
          placeholder="Enter username..."
          value={inputValue}
          onChange={handleInputChange}
          // onKeyDown={handleKeyDown}

        />
        <button type="button" onClick={fetchDetails}>
          Search
        </button>
      </form>

      {results !== null && results !== undefined && results.length === 0 && x === 1 ? (
        <div>
          <h2> Results: </h2>
          <p>No Results found!</p>
          <img
            src="https://st2.depositphotos.com/1967477/7519/v/950/depositphotos_75191371-stock-illustration-cartoon-dislike-smile-emoticon.jpg"
            alt="No result"
          />
        </div>
      ) : (
        <div>
          <h2>Results: </h2>
          {Array.isArray(results) && results.length > 0 && (
            results.map((user) => (
              <div key={user.id}>
                <a href={user.html_url}>{user.login}</a>
                <br />
                <img
                  className="userimage"
                  src={user.avatar_url}
                  alt="User Avatar"
                />
                <hr />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};


ReactDOM.render(<GithubSearch />, document.getElementById("root"));
