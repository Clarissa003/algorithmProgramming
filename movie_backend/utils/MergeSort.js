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
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
      }
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
  }
  
  export { mergeSort };
  