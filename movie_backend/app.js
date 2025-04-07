const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

let movies = [];

// Movie class
class Movie {
  constructor(title, year, rating) {
    this.title = title;
    this.year = year;
    this.rating = rating;
  }
}

// Merge Sort (for year only)
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
    if (left[i][key] < right[j][key]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}

// Binary Heap (for oldest/newest)
class BinaryHeap {
  constructor(compareFn) {
    this.heap = [];
    this.compare = compareFn;
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

      if (leftIdx < length && this.compare(this.heap[leftIdx], element) < 0) {
        swapIdx = leftIdx;
      }

      if (
        rightIdx < length &&
        this.compare(this.heap[rightIdx], element) < 0 &&
        (swapIdx === null || this.compare(this.heap[rightIdx], this.heap[swapIdx]) < 0)
      ) {
        swapIdx = rightIdx;
      }

      if (swapIdx === null) break;

      this.heap[index] = this.heap[swapIdx];
      index = swapIdx;
    }

    this.heap[index] = element;
  }
}

// POST /api/movies/import
app.post('/api/movies/import', (req, res) => {
  const { movies: movieData, sortBy, filterBy } = req.body;

  if (!movieData || movieData.length === 0) {
    return res.status(400).send("No movies available to process.");
  }

  let result = [...movieData];

  // Handle filtering (oldest/newest) using heap
  if (filterBy === "oldest" || filterBy === "newest") {
    const compareFn = filterBy === "newest"
      ? (a, b) => b.year - a.year
      : (a, b) => a.year - b.year;

    const heap = new BinaryHeap(compareFn);
    result.forEach(movie => heap.push(movie));
    const topMovie = heap.pop();

    return res.json([topMovie]);
  }

  // Handle sorting
  const [sortKey, sortOrder] = sortBy.split("-");

  if (sortKey === "year") {
    result = mergeSort(result, "year");
    if (sortOrder === "desc") result.reverse();
  } else if (sortKey === "rating") {
    result.sort((a, b) => sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating);
  }

  res.json(result);
});

// Search movies by title
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
