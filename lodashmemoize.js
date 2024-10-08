//  Implement custom lodash memoize

// Key Concepts:
// Memoization: Store the results of function calls based on input arguments.
// Cache: Use a storage mechanism (like an object) to store results of previous computations.
// Key Generation: Use the function's arguments to create unique keys for the cache. In simple cases, you can use JSON serialization of arguments as keys.

// Custom memoize Implementation

function customMemoize(fn) {
  const cache = new Map(); // Create a cache to store results

  return function (...args) {
    const key = JSON.stringify(args); // Create a unique key for the arguments

    if (cache.has(key)) {
      return cache.get(key); // Return cached result if key exists
    }

    const result = fn.apply(this, args); // Compute the result if not cached
    cache.set(key, result); // Store the result in cache
    return result;
  };
}

// Test function to demonstrate memoization
function slowFunction(num) {
  console.log(`Computing result for ${num}...`);
  return num * num; // Example of an expensive computation
}

// Memoized version of slowFunction
const memoizedSlowFunction = customMemoize(slowFunction);

console.log(memoizedSlowFunction(5)); // Computing result for 5... => 25
console.log(memoizedSlowFunction(5)); // Cached result => 25
console.log(memoizedSlowFunction(6)); // Computing result for 6... => 36
console.log(memoizedSlowFunction(5)); // Cached result => 25

// Explanation:
// Cache: A Map is used to store the results of function calls. The Map is an efficient structure for key-value pairs.
// Key Generation: The key is generated by serializing the arguments using JSON.stringify. This ensures the arguments are uniquely represented.
// Check Cache: If the cache contains the result for the provided arguments, it returns the cached result.
// Compute and Cache: If the result isn't cached, it computes the result using the provided function (fn), stores it in the cache, and then returns it.
// Example Workflow:
// When calling memoizedSlowFunction(5) for the first time, it computes the result and stores it in the cache.
// On subsequent calls with the same argument (memoizedSlowFunction(5)), the cached result is returned without recomputation.
// For different inputs (memoizedSlowFunction(6)), it computes and caches that result.
// Notes:
// Argument Serialization: JSON.stringify works well for simple data types (numbers, strings, arrays, and plain objects). However, this approach might not work well with complex objects like functions, circular references, or non-serializable objects.
// Cache Key Customization: In more advanced cases, you might want to allow custom key generation to handle complex arguments.
// This implementation mimics lodash's memoize for common use cases.
