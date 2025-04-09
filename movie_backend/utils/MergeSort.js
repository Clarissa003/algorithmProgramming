function mergeSort(arr, compareFn) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid), compareFn);
    const right = mergeSort(arr.slice(mid), compareFn);
    return merge(left, right, compareFn);
}

function merge(left, right, compareFn) {
    let result = [], i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (compareFn(left[i], right[j]) < 0) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}

export { mergeSort };