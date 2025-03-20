import React, { useState } from "react";

const MovieApp = () => {
  const [movies, setMovies] = useState([]);
  const [selectedRating, setSelectedRating] = useState("highest");
  const [selectedYear, setSelectedYear] = useState("newest");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          setMovies(json);
        } catch (error) {
          console.error("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Sort & Search - Movies</h1>

      <div className="mb-4">
        <label className="mr-2 font-semibold">Upload the JSON movie file:</label>
        <input type="file" accept=".json" onChange={handleFileUpload} className="border p-1" />
      </div>

      <div className="flex gap-4 mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Sort by Year</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Sort by Rating</button>
      </div>

      <div className="flex gap-4 mb-4 items-center">
        <label className="font-semibold">Search for:</label>
        <select
          value={selectedRating}
          onChange={(e) => setSelectedRating(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="lowest">Lowest Rated</option>
          <option value="highest">Highest Rated</option>
        </select>
        <button className="bg-green-500 text-white px-4 py-2 rounded">Search</button>
      </div>

      <div className="flex gap-4 items-center">
        <label className="font-semibold">Search for:</label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="oldest">Oldest</option>
          <option value="newest">Newest</option>
        </select>
        <button className="bg-green-500 text-white px-4 py-2 rounded">Search</button>
      </div>
    </div>
  );
};

export default MovieApp;