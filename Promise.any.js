//  Implement custom Promise.any

// To implement a custom Promise.any function, we need to understand its behavior. The Promise.any method takes an iterable of Promise objects and, as soon as one of the promises fulfills (resolves), it returns a single promise that resolves with the value from that promise. If no promises in the iterable fulfill (all of them are rejected), then the returned promise is rejected with an AggregateError, a built-in error type that groups together multiple errors.

// Steps to Implement Promise.any:
// Input Handling: Ensure that the input is iterable (like an array).
// Promise Tracking: Use a counter to track how many promises have been rejected.
// Fulfillment Handling: Resolve the outer promise as soon as one of the input promises resolves.
// Rejection Handling: If all promises are rejected, reject the outer promise with an AggregateError.
// Custom Promise.any Implementation
// Here’s how you can create a custom Promise.any function:

function customPromiseAny(promises) {
  // Ensure the input is iterable
  if (!Array.isArray(promises)) {
    throw new TypeError("The input must be an array of promises");
  }

  // Initialize an array to hold rejection reasons
  const errors = [];
  let resolved = false; // Flag to track if any promise resolves
  const promiseCount = promises.length;

  return new Promise((resolve, reject) => {
    if (promiseCount === 0) {
      return reject(new AggregateError([], "All promises were rejected"));
    }

    promises.forEach((promise, index) => {
      // Ensure each item is a promise
      Promise.resolve(promise)
        .then((value) => {
          if (!resolved) {
            resolved = true; // Set the flag to true if a promise resolves
            resolve(value); // Resolve with the value of the first resolved promise
          }
        })
        .catch((error) => {
          errors.push(error); // Push any rejection reason into the errors array
          // Check if all promises have been rejected
          if (errors.length === promiseCount && !resolved) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        });
    });
  });
}

// Example Usage
const promise1 = Promise.reject("Error 1");
const promise2 = Promise.reject("Error 2");
const promise3 = Promise.resolve("Success 3");
const promise4 = Promise.reject("Error 3");

customPromiseAny([promise1, promise2, promise3, promise4])
  .then((result) => {
    console.log(result); // Output: 'Success 3'
  })
  .catch((error) => {
    console.error(error); // This won't run in this example
  });

//   Explanation:
// Input Validation:

// The function checks if the input is an array of promises. If not, it throws a TypeError.
// Error Handling:

// An empty array, errors, is initialized to store any rejection reasons from the promises.
// A boolean flag, resolved, tracks whether any promise has been fulfilled.
// Promise Execution:

// Each promise is processed with Promise.resolve() to ensure that the input can be treated as a promise.
// If a promise resolves successfully, it sets resolved to true and resolves the main promise with the value of the resolved promise.
// Rejection Tracking:

// If a promise is rejected, the error is added to the errors array.
// If all promises are rejected (when the length of the errors array equals the total number of promises), it rejects the main promise with an AggregateError.
// Usage Example:

// In the example, the first two promises reject, the third promise resolves successfully, and customPromiseAny returns that resolved value.
// Conclusion:
// This implementation of Promise.any mimics the behavior of the native Promise.any method and handles cases where all promises might be rejected, providing a meaningful error through AggregateError. You can extend or modify this function as needed based on specific requirements or error handling mechanisms.
