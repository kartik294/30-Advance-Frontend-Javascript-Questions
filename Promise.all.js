// Implement custom Promise.all

// To implement a custom version of Promise.all, we need to understand its behavior. The Promise.all method takes an iterable of Promise objects and, when all of the promises in the iterable have resolved, returns a single promise that resolves with an array of the resolved values. If any promise in the iterable is rejected, the returned promise is rejected with the reason of the first promise that was rejected.

// Steps to Implement Promise.all:
// Input Validation: Ensure the input is iterable.
// Promise Tracking: Use a counter to track how many promises have resolved.
// Fulfillment Handling: Collect resolved values in an array.
// Rejection Handling: If any promise is rejected, reject the outer promise immediately.
// Custom Promise.all Implementation
// Here's how you can create a custom Promise.all function:

function customPromiseAll(promises) {
  // Ensure the input is iterable
  if (!Array.isArray(promises)) {
    return Promise.reject(
      new TypeError("The input must be an array of promises")
    );
  }

  // Initialize an array to hold resolved values
  const results = new Array(promises.length);
  let resolvedCount = 0; // Counter for resolved promises

  return new Promise((resolve, reject) => {
    // If the promises array is empty, resolve immediately with an empty array
    if (promises.length === 0) {
      return resolve(results);
    }

    // Iterate over the promises
    promises.forEach((promise, index) => {
      // Ensure each item is a promise
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value; // Store the resolved value
          resolvedCount++; // Increment the resolved count

          // If all promises are resolved, resolve the outer promise
          if (resolvedCount === promises.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          // Reject the outer promise if any promise is rejected
          reject(error);
        });
    });
  });
}

// Example Usage
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);
const promise4 = Promise.reject("Error");

customPromiseAll([promise1, promise2, promise3])
  .then((results) => {
    console.log(results); // Output: [1, 2, 3]
  })
  .catch((error) => {
    console.error(error); // This won't run in this example
  });

customPromiseAll([promise1, promise2, promise4])
  .then((results) => {
    console.log(results); // This won't run in this example
  })
  .catch((error) => {
    console.error(error); // Output: 'Error'
  });

//   Explanation:
// Input Validation:

// The function checks if the input is an array of promises. If not, it returns a rejected promise with a TypeError.
// Results and Count Initialization:

// An array results is initialized to store the resolved values.
// A counter resolvedCount is used to track the number of promises that have resolved.
// Promise Execution:

// Each promise is processed with Promise.resolve() to ensure it can be treated as a promise.
// When a promise resolves, its value is stored in the corresponding index of the results array, and the resolvedCount is incremented.
// Resolving the Outer Promise:

// If the resolvedCount matches the number of promises, the outer promise is resolved with the results array.
// If any promise is rejected, the outer promise is immediately rejected with the reason of the first rejected promise.
// Usage Example:

// The first example resolves successfully with all values, while the second example demonstrates how the rejection of one promise affects the overall result.
// Conclusion:
// This custom implementation of Promise.all mimics the behavior of the native Promise.all method, handling both successful resolutions and rejections correctly. You can further extend or modify this function to meet specific requirements or additional error handling needs.
