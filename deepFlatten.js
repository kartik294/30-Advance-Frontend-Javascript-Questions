// A custom deep flatten function in JavaScript can be used to transform a nested array into a single-level array. This means that if the input array contains other arrays at any level, those arrays will be "flattened" into a single array.

// Steps to Implement a Deep Flatten Function:
// Recursion: Use recursion to handle nested arrays of arbitrary depth.
// Array Checking: Check if an item is an array before attempting to flatten it.
// Concatenation: Use array methods to combine flattened results into a single array.

//  Implement custom Deep Flatten

// Custom Deep Flatten Implementation
// Here’s how you can create a custom deepFlatten function:

function deepFlatten(arr) {
  let result = []; // Array to hold the flattened results

  // Helper function to recursively flatten the array
  function flatten(item) {
    if (Array.isArray(item)) {
      // If the item is an array, iterate over each element
      item.forEach(flatten);
    } else {
      // If the item is not an array, push it into the result
      result.push(item);
    }
  }

  // Start flattening the input array
  arr.forEach(flatten);

  return result; // Return the flattened array
}

// Example Usage
const nestedArray = [1, [2, [3, 4], 5], [6, 7], 8];
const flattenedArray = deepFlatten(nestedArray);

console.log(flattenedArray); // Output: [1, 2, 3, 4, 5, 6, 7, 8]

// Explanation:
// Outer Function:

// The deepFlatten function initializes an empty array, result, to store the flattened items.
// It defines a helper function, flatten, which handles the recursive flattening of the items.
// Recursive Flattening:

// The flatten function checks if the current item is an array using Array.isArray().
// If it is an array, it iterates over each element, calling flatten recursively.
// If it is not an array, the item is pushed into the result array.
// Execution:

// The input array is iterated over, invoking the flatten function for each item.
// Finally, the result array containing all the flattened elements is returned.

// Example Usage:
// const complexNestedArray = [1, [2, [3, [4, 5], 6], 7], [8, 9], 10];
// const flattened = deepFlatten(complexNestedArray);

// console.log(flattened); // Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Conclusion:
// The deepFlatten function effectively handles arrays of arbitrary depth, returning a single-level array. This implementation can be further extended or optimized based on specific use cases or requirements.
