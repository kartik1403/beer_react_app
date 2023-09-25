import React, { useState, useEffect } from "react";
import "./styles.css";
function App() {
  const [beers, setBeers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch data from the Punk API when the component mounts.
    fetch("https://api.punkapi.com/v2/beers")
      .then((response) => response.json())
      .then((data) => {
        setBeers(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Filter the beers based on the search term
  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Beer List</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a beer"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="beer-list">
        {loading ? (
          <p>Loading...</p>
        ) : filteredBeers.length === 0 ? (
          <p>No matching beers found.</p>
        ) : (
          filteredBeers.map((beer) => (
            <div key={beer.id} className="beer-card">
              <img src={beer.image_url} alt={beer.name} />
              <h2>{beer.name}</h2>
              <p>{beer.tagline}</p>
              <p>{beer.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
