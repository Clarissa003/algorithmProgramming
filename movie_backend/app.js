const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors()); // To enable CORS for React frontend

// Multer setup for file upload
const upload = multer({ dest: 'uploads/' });

let movies = [];

// Movie class with generics
class Movie {
  constructor(title, year, rating) {
    this.title = title;
    this.year = year;
    this.rating = rating;
  }
}

// Merge Sort (by year or rating)
function mergeSort(arr, key) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), key);
  const right = mergeSort(arr.slice(mid), key);

  return merge(left, right, key);
}

function merge(left, right, key) {
  let result = [], i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (key === 'year') {
      if (left[i].year < right[j].year) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    } else if (key === 'rating') {
      if (left[i].rating < right[j].rating) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}

class BinaryHeap {
  constructor(compareFn) {
    this.heap = [];
    this.compare = compareFn; // Comparator to control min/max heap
  }

  push(movie) {
    this.heap.push(movie);
    this._heapifyUp();
  }

  pop() {
    if (this.heap.length === 0) return null;

    const root = this.heap[0];
    const end = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = end;
      this._heapifyDown();
    }

    return root;
  }

  _heapifyUp() {
    let index = this.heap.length - 1;
    const element = this.heap[index];

    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.heap[parentIndex];

      if (this.compare(element, parent) >= 0) break;

      this.heap[index] = parent;
      index = parentIndex;
    }

    this.heap[index] = element;
  }

  _heapifyDown() {
    let index = 0;
    const length = this.heap.length;
    const element = this.heap[0];

    while (true) {
      let leftIdx = 2 * index + 1;
      let rightIdx = 2 * index + 2;
      let swapIdx = null;

      if (leftIdx < length) {
        if (this.compare(this.heap[leftIdx], element) < 0) {
          swapIdx = leftIdx;
        }
      }

      if (rightIdx < length) {
        if (
          this.compare(this.heap[rightIdx], element) < 0 &&
          (swapIdx === null || this.compare(this.heap[rightIdx], this.heap[swapIdx]) < 0)
        ) {
          swapIdx = rightIdx;
        }
      }

      if (swapIdx === null) break;

      this.heap[index] = this.heap[swapIdx];
      index = swapIdx;
    }

    this.heap[index] = element;
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

app.post('/api/movies/import', (req, res) => {
  const { movies: movieData, sortBy, filterBy } = req.body;

  if (!movieData || movieData.length === 0) {
    return res.status(400).send("No movies available to process.");
  }

  // Step 1: Sort using merge sort
  let sortedMovies = mergeSort([...movieData], sortBy);

  // Step 2: Filter using heap
  const compareFn = filterBy === 'newest'
    ? (a, b) => b.year - a.year  // max-heap
    : (a, b) => a.year - b.year; // min-heap

  const heap = new BinaryHeap(compareFn);

  sortedMovies.forEach(movie => heap.push(movie));

  const finalSorted = [];
  while (!heap.isEmpty()) {
    finalSorted.push(heap.pop());
  }

  res.json(finalSorted);
});

  

// Search movies by title (simple search)
app.get('/api/movies/search', (req, res) => {
  const { query } = req.query;
  const result = movies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()));
  res.json(result); // Return search result
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
