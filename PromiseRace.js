// The Promise.race method in JavaScript takes an iterable (such as an array) of promises and returns a promise that resolves or rejects as soon as one of the promises in the iterable resolves or rejects. The behavior of Promise.race is such that the first promise to settle (either resolve or reject) determines the outcome.

// Here's how you can implement a custom version of Promise.race:

// Custom Promise.race Implementation

function customPromiseRace(promises) {
  return new Promise((resolve, reject) => {
    // Iterate over the array of promises
    for (const promise of promises) {
      // Resolve or reject as soon as any promise settles
      Promise.resolve(promise).then(resolve).catch(reject);
    }
  });
}

// Example usage:

const promise1 = new Promise((resolve) => setTimeout(resolve, 100, "First"));
const promise2 = new Promise((resolve) => setTimeout(resolve, 200, "Second"));
const promise3 = new Promise((_, reject) => setTimeout(reject, 50, "Rejected"));

customPromiseRace([promise1, promise2, promise3])
  .then((value) => {
    console.log("Resolved with:", value); // This will output: "Rejected"
  })
  .catch((error) => {
    console.log("Rejected with:", error); // Output: "Rejected"
  });

//   Explanation:
// Input: The customPromiseRace function takes an iterable (like an array) of promises.
// New Promise: We return a new Promise. Inside this promise, we iterate through each promise in the promises array.
// Promise.resolve(): We wrap each promise with Promise.resolve() to ensure that any non-promise values passed in the array are also treated as resolved promises.
// Resolve or Reject: We attach .then() and .catch() to each promise:
// When a promise resolves, we call resolve() to settle the custom Promise.race.
// When a promise rejects, we call reject() to reject the custom Promise.race.
// As soon as any promise either resolves or rejects, the race finishes.
// Behavior:
// First Settled Promise: Whichever promise resolves or rejects first will determine the outcome of the Promise.race.
// Settling Order: If a promise rejects first, Promise.race will reject, even if other promises resolve later.
// Handling Non-Promises: If non-promise values (like regular values or objects) are provided in the input, they are automatically resolved by Promise.resolve.
// Example:

const fast = new Promise((resolve) => setTimeout(resolve, 100, "fast"));
const slow = new Promise((resolve) => setTimeout(resolve, 500, "slow"));

customPromiseRace([fast, slow])
  .then((result) => console.log(result)) // Output: "fast"
  .catch((error) => console.log(error));

//   In this case, since fast resolves first after 100ms, the result of Promise.race will be "fast", and slow will be ignored.

// Edge Cases:
// Empty Array: If the array is empty, the returned promise will remain pending forever, as there are no promises to race.
// Non-Promise Values: Values in the array that aren't promises are automatically resolved using Promise.resolve().
// This implementation mimics the behavior of the native Promise.race method.
