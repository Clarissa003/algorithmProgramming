import React, { useState } from "react";

const MovieApp = () => {
  const [movies, setMovies] = useState([]);
  const [originalMovies, setOriginalMovies] = useState([]);
  const [selectedSort, setSelectedSort] = useState("year-asc");
  const [selectedFilter, setSelectedFilter] = useState("");
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
        sortBy: selectedSort, // This will be "rating-asc" or "rating-desc"
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

      <div className="sortBox w-full max-w-2xl space-y-4">
      

        <label className="block text-sm font-semibold">Sort by:</label>
        <select
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
          className="border p-2 text-sm rounded-lg w-full"
        >
          <option value="year-asc">Year (ascendant order)</option>
          <option value="year-desc">Year (descendant order)</option>
          <option value="rating-asc">Rating (ascendant order)</option>
          <option value="rating-desc">Rating (descendant order)</option>
        </select>

        <label className="block text-sm font-semibold">Filter by:</label>
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="border p-2 text-sm rounded-lg w-full"
        >
          <option value="">-- No Filter --</option>
          <option value="oldest">Oldest</option>
          <option value="newest">Newest</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
        </select>

        <button
          onClick={handleImport}
          className="bg-blue-500 text-white px-4 py-2 text-sm rounded-lg w-full"
        >
          Apply Sort / Filter
        </button>
      </div>

      <div className="performanceBox">
        <label>Algorithm: {performance.algorithm}</label>
        {performance.executionTime && (
          <p>Execution Time: {performance.executionTime.toFixed(2)} ms</p>
        )}
      </div>

      <div className="movieBox">
        {movies.length === 0 ? (
          <p>No movies available. Please upload a JSON file.</p>
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