function mergeSort(arr, compareFn) {
    if (arr.length <= 1) return arr; //base case: already sorted

    const mid = Math.floor(arr.length / 2); //divide array in half
    const left = mergeSort(arr.slice(0, mid), compareFn); // left array
    const right = mergeSort(arr.slice(mid), compareFn); //right array

    return merge(left, right, compareFn); //merge sorted halves
}

//merge sorted arrays into one
function merge(left, right, compareFn) {
    let result = [], i = 0, j = 0;

    //compare elements from left and right, adding the smaller one
    while (i < left.length && j < right.length) {
        if (compareFn(left[i], right[j]) < 0) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }

    //concatenate any remaining elements
    return result.concat(left.slice(i)).concat(right.slice(j));
}

export { mergeSort };