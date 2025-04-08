// File: app.js
import express from 'express';
import cors from 'cors';
import Movie from './data/Movie.js';
import BinaryHeap from './utils/BinaryHeap.js';
import { mergeSort } from './utils/MergeSort.js';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

let movies = [];

// POST /api/movies/import
app.post('/api/movies/import', (req, res) => {
  const { movies: movieData, sortBy, filterBy } = req.body;

  if (!movieData || movieData.length === 0) {
    return res.status(400).send("No movies available to process.");
  }

  // Create Movie instances
  const movieInstances = movieData.map(m => new Movie(m.title, m.year, m.rating, m.image));

  let result = [...movieInstances];
  let algorithmUsed = "";
  let startTime, endTime, executionTime;

  // Filtering using BinaryHeap
  if (filterBy === "oldest" || filterBy === "newest") {
    startTime = performance.now();
    const compareFn = filterBy === "newest"
      ? (a, b) => b.year - a.year
      : (a, b) => a.year - b.year;

    const heap = new BinaryHeap(compareFn);
    result.forEach(movie => heap.push(movie));
    const topMovie = heap.pop();
    endTime = performance.now();
    executionTime = endTime - startTime;
    algorithmUsed = "Heap";

    return res.json({ movies: [topMovie], performance: { algorithm: algorithmUsed, executionTime } });
  }

  const [sortKey, sortOrder] = sortBy.split("-");

  if (sortKey === "year") {
    startTime = performance.now();
  
    // Define the compareFn to compare based on the 'year'
    const compareFn = (a, b) => a.year - b.year;
  
    result = mergeSort(result, compareFn);
  
    // Reverse the order if sortOrder is 'desc'
    if (sortOrder === "desc") result.reverse();
  
    endTime = performance.now();
    executionTime = endTime - startTime;
    algorithmUsed = "Merge Sort";
  }

  res.json({ movies: result, performance: { algorithm: algorithmUsed, executionTime } });
});

// GET /api/movies/search
app.get('/api/movies/search', (req, res) => {
  const { query } = req.query;
  const result = movies.filter(movie =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );
  res.json(result);
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
