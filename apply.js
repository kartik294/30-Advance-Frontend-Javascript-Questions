// Implement custom apply method

// The apply() method in JavaScript is similar to call(), but instead of passing arguments individually, it expects the arguments as an array (or array-like object). To implement a custom version of apply(), we need to:

// Bind a function to a specific this value.
// Pass an array of arguments to the function.
// Ensure the function is executed with the correct context (this).
// Steps to Implement:
// Set the context: Temporarily assign the function to the provided context object.
// Invoke the function: Use the array of arguments to call the function.
// Return the result: Return the result of the function call.
// Cleanup: Remove the function from the object after execution.

// Custom apply Implementation

Function.prototype.customApply = function (context, argsArray) {
  // If context is null or undefined, default to the global object (window in browsers, globalThis in Node.js)
  context = context || globalThis;

  // Create a unique property on the context to avoid overwriting existing properties
  const fnKey = Symbol("fn");
  context[fnKey] = this; // `this` refers to the function being called

  // If argsArray is not provided or null, default to an empty array
  const args = argsArray || [];

  // Call the function with the provided arguments using spread syntax
  const result = context[fnKey](...args);

  // Delete the temporary property to clean up
  delete context[fnKey];

  return result;
};

// Example function
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

// Test case
const person = { name: "Bob" };
console.log(greet.customApply(person, ["Hello", "!"])); // Output: "Hello, Bob!"

// Explanation:
// Handling Context (this):

// If no context is provided (null or undefined), it defaults to the global object (globalThis), which mimics the behavior of the native apply() method.
// Temporary Function Assignment:

// A unique symbol key (Symbol('fn')) is used to temporarily attach the function to the object, preventing overwriting any existing properties in the object.
// Function Execution:

// The function is invoked with the arguments provided in argsArray using the spread syntax (...args), which effectively passes each argument individually.
// Cleanup:

// The temporary property is deleted after the function is executed to avoid modifying the object unnecessarily

// Example Test:

function sum(a, b, c) {
  return a + b + c;
}

console.log(sum.customApply(null, [1, 2, 3])); // Output: 6

// In this case, the function sum is called with the global context (null), and the array [1, 2, 3] is spread as individual arguments to the function.

// This implementation mimics the behavior of JavaScript's Function.prototype.apply() method, allowing you to invoke a function with a specified this context and an array of arguments.
