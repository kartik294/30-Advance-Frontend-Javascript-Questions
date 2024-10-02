// Implement custom lodash chunk

// To implement a custom version of Lodash's _.chunk function in JavaScript, we need to split an array into smaller arrays (chunks) of a specified size. Each chunk will contain the number of elements specified, except for the last one, which might have fewer elements if the array doesn't divide evenly.

// Custom chunk Implementation
// Here’s how you can implement the chunk function:

function customChunk(array, size) {
  // Return an empty array if the size is less than or equal to 0
  if (size <= 0) return [];

  const result = [];

  // Iterate through the array, slicing it into chunks
  for (let i = 0; i < array.length; i += size) {
    // Push each chunk into the result array
    result.push(array.slice(i, i + size));
  }

  return result;
}

// Example usage:
console.log(customChunk([1, 2, 3, 4, 5, 6, 7], 3));
// Output: [[1, 2, 3], [4, 5, 6], [7]]

console.log(customChunk([1, 2, 3, 4, 5], 2));
// Output: [[1, 2], [3, 4], [5]]

// Explanation:
// Input Parameters:

// array: The array that you want to split into chunks.
// size: The size of each chunk.
// Return Early for Invalid Sizes:

// If the size is less than or equal to 0, we return an empty array because a chunk of size 0 or negative doesn't make sense.
// Chunking Process:

// The loop starts at the first element (i = 0) and iterates over the array, increasing i by size in each iteration.
// In each loop iteration, we use array.slice(i, i + size) to create a chunk of the array starting at index i and ending at i + size (or the end of the array if i + size exceeds the array's length).
// This chunk is then pushed into the result array.
// Final Result:

// After all iterations, the result array contains the chunks, and it is returned.
// Edge Cases:
// Empty Array: If the input array is empty, the function returns an empty array [].
// Size Larger Than Array Length: If the size is larger than the length of the array, the entire array is returned as a single chunk.
// Non-even Chunk Sizes: If the array length is not divisible by the chunk size, the last chunk will contain the remaining elements.

// Example:

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log(customChunk(arr, 2));
// Output: [[1, 2], [3, 4], [5, 6], [7, 8], [9]]

console.log(customChunk(arr, 4));
// Output: [[1, 2, 3, 4], [5, 6, 7, 8], [9]]

console.log(customChunk([], 3));
// Output: []

// This custom chunk implementation mirrors the behavior of Lodash's _.chunk method, allowing you to split an array into smaller arrays of a given size.
