import express from 'express';
import cors from 'cors';
import Movie from './data/Movie.js';
import BinaryHeap from './utils/BinaryHeap.js';
import LinkedList from './data/LinkedList.js';
import { mergeSort } from './utils/MergeSort.js';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

let movies = [];

// POST /api/movies/import
app.post('/api/movies/import', (req, res) => {
  try {
      const { movies: movieData, sortBy, filterBy, dataStructure } = req.body;

      if (!movieData || movieData.length === 0) {
          return res.status(400).send("No movies available to process.");
      }

      // Create Movie instances
      const movieInstances = movieData.map(m => new Movie(m.title, m.year, m.rating, m.image));

      let result = [];
      let algorithmUsed = "";
      let dataStructureUsed = "Array";
      let startTime, endTime, executionTime;

      // Store in selected data structure
      startTime = performance.now();
      switch (dataStructure) {
          case 'linkedlist':
              const list = new LinkedList();
              movieInstances.forEach(movie => list.add(movie));
              result = list.toArray();
              dataStructureUsed = "Linked List";
              break;
          case 'heap':
              const heapCompareFn = (a, b) => a.year - b.year;
              const heap = new BinaryHeap(heapCompareFn);
              movieInstances.forEach(movie => heap.push(movie));
              while (!heap.isEmpty()) {
                  result.push(heap.pop());
              }
              dataStructureUsed = "Binary Heap";
              break;
          default:
              result = [...movieInstances];
              dataStructureUsed = "Array";
      }
      endTime = performance.now();
      const dataStructureTime = endTime - startTime;
      
// Filtering
if (filterBy === "oldest" || filterBy === "newest") {
  startTime = performance.now();
  const compareFn = filterBy === "newest"
      ? (a, b) => b.year - a.year  // Make sure to use the getter here
      : (a, b) => a.year - b.year; // Make sure to use the getter here

  const filterHeap = new BinaryHeap(compareFn);
  result.forEach(movie => filterHeap.push(movie));

  // Access the top movie using the getter method
  const topMovie = filterHeap.pop();

  endTime = performance.now();
  executionTime = endTime - startTime;
  algorithmUsed = "Heap Filter";

  return res.json({
      movies: [{
          title: topMovie.title,   // Use the getter to access the title
          year: topMovie.year,     // Use the getter to access the year
          rating: topMovie.rating, // Use the getter to access the rating
          image: topMovie.image    // Use the getter to access the image
      }],
      performance: {
          algorithm: algorithmUsed,
          executionTime,
          dataStructure: dataStructureUsed,
          dataStructureTime
      }
  });
}


      // Sorting
      if (sortBy) {
          const [sortKey, sortOrder] = sortBy.split("-");
          startTime = performance.now();

          if (sortKey === "year") {
              const compareFn = (a, b) => a.year - b.year;
              result = mergeSort(result, compareFn);
              algorithmUsed = "Merge Sort";
          } else if (sortKey === "title") {
              const compareFn = (a, b) => a.title.localeCompare(b.title);
              result = mergeSort(result, compareFn);
              algorithmUsed = "Merge Sort";
          } else if (sortKey === "rating") {
              const compareFn = (a, b) => a.rating - b.rating;
              result = mergeSort(result, compareFn);
              algorithmUsed = "Merge Sort";
          }

          if (sortOrder === "desc") result.reverse();
          endTime = performance.now();
          executionTime = endTime - startTime;
      }

      // Return the movies with getters invoked
      res.json({
          movies: result.map(movie => ({
              title: movie.title,
              year: movie.year,
              rating: movie.rating,
              image: movie.image
          })),
          performance: {
              algorithm: algorithmUsed,
              executionTime,
              dataStructure: dataStructureUsed,
              dataStructureTime
          }
      });
  } catch (error) {
      console.error("Error in import endpoint:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});


// GET /api/movies/search
app.get('/api/movies/search', (req, res) => {
    try {
        const { query, dataStructure } = req.query;
        let result = [];

        if (dataStructure === 'linkedlist') {
            const list = new LinkedList();
            movies.forEach(movie => list.add(movie));
            result = list.toArray().filter(movie =>
                movie.title.toLowerCase().includes(query.toLowerCase())
            );
        } else {
            result = movies.filter(movie =>
                movie.title.toLowerCase().includes(query.toLowerCase())
            );
        }

        res.json(result);
    } catch (error) {
        console.error("Error in search endpoint:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});