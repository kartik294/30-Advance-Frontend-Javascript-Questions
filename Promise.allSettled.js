//  Implement custom Promise.allSettled

// Key Steps:
// Input Handling: The function accepts an iterable (typically an array) of promises.
// Settling: Each promise should either resolve or reject, and the result should contain information about whether it was fulfilled or rejected.
// Returning Results: After all promises settle, return an array of objects where each object has a status key ("fulfilled" or "rejected") and a value or reason key depending on the outcome.

function customAllSettled(promises) {
  // Return a new Promise that resolves when all input promises settle
  return new Promise((resolve) => {
    const results = []; // To store the results of all promises
    let completedPromises = 0; // Track how many promises have settled

    promises.forEach((promise, index) => {
      // Wrap each promise in its own Promise to handle resolution and rejection
      Promise.resolve(promise)
        .then((value) => {
          results[index] = { status: "fulfilled", value }; // Handle fulfilled promise
        })
        .catch((reason) => {
          results[index] = { status: "rejected", reason }; // Handle rejected promise
        })
        .finally(() => {
          completedPromises++; // Increment count of settled promises
          if (completedPromises === promises.length) {
            resolve(results); // Resolve when all promises have settled
          }
        });
    });
  });
}

// Test cases
const promise1 = Promise.resolve(10);
const promise2 = Promise.reject("Error occurred");
const promise3 = new Promise((resolve) => setTimeout(resolve, 100, "slow"));

customAllSettled([promise1, promise2, promise3]).then((results) => {
  console.log(results);
  // Output:
  // [
  //   { status: "fulfilled", value: 10 },
  //   { status: "rejected", reason: "Error occurred" },
  //   { status: "fulfilled", value: "slow" }
  // ]
});

// Explanation:
// Promise Wrapping: Each promise is wrapped using Promise.resolve(promise) to ensure non-promise values are converted to promises.
// Handling Fulfilled Promises: When a promise resolves, an object with status: "fulfilled" and value: result is pushed to the results array.
// Handling Rejected Promises: When a promise rejects, an object with status: "rejected" and reason: error is added to the results array.
// Tracking Completion: A counter (completedPromises) keeps track of how many promises have settled. Once all promises are settled, the resolve function is called with the results array.
// Behavior Similarities:
// The custom implementation behaves like Promise.allSettled, meaning it waits for all promises to settle, regardless of whether they resolve or reject.
// It returns an array of results where each result is an object indicating the outcome of each promise ("fulfilled" or "rejected").
// This implementation handles various scenarios, including promises that resolve, reject, or take time to settle.
