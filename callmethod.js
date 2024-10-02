// Implement custom call method

// The call() method in JavaScript is used to invoke a function with a specific this value and arguments. To implement a custom version of call(), we need to:

// Explicitly bind a function to a given context (this value).
// Pass arguments to the function.
// Ensure the original context (this) of the function is temporarily replaced.
// Steps to Implement:
// Set the context: Temporarily assign the function to the provided context object.
// Invoke the function: Call the function with the arguments provided.
// Return the result: Return the result of the function call.
// Cleanup: Remove the function from the object to avoid polluting the object.

// Custom call Implementation

Function.prototype.customCall = function (context, ...args) {
  // If context is null or undefined, default to global object (window in browsers, global in Node.js)
  context = context || globalThis;

  // Create a unique property on the context to avoid overwriting existing properties
  const fnKey = Symbol("fn");
  context[fnKey] = this; // `this` refers to the function being called

  // Call the function with the provided arguments
  const result = context[fnKey](...args);

  // Delete the temporary function to clean up
  delete context[fnKey];

  return result;
};

// Example function
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

// Test case
const person = { name: "Alice" };
console.log(greet.customCall(person, "Hello", "!")); // Output: "Hello, Alice!"

// Explanation:
// Handling Context (this):

// If no context is provided (i.e., null or undefined), the global object (globalThis) is used as the default context. This mimics the behavior of JavaScript's native call() method.
// Temporary Function Assignment:

// A unique symbol is used (Symbol('fn')) to temporarily add the function (this) to the object. This avoids name conflicts with existing properties in the object.
// Function Execution:

// The function is invoked with the provided arguments using the spread operator (...args).
// Cleanup:

// After invoking the function, the temporary property is deleted to avoid polluting the object with unnecessary properties.

function add(a, b) {
  return a + b;
}

console.log(add.customCall(null, 2, 3)); // Output: 5

// In this case, the function add is called with the global context (null), and it works as expected.

// This implementation mimics the behavior of JavaScript's Function.prototype.call() method, allowing you to invoke a function with a specified this context and arguments.
