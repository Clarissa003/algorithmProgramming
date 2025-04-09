import express from 'express';
import cors from 'cors';
import Movie from './data/Movie.js';
import BinaryHeap from './utils/BinaryHeap.js';
import LinkedList from './data/LinkedList.js';
import { mergeSort } from './utils/MergeSort.js';
import BinaryTree from './utils/BinaryTree.js';
import { quickSort } from './utils/QuickSort.js';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

let movies = [];

//importing, sorting and filtering movies
app.post('/api/movies/import', (req, res) => {
  try {
      const { movies: movieData, sortBy, filterBy, dataStructure } = req.body;

      if (!movieData || movieData.length === 0) {
          return res.status(400).send("No movies available to process.");
      }

      const movieInstances = movieData.map(m => new Movie(m.title, m.year, m.rating, m.image));

      let result = [];
      let algorithmUsed = "None"; // Initialize as "None"
      let dataStructureUsed = "Array";
      let startTime, endTime, executionTime;

      //load data into data strcuture
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
            case 'binarytree':
                const treeCompareFn = (a, b) => a.year - b.year;
                const bst = new BinaryTree(treeCompareFn);
                movieInstances.forEach(movie => bst.insert(movie));
                result = bst.toArray(); 
                dataStructureUsed = "Binary Search Tree";
                break;
          default:
              result = [...movieInstances];
              dataStructureUsed = "Array";
      }
      endTime = performance.now();
      const dataStructureTime = endTime - startTime;

      //apply filters
      if (filterBy === "oldest" || filterBy === "newest") {
          startTime = performance.now();
          const compareFn = filterBy === "newest"
              ? (a, b) => b.year - a.year  
              : (a, b) => a.year - b.year; 

          const filterHeap = new BinaryHeap(compareFn);
          result.forEach(movie => filterHeap.push(movie));

          const topMovie = filterHeap.pop();
          endTime = performance.now();
          executionTime = endTime - startTime;
          algorithmUsed = "Heap Filter";

          return res.json({
              movies: [{
                  title: topMovie.title,   
                  year: topMovie.year,     
                  rating: topMovie.rating, 
                  image: topMovie.image    
              }],
              performance: {
                  algorithm: algorithmUsed,
                  executionTime,
                  dataStructure: dataStructureUsed,
                  dataStructureTime
              }
          });
      } else if (filterBy === "highest" || filterBy === "lowest") {
          startTime = performance.now();
          const compareFn = (a, b) => a.rating - b.rating;
          const bst = new BinaryTree(compareFn);
          result.forEach(movie => bst.insert(movie));

          const filteredMovie = filterBy === "highest" 
              ? bst.findMax()
              : bst.findMin();

          endTime = performance.now();
          executionTime = endTime - startTime;
          algorithmUsed = "Binary Tree";

          return res.json({
              movies: [{
                  title: filteredMovie.title,
                  year: filteredMovie.year,
                  rating: filteredMovie.rating,
                  image: filteredMovie.image
              }],
              performance: {
                  algorithm: algorithmUsed,
                  executionTime,
                  dataStructure: dataStructureUsed,
                  dataStructureTime
              }
          });
      }

      //apply sorting
      if (sortBy) {
          // Extract the base sort key (remove -asc/-desc)
          const sortKey = sortBy.split('-')[0]; // This will get "year", "title", or "rating"
          const sortOrder = sortBy.split('-')[1]; // This will get "asc" or "desc"
          
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
              const compareFn = (a, b) => a.compareRating(b);
              result = quickSort(result, compareFn);
              algorithmUsed = "Quick Sort";
          }

          if (sortOrder === "desc") result.reverse();
          endTime = performance.now();
          executionTime = endTime - startTime;
      }

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

//search movies
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