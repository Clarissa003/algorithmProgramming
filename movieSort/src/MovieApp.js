import React, { useState } from "react";

const MovieApp = () => {
  const [movies, setMovies] = useState([]);
  const [originalMovies, setOriginalMovies] = useState([]);
  const [selectedSort, setSelectedSort] = useState("yearAsc");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [performance, setPerformance] = useState({ algorithm: "" });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          setOriginalMovies(json);
          setMovies(json);
        } catch (error) {
          console.error("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleImport = async () => {
    if (originalMovies.length === 0) {
      console.error("No movies available to process.");
      return;
    }

    const response = await fetch("http://localhost:5000/api/movies/import", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movies: originalMovies,
        sortBy: selectedSort,
        filterBy: selectedFilter,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Error response:", text);
      return;
    }

    const data = await response.json();
    setMovies(data.movies || []);
    setPerformance(data.performance || {});
  };

  const handleSearch = async () => {
    const response = await fetch(`http://localhost:5000/api/movies/search?query=${searchQuery}`);
    const data = await response.json();
    setMovies(data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-16 bg-gray-100">
      <h1 className="text-5xl font-bold mb-16">Sort & Search - Movies</h1>

      <div className="mb-12 w-full max-w-3xl">
        <label className="block text-xl font-semibold mb-3 text-gray-800">Upload the JSON movie file:</label>
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="border-2 border-gray-300 p-4 w-full rounded-lg text-base bg-white focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div className="sortBox w-full max-w-3xl space-y-4 mb-8 p-6 bg-white rounded-xl shadow-md">
        <label className="block text-sm font-semibold text-gray-700">Search:</label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search movies..."
          className="border-2 border-gray-300 p-3 text-sm rounded-lg w-full focus:border-blue-500 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-sm rounded-lg w-full font-medium transition-colors duration-200 shadow-sm"
        >
          Search
        </button>

        <label className="block text-sm font-semibold text-gray-700 mt-4">Sort by:</label>
        <select
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
          className="border-2 border-gray-300 p-3 text-sm rounded-lg w-full focus:border-blue-500 focus:outline-none bg-white"
        >
          <option value="none">-- None selected --</option>
          <option value="year-asc">Year (ascendant order)</option>
          <option value="year-desc">Year (descendant order)</option>
          <option value="rating-asc">Rating (ascendant order)</option>
          <option value="rating-desc">Rating (descendant order)</option>
        </select>

        <label className="block text-sm font-semibold text-gray-700 mt-4">Filter by:</label>
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="border-2 border-gray-300 p-3 text-sm rounded-lg w-full focus:border-blue-500 focus:outline-none bg-white padding:80"
        >
          <option value="none">-- No Filter --</option>
          <option value="oldest">Oldest</option>
          <option value="newest">Newest</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
        </select>

        <button
          onClick={handleImport}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-sm rounded-lg w-full font-medium mt-4 transition-colors duration-200 shadow-sm"
        >
          Apply Sort / Filter
        </button>
      </div>

      <div className="performanceBox bg-white p-4 rounded-lg shadow-sm mb-8 w-full max-w-3xl text-center">
        <label className="font-semibold text-gray-700">Algorithm: {performance.algorithm}</label>
        {performance.executionTime && (
          <p className="text-gray-600">Execution Time: {performance.executionTime.toFixed(2)} ms</p>
        )}
      </div>

      <div className="movieBox">
        {movies.length === 0 ? (
          <p className="text-gray-600">No movies available. Please upload a JSON file.</p>
        ) : (
          movies.map((movie, index) => (
            <div key={index} className="movieCard">
              <img src={movie.image} alt={movie.title} className="movieImage" />
              <div className="movieDescription">
                <h3 className="movieDetails">{movie.title}</h3>
                <p className="text-sm">Year: {movie.year}</p>
                <p className="text-sm">Rating: {movie.rating}/10</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MovieApp;