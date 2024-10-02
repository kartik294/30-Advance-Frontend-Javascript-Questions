//  Implement custom lodash memoize once

// The _.memoize function in Lodash caches the result of a function based on its arguments, so subsequent calls with the same arguments return the cached result. The once function is a special case where the function is only executed once, and subsequent calls return the result of the first invocation, no matter the arguments.

// Custom memoizeOnce Implementation
// Here’s how you can implement a combination of memoize and once:

function memoizeOnce(fn) {
  let called = false;
  let cacheResult;

  return function (...args) {
    if (!called) {
      // Call the function only once
      cacheResult = fn.apply(this, args);
      called = true;
    }
    // Return cached result on subsequent calls
    return cacheResult;
  };
}

// Example usage:
const addOnce = memoizeOnce((a, b) => a + b);

console.log(addOnce(1, 2)); // Output: 3 (first call, computes result)
console.log(addOnce(5, 10)); // Output: 3 (subsequent call, returns cached result)
console.log(addOnce(100, 200)); // Output: 3 (returns cached result)

Explanation:
// Memoization Logic:

// We maintain a flag called to track whether the function has already been invoked.
// If it’s the first call (!called), we execute the function and store its result in cacheResult.
// On subsequent calls, we simply return the cached result (cacheResult) without calling the function again.
// Handling Arguments:

// Even if the function is called with different arguments after the first invocation, we always return the result of the initial execution.
// Apply Method:

// fn.apply(this, args) is used to preserve the context (this) and pass the arguments to the original function.
// Example Behavior:

const multiplyOnce = memoizeOnce((x, y) => x * y);

console.log(multiplyOnce(2, 3)); // Output: 6
console.log(multiplyOnce(10, 5)); // Output: 6 (returns cached result)
console.log(multiplyOnce(1, 1));  // Output: 6 (returns cached result)

// Key Features:
// Executed Once: The function is called only once, regardless of how many times you invoke the memoized version, even with different arguments.
// Cached Result: The result of the first invocation is cached and reused for subsequent calls.
// This implementation mimics both memoize and once, ensuring the function runs only once and caches the result for future use.
