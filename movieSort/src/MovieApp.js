import React, { useState } from "react";

const MovieApp = () => {
  const [movies, setMovies] = useState([]);
  const [selectedRating, setSelectedRating] = useState("year");
  const [selectedYear, setSelectedYear] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  // Handle JSON file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          setMovies(json); // Set the movie data after loading from file
        } catch (error) {
          console.error("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    }
  };

  // Import and apply sorting/filtering
  const handleImport = async () => {
    // Ensure there's movie data before proceeding
    if (movies.length === 0) {
      console.error("No movies available to process.");
      return;
    }
  
    const response = await fetch("http://localhost:5000/api/movies/import", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movies: movies, // Add the movies data here
        sortBy: selectedRating,  // Sort by year or rating
        filterBy: selectedYear,  // Filter by newest or oldest
      }),
    });
  
    if (!response.ok) {
      const text = await response.text();
      console.error("Error response:", text);
      return;
    }
  
    const data = await response.json();
    setMovies(data); // Updates the movie list after sorting/filtering
  };
  

  // Handle searching movies by title
  const handleSearch = async () => {
    const response = await fetch(`http://localhost:5000/api/movies/search?query=${searchQuery}`);
    const data = await response.json();
    setMovies(data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-16 bg-gray-100">
      <h1 className="text-5xl font-bold mb-16">Sort & Search - Movies</h1>

      <div className="mb-12 w-full max-w-2xl">
        <label className="block text-xl font-semibold mb-3">Upload the JSON movie file:</label>
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="border p-4 w-full rounded-lg text-base"
        />
      </div>

      <div className="sortBox">
        <label className="block text-sm font-semibold mb-1">Search:</label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search movies..."
          className="border p-2 text-sm rounded-lg w-full"
        />
        <button onClick={handleSearch} className="bg-green-500 text-white px-4 py-[0.6rem] text-sm rounded-lg w-full h-[42px]">
          Search
        </button>

        <div className="sortFilterBox">
          <label className="block text-sm font-semibold mb-1">Sort by:</label>
          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            className="border p-2 text-sm rounded-lg w-full"
          >
            <option value="year">Year (ascendant order)</option>
            <option value="year">Year (descendant order)</option>
            <option value="rating">Rating (ascendant order)</option>
            <option value="rating">Rating (descendant order)</option>
          </select>

          <label className="block text-sm font-semibold mb-1">Filter by:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border p-2 text-sm rounded-lg w-full"
          >
            <option value="oldest">Oldest</option>
            <option value="newest">Newest</option>
            <option value="newest">Highest rated</option>
            <option value="newest">Lowest Rated</option>
          </select>

          <button
            onClick={handleImport}
            className="bg-green-500 text-white px-4 py-[0.6rem] text-sm rounded-lg w-full h-[42px]"
          >
            Sort
          </button>
        </div>
      </div>

      <div className="movieBox">
        {movies.length === 0 ? (
          <p>No movies available. Please upload a JSON file.</p>
        ) : (
          movies.map((movie, index) => (
            <div key={index} className="movieCard">
              <img src={movie.image} alt={movie.title} className="movieImage" />
              <div className="movieDescription">
                <h3 className="font-semibold text-2xl mb-2 text-gray-800">{movie.title}</h3>
                <div className="movieDetails">
                  <span>Year: {movie.year}</span>
                  <span>Rating: {movie.rating}/10</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MovieApp;
