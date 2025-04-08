class BinaryHeap {
    constructor(compareFn) {
        this.heap = [];
        this.compare = compareFn;
    }
  
    peek() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    clear() {
        this.heap = [];
    }

    contains(value, compareFn = (a, b) => a === b) {
        return this.heap.some(item => compareFn(item, value));
    }
    
    push(element) {
        this.heap.push(element);
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

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.size() === 0;
    }
}
  
export default BinaryHeap;