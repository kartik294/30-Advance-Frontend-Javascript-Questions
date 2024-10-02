// To implement a custom version of Lodash's partial function in JavaScript, we need to understand that partial allows for the creation of a new function by partially applying some arguments of an existing function. The remaining arguments will be provided when the new function is invoked.

// How _.partial Works:
// It takes a function fn and some arguments.
// It returns a new function that calls fn, with the initially provided arguments as the first part of its arguments.
// The remaining arguments are passed when the new function is invoked.
// Custom partial Implementation:
// Here is a simple implementation of the partial function in JavaScript:

function partial(fn, ...presetArgs) {
  // Return a new function that will call the original function with preset arguments
  return function (...laterArgs) {
    // Call the original function with the combined preset and later arguments
    return fn(...presetArgs, ...laterArgs);
  };
}

// Example usage:

// A sample function to demonstrate partial application
function greet(greeting, name) {
  return `${greeting}, ${name}!`;
}

// Partially apply the 'greet' function with the 'Hello' argument
const greetHello = partial(greet, "Hello");

// Call the new partially applied function with the remaining argument
console.log(greetHello("John")); // Output: "Hello, John!"

// Another example with more preset arguments
const greetHiToJane = partial(greet, "Hi", "Jane");
console.log(greetHiToJane()); // Output: "Hi, Jane!"

// Explanation:
// partial(fn, ...presetArgs):

// This function takes a function fn and a list of arguments (presetArgs) that will be "partially applied".
// It returns a new function.
// The returned function:

// When invoked, it takes additional arguments (laterArgs) and calls the original function fn with both the preset arguments (presetArgs) and the new arguments (laterArgs).
// Function example:

// The greet function takes two arguments: a greeting and a name. By partially applying 'Hello' using partial, we create a new function greetHello that pre-fixes the greeting but expects a name

// Partially applying a function
const multiply = (a, b, c) => a * b * c;
const multiplyByTwo = partial(multiply, 2); // Partially applying 2

console.log(multiplyByTwo(3, 4)); // Output: 24 (2 * 3 * 4)

// Conclusion:
// This custom partial function behaves similarly to Lodash's _.partial. It allows you to fix some arguments of a function and create a new function that can be called later with the remaining arguments. This is particularly useful in scenarios where certain arguments are known upfront, and the function is reused with different arguments.
