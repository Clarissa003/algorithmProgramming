export function quickSort(arr, compareFn) {
    //if only 1 element, no need for sorting
    if (arr.length <= 1) return arr;

    const pivot = arr[0]; //first element
    //subarrays
    const left = [];
    const right = [];

    //start from index 1 to skip the pivot
    for (let i = 1; i < arr.length; i++) {
        if (compareFn(arr[i], pivot) < 0) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...quickSort(left, compareFn), pivot, ...quickSort(right, compareFn)];
}