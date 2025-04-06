import React, { useState } from "react";

const MovieApp = () => {
  const hardcodedMovies = [
    {
      id: 1,
      title: "Spider-Man: No Way Home",
      year: 2021,
      rating: 8.2,
      image: "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_FMjpg_UX1000_.jpg"
    },
    {
      id: 2,
      title: "The Batman",
      year: 2022,
      rating: 7.9,
      image: "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg"
    },
    {
      id: 3,
      title: "Dune",
      year: 2021,
      rating: 8.0,
      image: "https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg"
    }
  ];
  const [movies, setMovies] = useState([]);
  const [selectedRating, setSelectedRating] = useState("highest");
  const [selectedYear, setSelectedYear] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [performance, setPerformance] = useState({
    algorithm: "Default",
    speed: "0ms"
  });


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
        <div className="sortFilterBox">
          <label className="block text-sm font-semibold mb-1">Sort by:</label>
          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            className="border p-2 text-sm rounded-lg w-full"
          >
            <option value="lowest">Year</option>
            <option value="highest">Rating</option>
          </select>

          <label className="block text-sm font-semibold mb-1">Filter by:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border p-2 text-sm rounded-lg w-full"
          >
            <option value="oldest">Oldest</option>
            <option value="newest">Newest</option>
            <option value="highest">Highest rated</option>
            <option value="lowest">Lowest rated</option>
          </select>
          <button className="bg-green-500 text-white px-4 py-[0.6rem] text-sm rounded-lg w-full h-[42px]">
            Search
          </button>
        </div>

                <div className="performanceBox">
          <label>Algorithm: {performance.algorithm}</label>
          <label>Speed: {performance.speed}</label>
        </div>
      </div>

      <div className="movieBox">
  <div className="movieCard">
    <img 
      src="https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_FMjpg_UX1000_.jpg" 
      alt="Spider-Man: No Way Home" 
      className="movieImage"
    />
    <div className="movieDescription">
      <h3 className="font-semibold text-2xl mb-2 text-gray-800">Spider-Man: No Way Home</h3>
      <div className="movieDetails">
        <span>Year: 2021</span>
        <span>Rating: 8.2/10</span>
      </div>
      <p className="text-gray-700">
        With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.
      </p>
    </div>
  </div>
</div>
    </div>
  );
};

export default MovieApp;