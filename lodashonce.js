//  Implement custom lodash once

// Lodash’s _.once function creates a function that will only execute once, no matter how many times it is called. On subsequent calls, it returns the result of the first invocation.

// Here’s how you can implement a custom once function in JavaScript:

// Custom once Implementation

function customOnce(fn) {
  let called = false; // To track if the function has been called
  let result; // To store the result of the first call

  return function (...args) {
    if (!called) {
      result = fn.apply(this, args); // Call the function and store the result
      called = true; // Mark as called
    }
    return result; // Return the result of the first call on all subsequent calls
  };
}

// Example usage:
const initialize = customOnce(() => {
  console.log("Function executed");
  return "Initialization complete";
});

console.log(initialize()); // Output: "Function executed" and "Initialization complete"
console.log(initialize()); // Output: "Initialization complete"
console.log(initialize()); // Output: "Initialization complete"

// Explanation:
// Memoization Logic:

// A boolean flag called is used to track whether the function has been executed.
// The result variable stores the result of the first function call.
// Function Execution:

// The first time the returned function is invoked, it runs the original function fn and stores the result.
// On subsequent calls, the stored result is returned instead of executing the function again.
// Preserving Context:

// We use fn.apply(this, args) to ensure that the original function is executed with the correct this context and the arguments passed to it.

// Example Behavior:

const runOnce = customOnce(() => {
  console.log("This will run only once!");
});

runOnce(); // Output: "This will run only once!"
runOnce(); // No output
runOnce(); // No output

// In this example, the message "This will run only once!" will only be logged the first time runOnce is called. Any subsequent calls will not trigger the function again.

// Edge Cases:
// Multiple Calls: If the function is called multiple times, it always returns the result of the first invocation.
// Arguments Handling: Arguments passed during the first invocation are used for the initial execution, but they are ignored in subsequent calls.
// This custom once function mimics Lodash’s _.once, ensuring that the provided function only executes once and that the result of the first execution is returned on subsequent calls.
